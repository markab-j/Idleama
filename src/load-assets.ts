import { KAPLAYCtx } from "kaplay";
import { CharacterAnim } from "./character/enums/anim.enum";

export function loadAssets(k: KAPLAYCtx): void {
    k.loadSprite("default", "src/assets/default_character.png", {
        sliceX: 9,
        sliceY: 1,
        anims: {
            [`${CharacterAnim.Idle}`]: { from: 0, to: 8, loop: true },
        },
    });
}