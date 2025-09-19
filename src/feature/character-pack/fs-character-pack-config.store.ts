import { toJson } from "@shared/utils/json";
import { createLogger } from "@shared/utils/logger";
import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import z from "zod";
import type { CharacterPackConfigStore } from "./interfaces/chracter-pack-config-store.interface";
import {
  type CharacterPackConfig,
  CharacterPackConfigSchema,
} from "./schema/character-pack-config.schema";

const CHARACTER_PACK_CONFIG = {
  EMPTY: {
    enabled_packs: [],
  },
  DEFAULT: {
    enabled_packs: ["template"],
  },
};

export class FileSystemCharacterPackConfigStore
  implements CharacterPackConfigStore
{
  private readonly logger = createLogger(
    FileSystemCharacterPackConfigStore.name,
  );
  private readonly fileName = "character_packs.json";
  private config: CharacterPackConfig;

  constructor() {
    this.config = CHARACTER_PACK_CONFIG.EMPTY;
  }

  get() {
    return this.config;
  }

  async load(): Promise<void> {
    const configExists = await exists(this.fileName, {
      baseDir: BaseDirectory.AppConfig,
    });

    if (!configExists) {
      this.logger.log("config not exists. create default");
      this.config = CHARACTER_PACK_CONFIG.DEFAULT;
      await this.save();
      return;
    }

    const jsonData = await readTextFile(this.fileName, {
      baseDir: BaseDirectory.AppConfig,
    });

    this.logger.log("config read success");

    const result = CharacterPackConfigSchema.safeParse(jsonData);

    if (!result.success) {
      this.logger.error(z.prettifyError(result.error));
      this.logger.warn(
        "load failed ChracterPackConfig... using Default Config",
      );
      this.config = CHARACTER_PACK_CONFIG.EMPTY;
      return;
    }

    this.config = result.data;
  }

  async save(): Promise<void> {
    await writeTextFile(this.fileName, toJson(this.config), {
      baseDir: BaseDirectory.AppConfig,
    });
  }

  async enablePack(packName: string): Promise<void> {
    this.config.enabled_packs.push(packName);

    await this.save();
  }

  async disablePack(packName: string): Promise<void> {
    this.config.enabled_packs = this.config.enabled_packs.filter(
      (v) => v !== packName,
    );

    await this.save();
  }
}
