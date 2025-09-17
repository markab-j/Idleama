import type { CharacterFactory } from "./character.factory";
import type { CharacterGameObj } from "./character.gameobject";

export class CharacterGameObjectManager {
  private readonly characterMap: Map<string, CharacterGameObj>;

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
