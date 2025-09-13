import type { CharacterPackJson } from "@/data/schema/character-pack-json.schema";

export type CharacterPack = CharacterPackJson & {
  spritePath: string;
};

export type CharacterPackState = CharacterPack & { enabled: boolean };
