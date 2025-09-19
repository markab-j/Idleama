import mitt from "mitt";
import type { ReadonlyDeep } from "type-fest";
import type { ThemePack } from "./schema/theme-pack.schema";

export enum ThemePackEvent {
  CHANGE = "theme-pack:change",
}

export type ThemePackEventMap = {
  [ThemePackEvent.CHANGE]: { themePack: ReadonlyDeep<ThemePack> };
};

export const ThemePackEventBus = mitt<ThemePackEventMap>();
