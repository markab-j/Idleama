export const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  UP_RIGHT: "UP_RIGHT",
  UP_LEFT: "UP_LEFT",
  DOWN_RIGHT: "DOWN_RIGHT",
  DOWN_LEFT: "DOWN_LEFT",
} as const;

export type DirectionType = (typeof Direction)[keyof typeof Direction];
