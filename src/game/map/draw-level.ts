import type { KAPLAYCtx } from "kaplay";
import { generateMap } from "./generate-map";

export function drawLevel(k: KAPLAYCtx) {
  k.addLevel(generateMap(k, k.width(), k.height()), {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      "1": () => [k.sprite("tile_default", { frame: 56 })],
      "2": () => [k.sprite("tile_default", { frame: 57 })],
      "3": () => [k.sprite("tile_default", { frame: 58 })],
      "4": () => [k.sprite("tile_default", { frame: 59 })],
      "5": () => [k.sprite("tile_default", { frame: 60 })],
      "6": () => [k.sprite("tile_default", { frame: 66 })],
      "7": () => [k.sprite("tile_default", { frame: 67 })],
      "8": () => [k.sprite("tile_default", { frame: 68 })],
      "9": () => [k.sprite("tile_default", { frame: 69 })],
      "10": () => [k.sprite("tile_default", { frame: 12 })],
    },
  });
}
