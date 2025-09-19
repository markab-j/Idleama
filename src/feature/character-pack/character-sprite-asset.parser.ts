import { CharacterSpriteType } from "@core/enum/character-sprite-type.enum";
import {
  EightAxisAnimKey,
  FourAxisAnimKey,
  IdleOnlyAnimKey,
} from "@feature/character/enums/character-anim-key.enum";
import type { LoadSpriteOpt, SpriteAnims } from "kaplay";
import type {
  EightAxisAnims,
  FourAxisAnims,
  IdleOnlyAnims,
} from "./schema/character-anim.schema";
import type { CharacterPackAsset } from "./schema/character-pack-asset.schema";
import type { CharacterSpriteAsset } from "./schema/character-sprite-asset.schema";

export class CharacterSpriteAssetParser {
  public getSpriteOptions(
    characterPackAsset: CharacterPackAsset,
  ): LoadSpriteOpt {
    return {
      sliceX: characterPackAsset.sprite.columns,
      sliceY: characterPackAsset.sprite.rows,
      anims: this.parseAnim(characterPackAsset.sprite),
    };
  }

  private parseAnim(asset: CharacterSpriteAsset): SpriteAnims | undefined {
    if (asset.type === CharacterSpriteType.STATIC) return undefined;
    if (asset.type === CharacterSpriteType.IDLE_ONLY)
      return this.parseIdleOnly(asset.anim);
    if (asset.type === CharacterSpriteType.FOUR_AXIS)
      return this.parse4Axis(asset.anims);
    if (asset.type === CharacterSpriteType.EIGHT_AXIS)
      return this.parse8Axis(asset.anims);

    return undefined;
  }

  private parseIdleOnly(anim: IdleOnlyAnims): SpriteAnims {
    const { frameCount, speed } = anim.IDLE;

    return {
      [IdleOnlyAnimKey.IDLE]: {
        from: 0,
        to: frameCount - 1,
        loop: true,
        speed,
      },
    };
  }

  private parse4Axis(anims: FourAxisAnims): SpriteAnims {
    const spriteAnims: SpriteAnims = {};
    let currentFrameIndex = 0;

    const animKeys = Object.values(FourAxisAnimKey);

    for (const animKey of animKeys) {
      const animData = anims[animKey];
      if (!animData) continue;

      const { frameCount, speed } = animData;
      const from = currentFrameIndex;
      const to = currentFrameIndex + frameCount - 1;

      spriteAnims[animKey] = { from, to, loop: true, speed };
      currentFrameIndex = to + 1;
    }

    return spriteAnims;
  }

  private parse8Axis(anims: EightAxisAnims): SpriteAnims {
    const spriteAnims: SpriteAnims = {};
    let currentFrameIndex = 0;

    const animKeys = Object.values(EightAxisAnimKey);

    for (const animKey of animKeys) {
      const animData = anims[animKey];
      if (!animData) continue;

      const { frameCount, speed } = animData;
      const from = currentFrameIndex;
      const to = currentFrameIndex + frameCount - 1;

      spriteAnims[animKey] = { from, to, loop: true, speed };
      currentFrameIndex = to + 1;
    }

    return spriteAnims;
  }
}
