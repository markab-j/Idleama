import type { CharacterPackChangeContext } from "@feature/pack-managment/events";
import mitt from "mitt";

export enum CharacterPackEvent {
  CHANGE = "character-pack:change",
}

export type CharacterPackEventMap = {
  [CharacterPackEvent.CHANGE]: CharacterPackChangeContext;
};

export const CharacterPackEventBus = mitt<CharacterPackEventMap>();
