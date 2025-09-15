import type { CharacterPack } from "../schema/character-pack.schema";

export interface CharacterPackLoader {
  load(packPath: string): Promise<CharacterPack[]>;
}
