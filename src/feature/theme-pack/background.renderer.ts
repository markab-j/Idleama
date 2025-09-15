import type { KAPLAYCtx } from "kaplay";
import type { ThemePack } from "./schema/theme.schema";
import { toBackgroundSpriteKey } from "./utils";

export class BackGroundRenderer {
  constructor(private readonly k: KAPLAYCtx) {}

  render(pack: ThemePack) {
    const key = toBackgroundSpriteKey(pack.meta.name);

    this.k.addLevel(this.generateMap(this.k, this.k.width(), this.k.height()), {
      tileWidth: pack.sprite.width,
      tileHeight: pack.sprite.height,
      tiles: {
        "1": () => [this.k.sprite(key, { frame: 56 })],
        "2": () => [this.k.sprite(key, { frame: 57 })],
        "3": () => [this.k.sprite(key, { frame: 58 })],
        "4": () => [this.k.sprite(key, { frame: 59 })],
        "5": () => [this.k.sprite(key, { frame: 60 })],
        "6": () => [this.k.sprite(key, { frame: 66 })],
        "7": () => [this.k.sprite(key, { frame: 67 })],
        "8": () => [this.k.sprite(key, { frame: 68 })],
        "9": () => [this.k.sprite(key, { frame: 12 })],
      },
    });
  }

  private generateMap(
    k: KAPLAYCtx,
    width: number,
    height: number,
  ): Array<string> {
    const tileSize = 16;

    const rowRepeatCount = Math.ceil(width / tileSize);
    const colRepeatCount = Math.ceil(height / tileSize);

    const map = Array.from({ length: colRepeatCount }).map(() =>
      Array.from({ length: rowRepeatCount })
        .map(() => String(k.randi(1, 10)))
        .join(""),
    );

    return map;
  }
}
