import type { CharacterPackManager } from "@feature/character-pack/character-pack.manager";
import { toCharacterSpriteKey } from "@feature/character-pack/utils";
import { createLogger } from "@shared/utils/logger";
import type { KAPLAYCtx, Vec2 } from "kaplay";
import { CharacterAIFactory } from "./ai/character-ai.factory";
import { KaplayCharacterAnimatorFactory } from "./animator/animator.factory";
import { Character } from "./character.gameobject";
import { allStates, CharacterState } from "./enums/state.enum";
import type { CharacterAnimatorFactory } from "./interfaces/character-animator-factory.interface";
import type { CharacterGameObj } from "./types";

export class CharacterFactory {
  private readonly logger = createLogger(CharacterFactory.name);

  private readonly animatorFactory: CharacterAnimatorFactory;
  private readonly characterAIFactory: CharacterAIFactory;

  constructor(
    private readonly k: KAPLAYCtx,
    private readonly characterPackManager: CharacterPackManager,
  ) {
    this.animatorFactory = new KaplayCharacterAnimatorFactory();
    this.characterAIFactory = new CharacterAIFactory(this.k);
  }

  create(packName: string, pos: Vec2 = this.k.center().toFixed(0)) {
    const pack = this.characterPackManager.get(packName);

    if (pack) {
      this.logger.log("new CharacterObj: ", packName);
      const gameObj = this.createKaplayObject(packName, pos);
      const animator = this.animatorFactory.create(pack.assets.sprite.type);
      const ai = this.characterAIFactory.create();
      return new Character(gameObj, animator, ai);
    } else {
      this.logger.warn("Pack Not Found.", packName);
    }
  }

  private createKaplayObject(packName: string, pos: Vec2): CharacterGameObj {
    const spriteKey = toCharacterSpriteKey(packName);

    const sprite = this.k.sprite(spriteKey);
    const initialPos = this.k.pos(pos.x, pos.y);
    const timer = this.k.timer();
    const state = this.k.state(CharacterState.Idle, allStates);
    const layer = this.k.layer("obj");
    return this.k.add([sprite, initialPos, timer, state, layer]);
  }
}
