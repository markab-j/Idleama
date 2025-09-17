import type { CharacterPack } from "@feature/character-pack/schema/character-pack.schema";
import type { CharacterGameObjectManager } from "./character-gameobject.manager";

export class CharacterManager {
  constructor(private readonly gameObjManager: CharacterGameObjectManager) {}

  public updateCharacter(packName: string, enabled: boolean): void {
    if (enabled) this.gameObjManager.enableCharacter(packName);
    else this.gameObjManager.disableCharacter(packName);
  }

  public initializeCharacters(characterPacks: CharacterPack[]) {
    for (const pack of characterPacks) {
      this.gameObjManager.enableCharacter(pack.meta.name);
    }
  }
}
