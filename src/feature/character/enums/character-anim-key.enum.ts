export enum IdleOnlyAnimKey {
  IDLE = "IDLE",
}

export enum FourAxisAnimKey {
  IDLE_DOWN = "IDLE_DOWN",
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_UP = "IDLE_UP",
  WALK_DOWN = "WALK_DOWN",
  WALK_LEFT = "WALK_LEFT",
  WALK_UP = "WALK_UP",
}

export enum EightAxisAnimKey {
  IDLE_DOWN = "IDLE_DOWN",
  IDLE_DOWN_LEFT = "IDLE_DOWN_LEFT",
  IDLE_LEFT = "IDLE_LEFT",
  IDLE_UP = "IDLE_UP",
  IDLE_UP_LEFT = "IDLE_UP_LEFT",
  WALK_DOWN = "WALK_DOWN",
  WALK_DOWN_LEFT = "WALK_DOWN_LEFT",
  WALK_LEFT = "WALK_LEFT",
  WALK_UP = "WALK_UP",
  WALK_UP_LEFT = "WALK_UP_LEFT",
}

export type CharacterAnimKey =
  | IdleOnlyAnimKey
  | FourAxisAnimKey
  | EightAxisAnimKey;
export type IdleAnimType = Extract<CharacterAnimKey, `IDLE_${string}` | "IDLE">;
export type WalkAnimType = Extract<CharacterAnimKey, `WALK_${string}`>;
