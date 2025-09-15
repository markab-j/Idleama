import { sortBy } from "es-toolkit";
import { createLogger } from "@/core/utils/logger";
import { EventManager } from "@/game/manager/event-manager";
import type { PackEnablePayload } from "@/windows/pack-management/event";
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
    EventManager.on(
      "packs:enable_update",
      async (e) => await this.changePackEnable(e),
    );
  }

  public getEnablePackNames(): string[] {
    this.logger.log("getEnablePacks...");
    const { enabled_packs } = this.config.get();

    this.logger.log("enabledPacks", enabled_packs);
    return this.characterPacks
      .map((pack) => pack.name)
      .filter((name) => enabled_packs.includes(name));
  }

  async changePackEnable(event: PackEnablePayload) {
    if (event.enabled) await this.config.enablePack(event.packName);
    else await this.config.disablePack(event.packName);
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

    sortBy(this.characterPacks, ["name"]);
    this.logger.log("load success. count:", this.characterPacks.length);
  }

  getAll(): CharacterPack[] {
    return [...this.characterPacks];
  }
}
