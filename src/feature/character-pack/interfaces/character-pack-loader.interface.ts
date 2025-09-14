import type { CharacterPack } from "../schema/character-pack-json.schema";

export interface CharacterPackLoader {
  load(packPath: string): Promise<CharacterPack[]>;
}
