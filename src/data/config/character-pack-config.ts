import {
  BaseDirectory,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import z from "zod";
import {
  type CharacterPackConfigJson,
  CharacterPackConfigJsonSchema,
  defaultCharacterConfig,
  emptyCharacterConfig,
} from "@/data/schema/character-pack-config.schema";
import { toJson } from "./utils";

interface AppConfig<T> {
  load(): Promise<void>;
  save(data?: T): Promise<void>;
  set<K extends keyof T>(key: K, value: T[K], save?: boolean): Promise<void>;
  get<K extends keyof T>(key: K): T[K];
}

export class CharacterPackConfig implements AppConfig<CharacterPackConfigJson> {
  private readonly configName = "character_packs.json";
  private config: CharacterPackConfigJson;

  constructor() {
    this.config = emptyCharacterConfig;
  }

  async load(): Promise<void> {
    console.log("CharacterPackConfig load...");

    const configExists = await exists(this.configName, {
      baseDir: BaseDirectory.AppConfig,
    });

    if (!configExists) {
      console.log("config not exists. create default");
      this.config = defaultCharacterConfig;
      await this.save(defaultCharacterConfig);
      return;
    }

    const jsonData = await readTextFile(this.configName, {
      baseDir: BaseDirectory.AppConfig,
    });

    console.log("config read success");

    const result = CharacterPackConfigJsonSchema.safeParse(jsonData);

    if (!result.success) {
      console.error(z.prettifyError(result.error));
      console.warn("load failed ChracterPackConfig... using Default Config");
      this.config = emptyCharacterConfig;
      return;
    }

    this.config = result.data;
  }

  async save(data?: CharacterPackConfigJson): Promise<void> {
    const saveData = data || this.config;
    await writeTextFile(this.configName, toJson(saveData), {
      baseDir: BaseDirectory.AppConfig,
    });
  }

  get<K extends keyof CharacterPackConfigJson>(
    key: K,
  ): CharacterPackConfigJson[K] {
    return this.config[key];
  }

  async set<K extends keyof CharacterPackConfigJson>(
    key: K,
    value: CharacterPackConfigJson[K],
    saveChanges = true,
  ): Promise<void> {
    this.config[key] = value;
    if (saveChanges) {
      await this.save();
    }
  }
}
