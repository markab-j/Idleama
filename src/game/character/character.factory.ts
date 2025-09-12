import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Character } from "@/game/character/character.ts";

export class CharacterFactory {
  constructor(private readonly k: KAPLAYCtx) {}

  create(spriteKey: string, pos: Vec2) {
    console.log('CharacterFactory: create() spriteKey:', spriteKey);
    return new Character(this.k, spriteKey, pos);
  }
}
