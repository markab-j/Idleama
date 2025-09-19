import type { CharacterPackConfig } from "@feature/character-pack/schema/character-pack-config.schema";

export interface CharacterPackConfigStore {
  load(): Promise<void>;
  save(): Promise<void>;
  get(): Readonly<CharacterPackConfig>;
  enablePack(packName: string): Promise<void>;
  disablePack(packName: string): Promise<void>;
}
