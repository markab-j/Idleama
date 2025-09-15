import mitt from "mitt";
import type {
  CharacterPackEnablePayload,
  PackManagementEvent,
  ThemePackChangePayload,
} from "@/windows/pack-management/event";

type AppEvents = {
  [PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE]: CharacterPackEnablePayload;
  [PackManagementEvent.THEME_PACK_CHANGE]: ThemePackChangePayload;
};

export const EventManager = mitt<AppEvents>();
