import type { AssetRegistrar } from "@core/interfaces/asset-loader.interface";
import type { KAPLAYCtx } from "kaplay";
import type { ReadonlyDeep } from "type-fest";
import type { CharacterSpriteAssetParser } from "./character-sprite-asset.parser";
import type { CharacterPack } from "./schema/character-pack.schema";
import { toCharacterSpriteKey } from "./utils";

export class CharacterPackAssetRegistrar
  implements AssetRegistrar<CharacterPack[]>
{
  constructor(
    private readonly k: KAPLAYCtx,
    private readonly spriteAssetParser: CharacterSpriteAssetParser,
  ) {}

  load(packs: ReadonlyDeep<CharacterPack[]>) {
    for (const pack of packs) {
      const key = toCharacterSpriteKey(pack.meta.name);
      const spriteAnims = this.spriteAssetParser.getSpriteOptions(pack.assets);

      this.k.loadSprite(key, pack.assets.sprite.src, spriteAnims);
    }
  }
}
