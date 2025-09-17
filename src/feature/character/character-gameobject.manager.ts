import type { Character } from "@/game/character/character";
import type { CharacterFactory } from "@/game/character/character.factory";

export class CharacterGameObjectManager {
  private readonly characterMap: Map<string, Character>;

  constructor(private readonly factory: CharacterFactory) {
    this.characterMap = new Map();
  }

  public enableCharacter(packName: string) {
    if (this.characterMap.has(packName)) return;

    const character = this.factory.create(packName);
    this.characterMap.set(packName, character);
  }

  public disableCharacter(packName: string): void {
    const character = this.characterMap.get(packName);
    this.characterMap.delete(packName);
    character?.gameObj.destroy();
  }
}
