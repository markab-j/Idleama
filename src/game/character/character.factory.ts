import type { KAPLAYCtx, Vec2 } from "kaplay";
import { toCharacterSpriteKey } from "@/feature/character-pack/utils";
import { Character } from "@/game/character/character.ts";

export class CharacterFactory {
  constructor(private readonly k: KAPLAYCtx) {}

  create(packName: string, pos: Vec2) {
    const spriteKey = toCharacterSpriteKey(packName);
    console.log("CharacterFactory: create() spriteKey:", spriteKey);
    return new Character(this.k, spriteKey, pos);
  }
}
