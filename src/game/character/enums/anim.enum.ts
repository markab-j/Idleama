import { Direction } from "./direction.enum";

export const CharacterAnim = {
  IDLE_UP: `IDLE_${Direction.UP}`,
  IDLE_DOWN: `IDLE_${Direction.DOWN}`,
  IDLE_LEFT: `IDLE_${Direction.LEFT}`,
  IDLE_UP_LEFT: `IDLE_${Direction.UP_LEFT}`,
  IDLE_DOWN_LEFT: `IDLE_${Direction.DOWN_LEFT}`,
  WALK_UP: `WALK_${Direction.UP}`,
  WALK_DOWN: `WALK_${Direction.DOWN}`,
  WALK_LEFT: `WALK_${Direction.LEFT}`,
  WALK_UP_LEFT: `WALK_${Direction.UP_LEFT}`,
  WALK_DOWN_LEFT: `WALK_${Direction.DOWN_LEFT}`,
} as const;

export type CharacterAnimType = typeof CharacterAnim[keyof typeof CharacterAnim];

export type IdleAnimType = Extract<CharacterAnimType, `IDLE_${string}`>;
export type WalkAnimType = Extract<CharacterAnimType, `WALK_${string}`>;