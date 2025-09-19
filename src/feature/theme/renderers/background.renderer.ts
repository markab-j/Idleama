import type { BackgroundAsset } from "@feature/theme-pack/schema/background-asset.schema";
import { toBackgroundSpriteKey } from "@feature/theme-pack/utils";
import { randomInt } from "es-toolkit";
import type { GameObj, KAPLAYCtx, LevelComp, SpriteComp } from "kaplay";

export class BackgroundRenderer {
  private readonly VARIATION_SYMBOLS = "abcdefghijklmnopqrstuvwxyz";
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

      const tiles = this.generateTiles(key, backgroundAsset.variations);
      const map = this.generateMap(
        this.k.width(),
        this.k.height(),
        backgroundAsset.variations, 
        Math.min(backgroundAsset.tile.width, backgroundAsset.tile.height)
      );

      const newBackground = this.k.addLevel(
        map,
        {
          tileWidth: backgroundAsset.tile.width,
          tileHeight: backgroundAsset.tile.height,
          tiles,
        },
      );

      this.cache.set(packName, newBackground);
      this.currentBackground = newBackground;
    }
  }

  private generateTiles(
    spriteKey: string,
    variations: number,
  ): Record<string, () => SpriteComp[]> {
    const tiles: Record<string, () => SpriteComp[]> = {};
    const limit = Math.min(variations, this.VARIATION_SYMBOLS.length);

    for (let i = 0; i < limit; i++) {
      const charKey = this.VARIATION_SYMBOLS[i];
      const frameIndex = i;
      tiles[charKey] = () => [this.k.sprite(spriteKey, { frame: frameIndex })];
    }

    return tiles;
  }

  private generateMap(width: number, height: number, variations: number, tileSize: number): Array<string> {
    const availableChars = this.VARIATION_SYMBOLS.substring(0, Math.min(variations, this.VARIATION_SYMBOLS.length));

    if (availableChars.length === 0) {
      return [];
    }

    const rowRepeatCount = Math.ceil(width / tileSize);
    const colRepeatCount = Math.ceil(height / tileSize);

    const map = Array.from({ length: colRepeatCount }, () =>
      Array.from({ length: rowRepeatCount }, () =>
        availableChars[randomInt(0, availableChars.length)]
      ).join(""),
    );

    return map;
  }
}
