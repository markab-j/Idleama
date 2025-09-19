import type { Move } from "@core/interfaces/move.interface";
import { isRight } from "@core/utils/direction";
import type { TweenController } from "kaplay";
import { IdleOnlyAnimKey } from "../enums/character-anim-key.enum";
import type { CharacterAnimator } from "../interfaces/character-animator.interface";
import type { CharacterGameObj } from "../types";

export class IdleOnlyAnimator implements CharacterAnimator {
  private readonly tweenMap: Map<CharacterGameObj, TweenController>;

  constructor() {
    this.tweenMap = new Map();
  }

  playIdle(gameObj: CharacterGameObj): void {
    if (!gameObj.getCurAnim()) gameObj.play(IdleOnlyAnimKey.IDLE);
  }

  playWalk(gameObj: CharacterGameObj, move: Move): TweenController {
    gameObj.flipX = isRight(move.direction);

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
