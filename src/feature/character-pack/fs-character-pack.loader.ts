import { convertFileSrc } from "@tauri-apps/api/core";
import { join } from "@tauri-apps/api/path";
import { exists, readDir, readTextFile } from "@tauri-apps/plugin-fs";
import type { KAPLAYCtx } from "kaplay";
import z from "zod";
import { createLogger } from "@/core/utils/logger";
import type { CharacterSpriteAtlasDataProvider } from "./atlas-data.provider";
import type { CharacterPackLoader } from "./interfaces/character-pack-loader.interface";
import {
  type CharacterPack,
  CharacterPackSchema,
} from "./schema/character-pack-json.schema";

export class FileSystemCharacterPackLoader implements CharacterPackLoader {
  private readonly logger = createLogger(FileSystemCharacterPackLoader.name);

  constructor(
    private readonly k: KAPLAYCtx,
    private readonly spriteAtlasDataProvider: CharacterSpriteAtlasDataProvider,
  ) {}

  async load(packPath: string): Promise<CharacterPack[]> {
    this.logger.log("load start");

    const packFolders = await readDir(packPath);

    const loadedPacks: CharacterPack[] = [];

    for (const folder of packFolders) {
      if (!folder.isDirectory || folder.name.startsWith(".")) continue;

      const packJsonPath = await join(packPath, folder.name, "pack.json");
      const spritePath = await join(packPath, folder.name, "sprite.png");

      const packJsonExists = await exists(packJsonPath);
      const spriteExists = await exists(spritePath);

      if (packJsonExists && spriteExists) {
        const jsonContent = await readTextFile(packJsonPath);
        const result = CharacterPackSchema.safeParse(jsonContent);

        if (!result.success) {
          this.logger.warn(z.prettifyError(result.error));
          continue;
        }

        const characterPack = result.data;

        loadedPacks.push(characterPack);

        this.k.loadSpriteAtlas(
          convertFileSrc(spritePath),
          this.spriteAtlasDataProvider.get8AxisAtlasData(characterPack),
        );
      }
    }

    this.logger.log("load success. count: ", loadedPacks.length);
    return loadedPacks;
  }
}
