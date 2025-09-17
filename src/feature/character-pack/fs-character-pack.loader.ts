import { convertFileSrc } from "@tauri-apps/api/core";
import { join } from "@tauri-apps/api/path";
import {
  type DirEntry,
  exists,
  readDir,
  readTextFile,
} from "@tauri-apps/plugin-fs";
import { clone } from "es-toolkit";
import { err, ok, type Result } from "neverthrow";
import z from "zod";
import { PackType } from "@/core/enum/pack.enum";
import {
  PackAssetNotFoundError,
  PackError,
  PackJsonNotFoundError,
  PackParseError,
} from "@/core/error/pack.error";
import { createLogger } from "@/shared/utils/logger";
import type { CharacterPackPathProvider } from "./character-pack-path.provider";
import type { CharacterPackLoader } from "./interfaces/character-pack-loader.interface";
import {
  type CharacterPack,
  CharacterPackSchema,
} from "./schema/character-pack.schema";

export class FileSystemCharacterPackLoader implements CharacterPackLoader {
  private readonly logger = createLogger(FileSystemCharacterPackLoader.name);

  constructor(private readonly pathProvider: CharacterPackPathProvider) {}

  async loadDefaultPack(): Promise<CharacterPack[]> {
    this.logger.log("Load Default Character Packs...");
    const basePath = await this.pathProvider.getDefaultPath();
    return this.load(basePath);
  }

  async loadExternalPack(): Promise<CharacterPack[]> {
    this.logger.log("Load External Character Packs...");
    const basePath = await this.pathProvider.getUserPath();
    return this.load(basePath);
  }

  async load(basePackPath: string): Promise<CharacterPack[]> {
    const packFolders = await readDir(basePackPath);

    const loadResults = await Promise.all(
      packFolders.map((folder) => this.loadPack(basePackPath, folder)),
    );

    const loadedPacks: CharacterPack[] = [];

    for (const result of loadResults) {
      if (result.isOk()) {
        loadedPacks.push(result.value);
      } else if (result.error) {
        if (result.error instanceof PackParseError) {
          this.logger.warn(
            result.error.message,
            z.prettifyError(result.error.zodError),
          );
        } else {
          this.logger.warn(result.error.message);
        }
      }
    }

    this.logger.log(
      `Load complete. Success: ${loadedPacks.length}, Failed: ${loadResults.length - loadedPacks.length}`,
    );
    return loadedPacks;
  }

  private async loadPack(
    basePath: string,
    folder: DirEntry,
  ): Promise<Result<CharacterPack, PackError | null>> {
    if (!folder.isDirectory || folder.name.startsWith(".")) {
      return err(null);
    }

    const packPath = await join(basePath, folder.name);

    try {
      const packJsonPath = await join(packPath, "pack.json");
      if (!(await exists(packJsonPath))) {
        return err(new PackJsonNotFoundError(PackType.CHARACTER, packPath));
      }

      const jsonContent = await readTextFile(packJsonPath);
      const parseResult = CharacterPackSchema.safeParse(
        JSON.parse(jsonContent),
      );

      if (!parseResult.success) {
        return err(
          new PackParseError(PackType.CHARACTER, packPath, parseResult.error),
        );
      }

      return this.resolveAssetPath(parseResult.data, packPath);
    } catch (e) {
      return err(
        new PackError(
          PackType.CHARACTER,
          e instanceof Error ? e.message : "Unknown file error",
          packPath,
        ),
      );
    }
  }

  private async resolveAssetPath(
    characterPack: CharacterPack,
    packPath: string,
  ): Promise<Result<CharacterPack, PackAssetNotFoundError>> {
    const spriteSrc = await join(packPath, characterPack.assets.sprite.src);
    const spriteExists = await exists(spriteSrc);

    const missingFiles: string[] = [];
    if (!spriteExists) missingFiles.push(characterPack.assets.sprite.src);

    if (missingFiles.length > 0)
      return err(
        new PackAssetNotFoundError(PackType.CHARACTER, packPath, missingFiles),
      );

    const resolvedPack = clone(characterPack);
    resolvedPack.assets.sprite.src = convertFileSrc(spriteSrc);

    return ok(resolvedPack);
  }
}
