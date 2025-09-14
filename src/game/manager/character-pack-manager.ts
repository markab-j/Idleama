import type { CharacterPack, CharacterPackState } from "@/types/character-pack";
import { EventManager } from "./event-manager";

class CharacterPackManager {
  private readonly characterPacks: CharacterPackState[];

  constructor() {
    this.characterPacks = [];
    this.initializeListener();
  }

  getAllState(): CharacterPackState[] {
    return [...this.characterPacks];
  }

  getAllEnabled(): CharacterPack[] {
    return [...this.characterPacks.filter((pack) => pack.enabled)];
  }

  add(characterPack: CharacterPack, enabled: boolean = false): void {
    this.characterPacks.push({ ...characterPack, enabled });
    this.characterPacks.sort();
  }

  initializeListener() {
    EventManager.on("packs:enable_update", (e) =>
      this.updateState(e.packName, e.enabled),
    );
  }

  updateState(packName: string, enabled: boolean): void {
    const pack = this.characterPacks.find((pack) => pack.name === packName);

    if (pack) {
      pack.enabled = enabled;
    }
  }

  loadedPackCount(): number {
    return this.characterPacks.length;
  }
}

export const characterPackManager = new CharacterPackManager();
