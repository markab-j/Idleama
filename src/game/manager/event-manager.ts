import mitt from "mitt";
import type {
  PackEnablePayload,
  PackManagementEvent,
} from "@/ui/windows/pack-management/event";

type GameEvents = {
  [PackManagementEvent.ENABLE_UPDATE]: PackEnablePayload;
};

export const EventManager = mitt<GameEvents>();

EventManager.on("*", (e) => console.log("Event Emiited", e));
