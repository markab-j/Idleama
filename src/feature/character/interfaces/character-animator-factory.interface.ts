import type { CharacterSpriteType } from "@core/enum/character-sprite-type.enum";
import type { CharacterAnimator } from "./character-animator.interface";

export interface CharacterAnimatorFactory {
  create(type: CharacterSpriteType): CharacterAnimator;
}
