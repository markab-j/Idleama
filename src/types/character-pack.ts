import type { CharacterPackJson } from "@/data/schema/character-pack-json.schema";

export type CharacterPack = {
  pack: CharacterPackJson;
  spritePath: string;
};
