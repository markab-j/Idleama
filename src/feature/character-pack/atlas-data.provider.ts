import type { SpriteAnim, SpriteAtlasData } from "kaplay";
import { CharacterAnim } from "@/game/character/enums/anim.enum";
import type { CharacterPack } from "./schema/character-pack-json.schema";
import { toCharacterSpriteKey } from "./utils";

export class CharacterSpriteAtlasDataProvider {
  get8AxisAtlasData(pack: CharacterPack): SpriteAtlasData {
    return {
      [toCharacterSpriteKey(pack.name)]: {
        x: 0,
        y: 0,
        width: pack.sprite.width * 4,
        height: pack.sprite.height * 10,
        sliceX: 4,
        sliceY: 10,
        anims: {
          [`${CharacterAnim.IDLE_DOWN}`]: getCharacterSpriteAnim(0),
          [`${CharacterAnim.IDLE_DOWN_LEFT}`]: getCharacterSpriteAnim(1),
          [`${CharacterAnim.IDLE_LEFT}`]: getCharacterSpriteAnim(2),
          [`${CharacterAnim.IDLE_UP_LEFT}`]: getCharacterSpriteAnim(3),
          [`${CharacterAnim.IDLE_UP}`]: getCharacterSpriteAnim(4),
          [`${CharacterAnim.WALK_DOWN}`]: getCharacterSpriteAnim(5),
          [`${CharacterAnim.WALK_DOWN_LEFT}`]: getCharacterSpriteAnim(6),
          [`${CharacterAnim.WALK_LEFT}`]: getCharacterSpriteAnim(7),
          [`${CharacterAnim.WALK_UP_LEFT}`]: getCharacterSpriteAnim(8),
          [`${CharacterAnim.WALK_UP}`]: getCharacterSpriteAnim(9),
        },
      },
    };
  }
}

function getCharacterSpriteAnim(index: number, speed: number = 5): SpriteAnim {
  return {
    from: index * 4,
    to: index * 4 + 3,
    loop: true,
    speed: speed,
  };
}
