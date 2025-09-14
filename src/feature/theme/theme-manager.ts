import type { BackGroundDrawer } from "./background.drawer";
import type { ThemeLoader } from "./theme-loader";

export class ThemeManager {
  constructor(
    private readonly loader: ThemeLoader,
    private readonly backGroundDrawer: BackGroundDrawer,
  ) {}

  async init(): Promise<void> {
    await this.reload();
  }

  public async reload(): Promise<void> {
    await this.loader.loadDefaultTile();
    this.backGroundDrawer.draw();
  }
}
