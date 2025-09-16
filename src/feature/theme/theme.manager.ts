import type { ThemePack } from "../theme-pack/schema/theme-pack.schema";
import type { ThemeRenderer } from "../theme-pack/theme.renderer";

export class ThemeManager {
  constructor(private readonly themeRenderer: ThemeRenderer) {}

  public applyTheme(themePack: ThemePack) {
    this.themeRenderer.render(themePack);
  }
}
