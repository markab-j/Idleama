import { toJson } from "@shared/utils/json";
import { createLogger } from "@shared/utils/logger";
import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import z from "zod";
import { WindowLevel } from "./enum/window-level.enum";
import {
  type SettingConfig,
  SettingConfigSchema,
} from "./schema/setting-config.schema";

const SETTING_CONFIG = {
  DEFAULT: {
    lang: "en",
    windowLevel: WindowLevel.alwaysOnTop,
  },
};

export class SettingConfigStore {
  private readonly logger = createLogger(SettingConfigStore.name);
  private readonly fileName = "config.json";
  private config: SettingConfig;

  constructor() {
    this.config = SETTING_CONFIG.DEFAULT;
  }

  async load(): Promise<void> {
    const configExists = await exists(this.fileName, {
      baseDir: BaseDirectory.AppConfig,
    });

    if (!configExists) {
      this.logger.log("config not exists. create default");
      this.config = SETTING_CONFIG.DEFAULT;
      await this.save();
      return;
    }

    const jsonData = await readTextFile(this.fileName, {
      baseDir: BaseDirectory.AppConfig,
    });

    this.logger.log("config read success");

    const result = SettingConfigSchema.safeParse(jsonData);

    if (!result.success) {
      this.logger.error(z.prettifyError(result.error));
      this.logger.warn(
        "load failed ChracterPackConfig... using Default Config",
      );
      this.config = SETTING_CONFIG.DEFAULT;
      return;
    }

    this.config = result.data;
    this.logger.log(result.data);
  }

  async save(): Promise<void> {
    await writeTextFile(this.fileName, toJson(this.config), {
      baseDir: BaseDirectory.AppConfig,
    });
  }

  public getCurrentLang() {
    return this.config.lang;
  }

  public async setLang(lang: string) {
    this.config.lang = lang;

    await this.save();
  }

  public async getWindowLevel() {
    return this.config.windowLevel;
  }

  public async setWindowLevel(windowLevel: WindowLevel) {
    this.config.windowLevel = windowLevel;

    await this.save();
  }
}
