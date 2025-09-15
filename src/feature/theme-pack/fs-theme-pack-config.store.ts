import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import z from "zod";
import { toJson } from "@/core/utils/json";
import { createLogger } from "@/core/utils/logger";
import type { ThemePackConfigStore } from "./interfaces/theme-pack-config-store.interface";
import {
  type ThemePackConfig,
  ThemePackConfigSchema,
} from "./schema/theme-pack-config.schema";

const THEME_PACK_CONFIG = {
  EMPTY: {
    current: "",
  },
  DEFAULT: {
    current: "default",
  },
};

export class FileSystemThemePackConfigStore implements ThemePackConfigStore {
  private readonly logger = createLogger(FileSystemThemePackConfigStore.name);
  private readonly fileName = "theme_packs.json";
  private config: ThemePackConfig;

  constructor() {
    this.config = THEME_PACK_CONFIG.EMPTY;
  }

  async load(): Promise<void> {
    const configExists = await exists(this.fileName, {
      baseDir: BaseDirectory.AppConfig,
    });

    if (!configExists) {
      this.logger.log("config not exists. create default");
      this.config = THEME_PACK_CONFIG.DEFAULT;
      await this.save();
      return;
    }

    const jsonData = await readTextFile(this.fileName, {
      baseDir: BaseDirectory.AppConfig,
    });

    this.logger.log("config read success");

    const result = ThemePackConfigSchema.safeParse(jsonData);

    if (!result.success) {
      this.logger.error(z.prettifyError(result.error));
      this.logger.warn("load failed ThemePack... using Default Config");
      this.config = THEME_PACK_CONFIG.DEFAULT;
      return;
    }

    this.config = result.data;
  }
  async save(): Promise<void> {
    await writeTextFile(this.fileName, toJson(this.config), {
      baseDir: BaseDirectory.AppConfig,
    });
  }

  async setCurrentPackName(packName: string): Promise<void> {
    this.config.current = packName;
    await this.save();
  }

  getCurrentPackName(): string {
    return this.config.current;
  }
}
