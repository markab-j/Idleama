import type { GameObj, KAPLAYCtx, SpriteComp, Vec2 } from "kaplay";

export function clampPosToScreen(
  k: KAPLAYCtx,
  vec: Vec2,
  spriteComp: GameObj<SpriteComp>,
): Vec2 {
  const clampedX = k.clamp(vec.x, 0, k.width() - spriteComp.width);
  const clampedY = k.clamp(vec.y, 0, k.height() - spriteComp.height);
  return k.vec2(clampedX, clampedY);
}
