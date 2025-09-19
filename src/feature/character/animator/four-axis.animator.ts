import type { Move } from "@core/interfaces/move.interface";
import { isRight } from "@core/utils/direction";
import type { TweenController } from "kaplay";
import { Direction } from "../../../core/enum/direction.enum";
import { FourAxisAnimKey } from "../enums/character-anim-key.enum";
import type { CharacterAnimator } from "../interfaces/character-animator.interface";
import type { CharacterGameObj } from "../types";

export class FourAxisAnimator implements CharacterAnimator {
  private tweenMap: Map<CharacterGameObj, TweenController>;

  constructor() {
    this.tweenMap = new Map();
  }

  playIdle(gameObj: CharacterGameObj, beforeDirection?: Direction): void {
    if (beforeDirection) gameObj.play(this.getIdleAnimKey(beforeDirection));
    else gameObj.play(FourAxisAnimKey.IDLE_DOWN);
  }

  playWalk(gameObj: CharacterGameObj, move: Move): TweenController {
    gameObj.flipX = isRight(move.direction);

    gameObj.play(this.getWalkAnimKey(move.direction));

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

  private getIdleAnimKey(direction: Direction): FourAxisAnimKey {
    switch (direction) {
      case Direction.UP:
        return FourAxisAnimKey.IDLE_UP;
      case Direction.DOWN:
        return FourAxisAnimKey.IDLE_DOWN;
      case Direction.DOWN_LEFT:
      case Direction.DOWN_RIGHT:
      case Direction.LEFT:
      case Direction.RIGHT:
      case Direction.UP_RIGHT:
      case Direction.UP_LEFT:
        return FourAxisAnimKey.IDLE_LEFT;
    }
  }

  private getWalkAnimKey(direction: Direction): FourAxisAnimKey {
    switch (direction) {
      case Direction.UP:
        return FourAxisAnimKey.WALK_UP;
      case Direction.DOWN:
        return FourAxisAnimKey.WALK_DOWN;
      case Direction.DOWN_LEFT:
      case Direction.DOWN_RIGHT:
      case Direction.LEFT:
      case Direction.RIGHT:
      case Direction.UP_RIGHT:
      case Direction.UP_LEFT:
        return FourAxisAnimKey.WALK_LEFT;
    }
  }
}
