import type { Event } from "@tauri-apps/api/event";
import type { ReadonlyDeep } from "type-fest";
import type { CharacterPack } from "@/feature/character-pack/schema/character-pack.schema";
import type { ThemePack } from "@/feature/theme-pack/schema/theme-pack.schema";

export const PackManagementEvent = {
  READY: "pack-management:ready",
  INIT_WINDOW: "pack-management:init_window",
  CHARACTER_PACK_ENABLE_CHANGE: "pack-management:character-pack-enable-change",
  THEME_PACK_CHANGE: "pack-management:theme-pack-change",
} as const;

export type PackManagementInitPayload = {
  packs: CharacterPack[];
  enablePackNames: string[];
  themePacks: ReadonlyDeep<ThemePack[]>;
  currentThemePack: ReadonlyDeep<ThemePack>;
};

export type PackManagementInitEvent = Event<PackManagementInitPayload>;

export type CharacterPackEnablePayload = {
  packName: string;
  enabled: boolean;
};

export type CharacterPackEnableEvent = Event<CharacterPackEnablePayload>;

export type ThemePackChangePayload = {
  themePack: ThemePack;
};

export type ThemePackChangeEvent = Event<ThemePackChangePayload>;
