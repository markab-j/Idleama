export enum CharacterAnim {
  IDLE_DOWN = `IDLE_DOWN`,
  IDLE_DOWN_LEFT = `IDLE_DOWN_LEFT`,
  IDLE_LEFT = `IDLE_LEFT`,
  IDLE_UP_LEFT = `IDLE_UP_LEFT`,
  IDLE_UP = `IDLE_UP`,
  WALK_DOWN = `WALK_DOWN`,
  WALK_DOWN_LEFT = `WALK_DOWN_LEFT`,
  WALK_LEFT = `WALK_LEFT`,
  WALK_UP_LEFT = `WALK_UP_LEFT`,
  WALK_UP = `WALK_UP`,
}

export type CharacterAnimType =
  (typeof CharacterAnim)[keyof typeof CharacterAnim];

export type IdleAnimType = Extract<CharacterAnimType, `IDLE_${string}`>;
export type WalkAnimType = Extract<CharacterAnimType, `WALK_${string}`>;
