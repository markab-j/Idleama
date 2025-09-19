import { sortBy } from "es-toolkit";
import type { ReadonlyDeep } from "type-fest";
import { ThemePackEvent, ThemePackEventBus } from "./events";
import type { ThemePackLoader } from "./interfaces/theme-loader.interface";
import type { ThemePackConfigStore } from "./interfaces/theme-pack-config-store.interface";
import type { ThemePack } from "./schema/theme-pack.schema";
import type { ThemePackAssetRegistrar } from "./theme-pack-asset.registrar";

export class ThemePackManager {
  private themePacks: ThemePack[];
  private currentPack: ThemePack;

  constructor(
    private readonly loader: ThemePackLoader,
    private readonly assetRegistrar: ThemePackAssetRegistrar,
    private readonly config: ThemePackConfigStore,
  ) {
    this.themePacks = [];
    this.currentPack = this.themePacks[0];
  }

  getAll(): ReadonlyDeep<ThemePack[]> {
    return [...this.themePacks];
  }

  getCurrentPack(): ThemePack {
    return this.currentPack;
  }

  setCurrentPack(themePack: ThemePack): void {
    this.currentPack = themePack;
    ThemePackEventBus.emit(ThemePackEvent.CHANGE, { themePack });
  }

  async init(): Promise<void> {
    await this.reload();
    this.initCurrentPack();
  }

  private initCurrentPack(): void {
    const currentPack = this.themePacks.find(
      (pack) => pack.meta.name === this.config.getCurrentPackName(),
    );

    if (currentPack) this.setCurrentPack(currentPack);
    else this.setCurrentPack(this.themePacks[0]);
  }

  public async reload(): Promise<void> {
    const [defaultPacks, externalPacks] = await Promise.all([
      this.loader.loadDefaultPack(),
      this.loader.loadExternalPack(),
    ]);

    this.themePacks = this.themePacks.concat(defaultPacks, externalPacks);

    sortBy(this.themePacks, [(pack) => pack.meta.name]);

    this.assetRegistrar.load(this.themePacks);
  }
}
