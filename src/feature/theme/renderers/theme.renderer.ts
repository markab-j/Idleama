import type { ThemePack } from "@feature/theme-pack/schema/theme-pack.schema";
import type { BackgroundRenderer } from "./background.renderer";
import type { BorderRenderer } from "./border.renderer";

export class ThemeRenderer {
  constructor(
    private readonly backgroundRenderer: BackgroundRenderer,
    private readonly borderRenderer: BorderRenderer,
  ) {}

  render(themePack: ThemePack) {
    this.backgroundRenderer.render(themePack.meta.name, themePack.assets.background);
    this.borderRenderer.render(themePack.assets.border);
  }
}
