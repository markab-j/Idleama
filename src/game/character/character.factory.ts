import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Character } from "@/game/character/character.ts";
import { getCharacterSpriteKey } from "../assets/utils";

export class CharacterFactory {
  constructor(private readonly k: KAPLAYCtx) {}

  create(packName: string, pos: Vec2) {
    const spriteKey = getCharacterSpriteKey(packName);
    console.log("CharacterFactory: create() spriteKey:", spriteKey);
    return new Character(this.k, spriteKey, pos);
  }
}
