import { CharacterAnim } from "@feature/character/enums/anim.enum";
import type { LoadSpriteOpt, SpriteAnims } from "kaplay";
import type { CharacterAnimMap } from "./schema/character-anim-map.schema";
import type { CharacterPackAsset } from "./schema/character-pack-asset.schema";

export class CharacterSpriteAssetParser {
  public get8Axis(characterPackAsset: CharacterPackAsset): LoadSpriteOpt {
    return {
      sliceX: characterPackAsset.sprite.columns,
      sliceY: characterPackAsset.sprite.rows,
      anims: this.parseAnim(characterPackAsset.anims),
    };
  }

  private parseAnim(
    characterAnimMap: CharacterAnimMap,
    speed: number = 5,
  ): SpriteAnims {
    const spriteAnims: SpriteAnims = {};
    let currentFrameIndex = 0;
    const animNames = Object.keys(CharacterAnim) as CharacterAnim[];

    for (const animName of animNames) {
      const animData = characterAnimMap[animName];
      const frameCount = animData.frameCount;

      const from = currentFrameIndex;
      const to = currentFrameIndex + frameCount - 1;

      spriteAnims[animName] = { from, to, loop: true, speed };

      currentFrameIndex = to + 1;
    }

    return spriteAnims;
  }
}
