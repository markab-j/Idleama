import { CharacterSpriteType } from "@core/enum/character-sprite-type.enum";
import type { CharacterAnimator } from "../interfaces/character-animator.interface";
import type { CharacterAnimatorFactory } from "../interfaces/character-animator-factory.interface";
import { EightAxisAnimator } from "./eight-axis.animator";
import { FourAxisAnimator } from "./four-axis.animator";
import { IdleOnlyAnimator } from "./idle-only.animator";
import { StaticAnimator } from "./static-animator";

export class KaplayCharacterAnimatorFactory
  implements CharacterAnimatorFactory
{
  private readonly cache = new Map<CharacterSpriteType, CharacterAnimator>();

  create(type: CharacterSpriteType): CharacterAnimator {
    const animator = this.cache.get(type);

    if (animator) return animator;

    let newAnimator: CharacterAnimator;

    switch (type) {
      case CharacterSpriteType.STATIC:
        newAnimator = new StaticAnimator();
        break;
      case CharacterSpriteType.IDLE_ONLY:
        newAnimator = new IdleOnlyAnimator();
        break;
      case CharacterSpriteType.FOUR_AXIS:
        newAnimator = new FourAxisAnimator();
        break;
      case CharacterSpriteType.EIGHT_AXIS:
        newAnimator = new EightAxisAnimator();
        break;
    }

    this.cache.set(type, newAnimator);

    return newAnimator;
  }
}
