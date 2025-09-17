import type { KAPLAYCtx, Vec2 } from "kaplay";
import { createLogger } from "@/core/utils/logger";
import { toCharacterSpriteKey } from "@/feature/character-pack/utils";
import { CharacterGameObj } from "./character.gameobject";

export class CharacterFactory {
  private readonly logger = createLogger(CharacterFactory.name);

  constructor(private readonly k: KAPLAYCtx) {}

  create(packName: string, pos: Vec2 = this.k.center().toFixed(0)) {
    this.logger.log("new CharacterObj: ", packName);
    const spriteKey = toCharacterSpriteKey(packName);
    return new CharacterGameObj(this.k, spriteKey, pos);
  }
}
