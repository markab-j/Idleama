import type { Direction } from "@core/enum/direction.enum";
import type { Vec2 } from "kaplay";

export interface Move {
  readonly start: Vec2;
  readonly dest: Vec2;
  readonly distance: number;
  readonly duration: number;
  readonly direction: Direction;
}
