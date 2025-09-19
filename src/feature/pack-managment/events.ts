import type { CharacterPack } from "@feature/character-pack/schema/character-pack.schema";
import type { ThemePack } from "@feature/theme-pack/schema/theme-pack.schema";
import type { Event } from "@tauri-apps/api/event";
import type { ReadonlyDeep } from "type-fest";

export enum PackManagementEvent {
  READY = "pack-management:ready",
  WINDOW_DOM_LOADED = "pack-management:loaded",
  CHARACTER_PACK_ENABLE_CHANGE = "pack-management:character-pack-enable-change",
  THEME_PACK_CHANGE = "pack-management:theme-pack-change",
}

export type PackManagementWindowDomLoadedContext = {
  packs: CharacterPack[];
  enablePackNames: string[];
  themePacks: ReadonlyDeep<ThemePack[]>;
  currentThemePack: ReadonlyDeep<ThemePack>;
};

export type CharacterPackChangeContext = {
  packName: string;
  enabled: boolean;
};

export type ThemePackChangeContext = {
  themePack: ThemePack;
};

export type PackManagementWindowDomLoadedEvent =
  Event<PackManagementWindowDomLoadedContext>;
export type CharacterPackChangeEvent = Event<CharacterPackChangeContext>;
export type ThemePackChangeEvent = Event<ThemePackChangeContext>;

export type PackManagementEventMap = {
  [PackManagementEvent.READY]: undefined;
  [PackManagementEvent.WINDOW_DOM_LOADED]: PackManagementWindowDomLoadedContext;
  [PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE]: CharacterPackChangeContext;
  [PackManagementEvent.THEME_PACK_CHANGE]: ThemePackChangeContext;
};
