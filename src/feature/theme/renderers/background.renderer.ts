import { toBackgroundSpriteKey } from "@feature/theme-pack/utils";
import type { GameObj, KAPLAYCtx, LevelComp } from "kaplay";
import type { BackgroundAsset } from "@/feature/theme-pack/schema/background-asset.schema";

export class BackgroundRenderer {
  private readonly cache: Map<string, GameObj<LevelComp>>;
  private currentBackground: GameObj<LevelComp> | null;

  constructor(private readonly k: KAPLAYCtx) {
    this.cache = new Map();
    this.currentBackground = null;
  }

  render(packName: string, backgroundAsset: BackgroundAsset): void {
    if (this.currentBackground) {
      this.currentBackground.hidden = true;
    }

    const cachedBackground = this.cache.get(packName);

    if (cachedBackground) {
      cachedBackground.hidden = false;
      this.currentBackground = cachedBackground;
    } else {
      const key = toBackgroundSpriteKey(packName);
      const newBackground = this.k.addLevel(
        this.generateMap(this.k, this.k.width(), this.k.height()),
        {
          tileWidth: backgroundAsset.tile.width,
          tileHeight: backgroundAsset.tile.height,
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
        },
      );

      this.cache.set(packName, newBackground);
      this.currentBackground = newBackground;
    }
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
