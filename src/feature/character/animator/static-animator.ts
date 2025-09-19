import type { Direction } from "@core/enum/direction.enum";
import type { Move } from "@core/interfaces/move.interface";
import type { CharacterAnimator } from "@feature/character/interfaces/character-animator.interface";
import type { TweenController } from "kaplay";
import type { CharacterGameObj } from "../types";

export class StaticAnimator implements CharacterAnimator {
  private readonly tweenMap: Map<CharacterGameObj, TweenController>;

  constructor() {
    this.tweenMap = new Map();
  }

  playIdle(_: CharacterGameObj, __?: Direction): void {}

  playWalk(gameObj: CharacterGameObj, move: Move): TweenController {
    const tween = this.tweenMap.get(gameObj);
    if (tween) tween.cancel();

    const newTween = gameObj.tween(
      gameObj.pos,
      move.dest,
      move.duration,
      (v) => {
        gameObj.pos = v.toFixed(0);
      },
    );

    this.tweenMap.set(gameObj, newTween);

    return newTween;
  }
}
