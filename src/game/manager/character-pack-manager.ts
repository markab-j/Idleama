import type { CharacterPack } from "@/types/character-pack";

type CharacterPackState = CharacterPack & { enabled: boolean };

class CharacterPackManager {
  private readonly characterPacks: CharacterPackState[];

  constructor() {
    this.characterPacks = [];
  }

  getAll(): CharacterPackState[] {
    return [...this.characterPacks];
  }

  getAllEnabled(): CharacterPackState[] {
    return [...this.characterPacks.filter((pack) => pack.enabled)];
  }

  add(characterPack: CharacterPack, enabled: boolean = false): void {
    this.characterPacks.push({ ...characterPack, enabled });
    this.characterPacks.sort();
  }

  loadedPackCount(): number {
    return this.characterPacks.length;
  }
}

export const characterPackManager = new CharacterPackManager();
