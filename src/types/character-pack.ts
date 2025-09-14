import type { CharacterPackJson } from "@/data/schema/character-pack-json.schema";

export type CharacterPackData = CharacterPackJson & {
  spritePath: string;
};

export type CharacterPackState = CharacterPackData & { enabled: boolean };
