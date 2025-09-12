import { KAPLAYCtx } from "kaplay";
import { generateMap } from "./generate-map";

export function drawLevel(k: KAPLAYCtx) {
k.addLevel(generateMap(k, k.width(), k.height()), {
        tileWidth: 16,
        tileHeight: 16,
        tiles: {
            "1": () => [
                k.sprite("grass_tile", { frame: 56 })
            ],
            "2": () => [
                k.sprite("grass_tile", { frame: 57 })
            ],
            "3": () => [
                k.sprite("grass_tile", { frame: 58 })
            ],
            "4": () => [
                k.sprite("grass_tile", { frame: 59 })
            ],
            "5": () => [
                k.sprite("grass_tile", { frame: 60 })
            ],
            "6": () => [
                k.sprite("grass_tile", { frame: 66 })
            ],
            "7": () => [
                k.sprite("grass_tile", { frame: 67 })
            ],
            "8": () => [
                k.sprite("grass_tile", { frame: 68 })
            ],
            "9": () => [
                k.sprite("grass_tile", { frame: 69 })
            ],
            "10": () => [
                k.sprite("grass_tile", { frame: 12 })
            ],
        }
    })
}