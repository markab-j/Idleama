import { createLogger } from "@shared/utils/logger";
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
import {
  AssetNotFoundError,
  ThemePackError,
  ThemePackJsonNotFoundError,
  ThemePackParseError,
} from "./errors/load.error";
import type { ThemePackLoader } from "./interfaces/theme-loader.interface";
import { type ThemePack, ThemePackSchema } from "./schema/theme-pack.schema";
import type { ThemePackPathProvider } from "./theme-pack-path.provider";

export class FileSystemThemePackLoader implements ThemePackLoader {
  private readonly logger = createLogger(FileSystemThemePackLoader.name);

  constructor(private readonly pathProvider: ThemePackPathProvider) {}

  async loadDefaultPack(): Promise<ThemePack[]> {
    this.logger.log("Load Default Theme Packs...");
    const basePath = await this.pathProvider.getDefaultPath();
    return this.load(basePath);
  }

  async loadExternalPack(): Promise<ThemePack[]> {
    this.logger.log("Load External Theme Packs...");
    const basePath = await this.pathProvider.getUserPath();
    return this.load(basePath);
  }

  async load(baseThemePackPath: string): Promise<ThemePack[]> {
    const packFolders = await readDir(baseThemePackPath);

    const loadResults = await Promise.all(
      packFolders.map((folder) => this.loadPack(baseThemePackPath, folder)),
    );

    const loadedPacks: ThemePack[] = [];

    for (const result of loadResults) {
      if (result.isOk()) {
        loadedPacks.push(result.value);
      } else if (result.error) {
        if (result.error instanceof ThemePackParseError) {
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
  ): Promise<Result<ThemePack, ThemePackError | null>> {
    if (!folder.isDirectory || folder.name.startsWith(".")) {
      return err(null);
    }

    const packPath = await join(basePath, folder.name);

    try {
      const packJsonPath = await join(packPath, "pack.json");
      if (!(await exists(packJsonPath))) {
        return err(new ThemePackJsonNotFoundError(packPath));
      }

      const jsonContent = await readTextFile(packJsonPath);
      const parseResult = ThemePackSchema.safeParse(JSON.parse(jsonContent));

      if (!parseResult.success) {
        return err(new ThemePackParseError(packPath, parseResult.error));
      }

      return this.resolveAssetPath(parseResult.data, packPath);
    } catch (e) {
      return err(
        new ThemePackError(
          e instanceof Error ? e.message : "Unknown file error",
          packPath,
        ),
      );
    }
  }

  private async resolveAssetPath(
    themePack: ThemePack,
    packPath: string,
  ): Promise<Result<ThemePack, AssetNotFoundError>> {
    const [bgSrc, borderSrc] = await Promise.all([
      join(packPath, themePack.assets.background.src),
      join(packPath, themePack.assets.border.src),
    ]);

    const [bgExists, borderExists] = await Promise.all([
      exists(bgSrc),
      exists(borderSrc),
    ]);

    const missingFiles: string[] = [];
    if (!bgExists) missingFiles.push(themePack.assets.background.src);
    if (!borderExists) missingFiles.push(themePack.assets.border.src);

    if (missingFiles.length > 0)
      return err(new AssetNotFoundError(packPath, missingFiles));

    const resolvedPack = clone(themePack);
    resolvedPack.assets.background.src = convertFileSrc(bgSrc);
    resolvedPack.assets.border.src = convertFileSrc(borderSrc);

    return ok(resolvedPack);
  }
}
