import { KAPLAYCtx, TweenController, Vec2 } from "kaplay";
import { CharacterState } from "./enums/state.enum";
import { CharacterAnim } from "./enums/anim.enum";

export class CharacterFactory {
    private readonly allStates = Object.values(CharacterState);

    constructor(private readonly k: KAPLAYCtx) {}

    create(spriteKey: string, pos: Vec2) {
        const sprite = this.k.sprite(spriteKey);
        const initialPos = this.k.pos(pos.x, pos.y);
        const timer = this.k.timer();
        const state = this.k.state(CharacterState.Idle, this.allStates);

        const character = this.k.add([
            sprite,
            initialPos,
            state,
            timer,
        ]);

        let tween: TweenController;

        character.loop(5, () => {
            console.log("Try Change State");
            const i = this.k.randi(0, 2);

            const newState = this.allStates[i];

            character.enterState(newState);
        })

        character.onStateEnter(CharacterState.Idle, () => {
            console.log(`Enter ${CharacterState.Idle}`);
            character.play(CharacterAnim.Idle);
        });

        character.onStateEnter(CharacterState.Walk, () => {
            console.log(`Enter ${CharacterState.Walk}`);

            const r = this.k.rand(this.k.vec2(character.pos).add(20, 20), this.k.vec2(100, 100));

            if (tween) {
                tween.cancel();
            }
            
            tween = character.tween(character.pos, r, 4, (v) => character.pos = v.toFixed(0));
        });

        return character;
    }
}