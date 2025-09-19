import type { Handler } from "mitt";
import type { ThemeManager } from "../theme/theme.manager";
import {
  ThemePackEvent,
  ThemePackEventBus,
  type ThemePackEventMap,
} from "./events";

export class ThemePackEventListener {
  constructor(private readonly themeManager: ThemeManager) {}

  init(): void {
    ThemePackEventBus.on(ThemePackEvent.CHANGE, this.onThemePackChange);
  }

  destroy(): void {
    ThemePackEventBus.off(ThemePackEvent.CHANGE, this.onThemePackChange);
  }

  private onThemePackChange: Handler<ThemePackEventMap[ThemePackEvent.CHANGE]> =
    (e) => {
      this.themeManager.applyTheme(e.themePack);
    };
}
