import { sortBy } from "es-toolkit";
import type { BackGroundRenderer } from "./background.renderer";
import type { ThemeLoader } from "./interfaces/theme-loader.interface";
import type { ThemePackConfigStore } from "./interfaces/theme-pack-config-store.interface";
import type { ThemePack } from "./schema/theme-pack.schema";
import type { ThemePackPathProvider } from "./theme-pack-path.provider";

export class ThemePackManager {
  private themePacks: ThemePack[];
  private currentPack: ThemePack;

  constructor(
    private readonly loader: ThemeLoader,
    private readonly config: ThemePackConfigStore,
    private readonly backgroundRenderer: BackGroundRenderer,
    private readonly pathProvider: ThemePackPathProvider,
  ) {
    this.themePacks = [];
    this.currentPack = this.themePacks[0];
  }

  getAll(): ReadonlyArray<Readonly<ThemePack>> {
    return [...this.themePacks];
  }

  getCurrentPack(): Readonly<ThemePack> {
    return this.currentPack;
  }

  async init(): Promise<void> {
    await this.reload();

    const currentPack = this.themePacks.find(
      (pack) => pack.meta.name === this.config.getCurrentPackName(),
    );

    if (currentPack) this.currentPack = currentPack;

    this.backgroundRenderer.render(this.currentPack);
  }

  public async reload(): Promise<void> {
    const defaultThemePath = await this.pathProvider.getDefaultPath();
    const externalThemePath = await this.pathProvider.getUserPath();

    const defaultThemePacks = await this.loader.load(defaultThemePath);
    const externalThemePacks = await this.loader.load(externalThemePath);

    this.themePacks = this.themePacks.concat(
      defaultThemePacks,
      externalThemePacks,
    );

    sortBy(this.themePacks, [(pack) => pack.meta.name]);
  }
}
