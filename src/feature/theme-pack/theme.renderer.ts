import type { GameObj, KAPLAYCtx, LevelComp } from "kaplay";
import type { ThemePack } from "./schema/theme-pack.schema";
import { toBackgroundSpriteKey } from "./utils";

export class ThemeRenderer {
  private readonly cache: Map<string, GameObj<LevelComp>>;
  private currentBackground: GameObj<LevelComp> | null;

  constructor(private readonly k: KAPLAYCtx) {
    this.cache = new Map();
    this.currentBackground = null;
  }

  render(pack: ThemePack): void {
    if (this.currentBackground) {
      this.currentBackground.hidden = true;
    }

    const cachedBackground = this.cache.get(pack.meta.name);

    if (cachedBackground) {
      cachedBackground.hidden = false;
      this.currentBackground = cachedBackground;
    } else {
      const key = toBackgroundSpriteKey(pack.meta.name);
      const newBackground = this.k.addLevel(
        this.generateMap(this.k, this.k.width(), this.k.height()),
        {
          tileWidth: pack.assets.background.tile.width,
          tileHeight: pack.assets.background.tile.height,
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

      this.cache.set(pack.meta.name, newBackground);
      this.currentBackground = newBackground;
    }

    document.documentElement.style.setProperty(
      "--top-border-sprite",
      `url(${pack.assets.border.src})`,
    );
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
