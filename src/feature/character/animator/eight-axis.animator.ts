import type { Move } from "@core/interfaces/move.interface";
import { isRight } from "@core/utils/direction";
import type { TweenController } from "kaplay";
import { Direction } from "../../../core/enum/direction.enum";
import { EightAxisAnimKey } from "../enums/character-anim-key.enum";
import type { CharacterAnimator } from "../interfaces/character-animator.interface";
import type { CharacterGameObj } from "../types";

export class EightAxisAnimator implements CharacterAnimator {
  private tweenMap: Map<CharacterGameObj, TweenController>;

  constructor() {
    this.tweenMap = new Map();
  }

  playIdle(gameObj: CharacterGameObj, beforeDirection?: Direction): void {
    if (beforeDirection) gameObj.play(this.getIdleAnimKey(beforeDirection));
    else gameObj.play(EightAxisAnimKey.IDLE_DOWN);

    gameObj.wait(2, () => {
      if (gameObj.getCurAnim()?.name !== EightAxisAnimKey.IDLE_DOWN)
        gameObj.play(EightAxisAnimKey.IDLE_DOWN);
    });
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

  private getIdleAnimKey(direction: Direction): EightAxisAnimKey {
    switch (direction) {
      case Direction.UP:
        return EightAxisAnimKey.IDLE_UP;
      case Direction.DOWN:
        return EightAxisAnimKey.IDLE_DOWN;
      case Direction.UP_RIGHT:
      case Direction.UP_LEFT:
        return EightAxisAnimKey.IDLE_UP_LEFT;
      case Direction.LEFT:
      case Direction.RIGHT:
        return EightAxisAnimKey.IDLE_LEFT;
      case Direction.DOWN_LEFT:
      case Direction.DOWN_RIGHT:
        return EightAxisAnimKey.IDLE_DOWN_LEFT;
    }
  }

  private getWalkAnimKey(direction: Direction): EightAxisAnimKey {
    switch (direction) {
      case Direction.DOWN:
        return EightAxisAnimKey.WALK_DOWN;
      case Direction.UP:
        return EightAxisAnimKey.WALK_UP;
      case Direction.UP_RIGHT:
      case Direction.UP_LEFT:
        return EightAxisAnimKey.WALK_UP_LEFT;
      case Direction.LEFT:
      case Direction.RIGHT:
        return EightAxisAnimKey.WALK_LEFT;
      case Direction.DOWN_LEFT:
      case Direction.DOWN_RIGHT:
        return EightAxisAnimKey.WALK_DOWN_LEFT;
    }
  }
}
