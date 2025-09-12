import { KAPLAYCtx, SpriteAnim, SpriteAtlasData } from "kaplay";
import { CharacterAnim } from "./character/enums/anim.enum";

const CHARACTER_WIDTH = 16;
const CHARACTER_HEIGHT = 32;

export function loadAssets(k: KAPLAYCtx): void {

    loadDefaultCharacter(k);

    k.loadSprite("grass_tile", "src/assets/grass_tile.png", {
        sliceX: 11,
        sliceY: 7, 
    })
}

function loadDefaultCharacter(k: KAPLAYCtx): void {
    k.loadJSON("character_data_default" ,'src/assets/chracters/default/chracter.json');
    k.loadSpriteAtlas("src/assets/chracters/default/sprite.png", getCharacterSpriteAtlasData('default'));
}

function getCharacterSpriteAtlasData(id: string): SpriteAtlasData {
    return {
        [`character_${id}`]: {
            x: 0,
            y: 0,
            width: CHARACTER_WIDTH * 4,
            height: CHARACTER_HEIGHT * 10,
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
        }
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