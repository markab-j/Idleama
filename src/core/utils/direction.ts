import { Direction } from "@core/enum/direction.enum";
import type { Vec2 } from "kaplay";

export function isRight(direction: Direction): boolean {
  return direction.includes("RIGHT");
}

export function getDirection(start: Vec2, end: Vec2): Direction {
  if (start.x === end.x && start.y === end.y) {
    return Direction.DOWN;
  }

  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const slice = Math.PI / 8;

  if (angle > -slice && angle <= slice) {
    return Direction.RIGHT;
  }
  if (angle > slice && angle <= 3 * slice) {
    return Direction.DOWN_RIGHT;
  }
  if (angle > 3 * slice && angle <= 5 * slice) {
    return Direction.DOWN;
  }
  if (angle > 5 * slice && angle <= 7 * slice) {
    return Direction.DOWN_LEFT;
  }
  if (angle > 7 * slice || angle <= -7 * slice) {
    return Direction.LEFT;
  }
  if (angle > -7 * slice && angle <= -5 * slice) {
    return Direction.UP_LEFT;
  }
  if (angle > -5 * slice && angle <= -3 * slice) {
    return Direction.UP;
  }

  return Direction.UP_RIGHT;
}
