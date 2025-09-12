import type { CharacterPack } from "@/types/character-pack";

class CharacterPackManager {
  private readonly characterPacks: CharacterPack[];

  constructor() {
    this.characterPacks = [];
  }

  getAll(): CharacterPack[] {
    return this.characterPacks;
  }

  add(characterPack: CharacterPack): void {
    this.characterPacks.push(characterPack);
    this.characterPacks.sort();
  }
}

export const characterPackManager = new CharacterPackManager();
