import type { Direction } from "@core/enum/direction.enum";
import { randomInt } from "es-toolkit";
import type { CharacterAI } from "./ai/character-ai";
import { CharacterState } from "./enums/state.enum";
import type { CharacterAnimator } from "./interfaces/character-animator.interface";
import type { CharacterGameObj } from "./types";

export class Character {
  constructor(
    public readonly gameObj: CharacterGameObj,
    private readonly animator: CharacterAnimator,
    private readonly ai: CharacterAI,
  ) {
    this.gameObj.onStateEnter(
      CharacterState.Idle,
      (beforeDirection?: Direction) => this.Idle(beforeDirection),
    );

    this.gameObj.onStateEnter(CharacterState.Walk, () => this.walk());
  }

  private walk() {
    const move = this.ai.walk(this.gameObj);
    const tween = this.animator.playWalk(this.gameObj, move);

    tween.then(() =>
      this.gameObj.enterState(CharacterState.Idle, move.direction),
    );
  }

  private Idle(beforeDirection?: Direction) {
    this.animator.playIdle(this.gameObj, beforeDirection);
    const newState = this.ai.nextState();
    this.gameObj.wait(randomInt(3, 10), () =>
      this.gameObj.enterState(newState),
    );
  }
}
