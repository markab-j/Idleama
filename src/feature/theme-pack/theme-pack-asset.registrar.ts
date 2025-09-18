import type { AssetRegistrar } from "@core/interfaces/asset-loader.interface";
import type { KAPLAYCtx } from "kaplay";
import type { ReadonlyDeep } from "type-fest";
import type { ThemePack } from "./schema/theme-pack.schema";
import { toBackgroundSpriteKey } from "./utils";

export class ThemePackAssetRegistrar implements AssetRegistrar<ThemePack[]> {
  constructor(private readonly k: KAPLAYCtx) {}

  load(themePacks: ReadonlyDeep<ThemePack[]>): void {
    for (const pack of themePacks) {
      this.k.loadSprite(
        toBackgroundSpriteKey(pack.meta.name),
        pack.assets.background.src,
        {
          sliceX: 11,
          sliceY: 7,
        },
      );
    }
  }
}
