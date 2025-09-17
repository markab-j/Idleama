import { sortBy } from "es-toolkit";
import { createLogger } from "@/core/utils/logger";
import type { CharacterPackPathProvider } from "./character-pack-path.provider";
import type { CharacterPackLoader } from "./interfaces/character-pack-loader.interface";
import type { CharacterPackConfigStore } from "./interfaces/chracter-pack-config-store.interface";
import type { CharacterPack } from "./schema/character-pack.schema";

export class CharacterPackManager {
  private readonly logger = createLogger(CharacterPackManager.name);
  private characterPacks: CharacterPack[];

  constructor(
    private readonly loader: CharacterPackLoader,
    private readonly config: CharacterPackConfigStore,
    private readonly pathProvider: CharacterPackPathProvider,
  ) {
    this.characterPacks = [];
  }

  async init() {
    await this.reload();
  }

  public getEnablePacks(): CharacterPack[] {
    const { enabled_packs } = this.config.get();
    return this.characterPacks.filter((pack) =>
      enabled_packs.includes(pack.meta.name),
    );
  }

  async updatePack(packName: string, enabled: boolean) {
    if (enabled) this.enablePack(packName);
    else this.disablePack(packName);
  }

  async enablePack(packName: string) {
    await this.config.enablePack(packName);
  }

  async disablePack(packName: string) {
    await this.config.disablePack(packName);
  }

  async reload(): Promise<void> {
    this.logger.log("reload start...");

    const [defaultPackPath, externalPackPath] = await Promise.all([
      this.pathProvider.getDefaultPath(),
      this.pathProvider.getUserPath(),
    ]);

    const [defaultPacks, externalPacks] = await Promise.all([
      this.loader.load(defaultPackPath),
      this.loader.load(externalPackPath),
    ]);

    this.characterPacks = this.characterPacks.concat(
      defaultPacks,
      externalPacks,
    );

    sortBy(this.characterPacks, [(pack) => pack.meta.name]);
    this.logger.log("load success. count:", this.characterPacks.length);
  }

  getAll(): CharacterPack[] {
    return [...this.characterPacks];
  }
}
