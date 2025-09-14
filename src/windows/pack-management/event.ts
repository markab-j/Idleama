import type { Event } from "@tauri-apps/api/event";
import type { CharacterPack } from "@/feature/character-pack/schema/character-pack-json.schema";

export const PackManagementEvent = {
  READY: "packs:ready",
  INIT_WINDOW: "packs:init_window",
  ENABLE_UPDATE: "packs:enable_update",
} as const;

export type PackInitPayload = {
  packs: CharacterPack[];
  enablePackNames: string[];
};

export type PackInitEvent = Event<PackInitPayload>;

export type PackEnablePayload = {
  packName: string;
  enabled: boolean;
};

export type PackEnableEvent = Event<PackEnablePayload>;
