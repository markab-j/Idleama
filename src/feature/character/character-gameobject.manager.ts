import type { CharacterFactory } from "./character.factory";
import type { Character } from "./character.gameobject";

export class CharacterGameObjectManager {
  private readonly enabledCharacters: Map<string, Character>;

  constructor(private readonly factory: CharacterFactory) {
    this.enabledCharacters = new Map();
  }

  public enableCharacter(packName: string) {
    if (this.enabledCharacters.has(packName)) return;

    const character = this.factory.create(packName);

    if (character) this.enabledCharacters.set(packName, character);
  }

  public disableCharacter(packName: string): void {
    const character = this.enabledCharacters.get(packName);

    if (character) {
      this.enabledCharacters.delete(packName);
      character.gameObj.destroy();
    }
  }
}
