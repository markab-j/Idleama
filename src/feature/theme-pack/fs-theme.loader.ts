import { convertFileSrc } from "@tauri-apps/api/core";
import { join } from "@tauri-apps/api/path";
import { exists, readDir, readTextFile } from "@tauri-apps/plugin-fs";
import type { KAPLAYCtx } from "kaplay";
import z from "zod";
import { createLogger } from "@/core/utils/logger";
import type { ThemeLoader } from "./interfaces/theme-loader.interface";
import { ThemePackMetadataSchema } from "./schema/theme-pack-metadata.schema";
import type { ThemePack } from "./types/theme-pack.type";
import { toBackgroundSpriteKey } from "./utils";

export class FileSystemThemeLoader implements ThemeLoader {
  private readonly logger = createLogger(FileSystemThemeLoader.name);

  constructor(private readonly k: KAPLAYCtx) {}

  async load(packPath: string): Promise<ThemePack[]> {
    this.logger.log("load start");

    const packFolders = await readDir(packPath);
    this.logger.log(packFolders);

    const loadedPacks: ThemePack[] = [];

    for (const folder of packFolders) {
      if (!folder.isDirectory || folder.name.startsWith(".")) continue;

      const packJsonPath = await join(packPath, folder.name, "pack.json");
      const spritePath = await join(packPath, folder.name, "background.png");
      const borderPath = await join(packPath, folder.name, "border.png");

      const packJsonExists = await exists(packJsonPath);
      const spriteExists = await exists(spritePath);

      if (packJsonExists && spriteExists) {
        const jsonContent = await readTextFile(packJsonPath);
        const result = ThemePackMetadataSchema.safeParse(jsonContent);

        if (!result.success) {
          this.logger.warn(z.prettifyError(result.error));
          continue;
        }

        const themePack = result.data;

        loadedPacks.push({
          ...themePack,
          borderSprite: convertFileSrc(borderPath),
        });

        await this.k.loadSprite(
          toBackgroundSpriteKey(themePack.meta.name),
          convertFileSrc(spritePath),
          {
            sliceX: 11,
            sliceY: 7,
          },
        );
      }
    }

    this.logger.log("load success. count: ", loadedPacks.length);
    return loadedPacks;
  }
}
