import type { KAPLAYCtx, Vec2 } from "kaplay";
import { toCharacterSpriteKey } from "@/feature/character-pack/utils";
import { Character } from "@/game/character/character.ts";
import { createLogger } from "@/core/utils/logger";

export class CharacterFactory {
  private readonly logger = createLogger(CharacterFactory.name);

  constructor(private readonly k: KAPLAYCtx) {}

  create(packName: string, pos: Vec2) {
    this.logger.log("new CharacterObj: ", packName);
    const spriteKey = toCharacterSpriteKey(packName);
    return new Character(this.k, spriteKey, pos);
  }
}
