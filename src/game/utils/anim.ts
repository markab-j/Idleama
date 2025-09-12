import {
  CharacterAnim,
  type CharacterAnimType,
} from "../character/enums/anim.enum";
import type { DirectionType } from "../character/enums/direction.enum";

const IdleAnimMap: Record<DirectionType, CharacterAnimType> = {
  UP: CharacterAnim.IDLE_UP,
  DOWN: CharacterAnim.IDLE_DOWN,
  LEFT: CharacterAnim.IDLE_LEFT,
  UP_LEFT: CharacterAnim.IDLE_UP_LEFT,
  DOWN_LEFT: CharacterAnim.IDLE_DOWN_LEFT,

  RIGHT: CharacterAnim.IDLE_LEFT,
  DOWN_RIGHT: CharacterAnim.IDLE_DOWN_LEFT,
  UP_RIGHT: CharacterAnim.IDLE_UP_LEFT,
};

export function getIdleAnimKey(direction: DirectionType) {
  return IdleAnimMap[direction];
}

const WalkAnimMap: Record<DirectionType, CharacterAnimType> = {
  UP: CharacterAnim.WALK_UP,
  DOWN: CharacterAnim.WALK_DOWN,
  LEFT: CharacterAnim.WALK_LEFT,
  UP_LEFT: CharacterAnim.WALK_UP_LEFT,
  DOWN_LEFT: CharacterAnim.WALK_DOWN_LEFT,

  RIGHT: CharacterAnim.WALK_LEFT,
  DOWN_RIGHT: CharacterAnim.WALK_DOWN_LEFT,
  UP_RIGHT: CharacterAnim.WALK_UP_LEFT,
};

export function getWalkAnimKey(direction: DirectionType): CharacterAnimType {
  return WalkAnimMap[direction];
}
