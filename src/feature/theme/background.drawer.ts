import type { KAPLAYCtx } from "kaplay";

export class BackGroundDrawer {
  constructor(private readonly k: KAPLAYCtx) {}

  draw() {
    this.k.addLevel(this.generateMap(this.k, this.k.width(), this.k.height()), {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        "1": () => [this.k.sprite("tile_default", { frame: 56 })],
        "2": () => [this.k.sprite("tile_default", { frame: 57 })],
        "3": () => [this.k.sprite("tile_default", { frame: 58 })],
        "4": () => [this.k.sprite("tile_default", { frame: 59 })],
        "5": () => [this.k.sprite("tile_default", { frame: 60 })],
        "6": () => [this.k.sprite("tile_default", { frame: 66 })],
        "7": () => [this.k.sprite("tile_default", { frame: 67 })],
        "8": () => [this.k.sprite("tile_default", { frame: 68 })],
        "9": () => [this.k.sprite("tile_default", { frame: 69 })],
        "10": () => [this.k.sprite("tile_default", { frame: 12 })],
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
