import type { Move } from "@core/interfaces/move.interface";
import { getDirection } from "@core/utils/direction";
import { clampPosToScreen } from "@core/utils/world";
import type { KAPLAYCtx } from "kaplay";
import { CharacterState } from "../enums/state.enum";
import type { CharacterGameObj } from "../types";

export class CharacterAI {
  private readonly SPEED = 10;
  private readonly MOVE_RADIUS = 150;

  constructor(private readonly k: KAPLAYCtx) {}

  nextState() {
    return CharacterState.Walk;
  }

  walk(gameObj: CharacterGameObj): Move {
    const start = gameObj.pos.clone();
    const minPos = gameObj.pos.sub(this.MOVE_RADIUS, this.MOVE_RADIUS);
    const maxPos = gameObj.pos.add(this.MOVE_RADIUS, this.MOVE_RADIUS);

    const randomPos = this.k.rand(minPos, maxPos).toFixed(0);

    const dest = clampPosToScreen(this.k, randomPos, gameObj);

    const distance = gameObj.pos.dist(dest);
    const duration = distance / this.SPEED;

    const direction = getDirection(start, dest);

    return {
      start,
      dest,
      distance,
      duration,
      direction,
    };
  }
}
