import { sortBy } from "es-toolkit";
import { createLogger } from "@/shared/utils/logger";
import type { CharacterPackAssetRegistrar } from "./character-pack-asset.registrar";
import type { CharacterPackLoader } from "./interfaces/character-pack-loader.interface";
import type { CharacterPackConfigStore } from "./interfaces/chracter-pack-config-store.interface";
import type { CharacterPack } from "./schema/character-pack.schema";

export class CharacterPackManager {
  private readonly logger = createLogger(CharacterPackManager.name);
  private characterPacks: CharacterPack[];

  constructor(
    private readonly loader: CharacterPackLoader,
    private readonly assetRegistrar: CharacterPackAssetRegistrar,
    private readonly config: CharacterPackConfigStore,
  ) {
    this.characterPacks = [];
  }

  async init() {
    await this.reload();
  }

  public getAll(): CharacterPack[] {
    return [...this.characterPacks];
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

    const [defaultPacks, externalPacks] = await Promise.all([
      this.loader.loadDefaultPack(),
      this.loader.loadExternalPack(),
    ]);

    this.characterPacks = this.characterPacks.concat(
      defaultPacks,
      externalPacks,
    );

    sortBy(this.characterPacks, [(pack) => pack.meta.name]);

    this.assetRegistrar.load(this.characterPacks);
  }
}
