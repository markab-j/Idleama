import mitt from "mitt";
import type {
  PackEnablePayload,
  PackManagementEvent,
} from "@/windows/pack-management/event";

type AppEvents = {
  [PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE]: PackEnablePayload;
};

export const EventManager = mitt<AppEvents>();
