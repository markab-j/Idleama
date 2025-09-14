import type { CharacterPack } from "@/feature/character-pack/types/character-pack.type";

export interface CharacterPackLoader {
  load(packPath: string): Promise<CharacterPack[]>;
}
