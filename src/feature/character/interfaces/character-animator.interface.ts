import type { Direction } from "@core/enum/direction.enum";
import type { Move } from "@core/interfaces/move.interface";
import type { CharacterGameObj } from "@feature/character/types";
import type { TweenController } from "kaplay";

export interface CharacterAnimator {
  playIdle(
    characterGameObj: CharacterGameObj,
    beforeDirection?: Direction,
  ): void;
  playWalk(characterGameObj: CharacterGameObj, move: Move): TweenController;
}
