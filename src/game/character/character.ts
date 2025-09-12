import type {GameObj, KAPLAYCtx, PosComp, SpriteComp, StateComp, TimerComp, TweenController, Vec2} from 'kaplay';
import {allStates, CharacterState} from '@/game/character/enums/state.enum.ts';
import {CharacterAnim} from '@/game/character/enums/anim.enum.ts';
import {clampPosToScreen} from '@/game/utils/world.ts';
import { getDirection, isRight } from '../utils/direction';
import { getIdleAnimKey, getWalkAnimKey } from '../utils/anim';
import { DirectionType } from './enums/direction.enum';

export class Character {
    private readonly SPEED = 10;
    private readonly MOVE_RADIUS = 150;
    tween?: TweenController;
    gameObj: GameObj<SpriteComp | PosComp | TimerComp | StateComp>;

    constructor(k: KAPLAYCtx, spriteKey: string, pos: Vec2) {
        const sprite = k.sprite(spriteKey);
        const initialPos = k.pos(pos.x, pos.y);
        const timer = k.timer();
        const state = k.state(CharacterState.Idle, allStates);

        this.gameObj = k.add([
            sprite,
            initialPos,
            timer,
            state,
        ]);

        this.gameObj.onStateEnter(CharacterState.Idle, (beforeDirection?: DirectionType) => {
            console.log(`${this.gameObj.id}: Enter ${CharacterState.Idle}`);

            this.updateIdleAnim(beforeDirection);
            this.gameObj.wait(1, () => this.gameObj.play(CharacterAnim.IDLE_DOWN));
            this.gameObj.wait(k.randi(3, 10), () => this.gameObj.enterState(CharacterState.Walk));
        });

        this.gameObj.onStateEnter(CharacterState.Walk, () => {
            console.log(`${this.gameObj.id}: Enter ${CharacterState.Walk}`);

            const minPos = this.gameObj.pos.sub(this.MOVE_RADIUS, this.MOVE_RADIUS);
            const maxPos = this.gameObj.pos.add(this.MOVE_RADIUS, this.MOVE_RADIUS);
            const randomPos = k.rand(minPos, maxPos).toFixed(0);

            const dest = clampPosToScreen(k, randomPos, this.gameObj);

            const distance = this.gameObj.pos.dist(dest);
            const duration = distance / this.SPEED;

            if (this.tween) {
                this.tween.cancel();
            }

            const direction = getDirection(this.gameObj.pos, dest);

            this.updateWalkAnim(direction);

            this.tween = this.gameObj.tween(
                this.gameObj.pos,
                dest,
                duration,
                (v) => this.gameObj.pos = v.toFixed(0),
            );

            this.tween.then(() => this.gameObj.enterState(CharacterState.Idle, direction));
        });
    }

    private updateIdleAnim(beforeDirection?: DirectionType) {
        if (beforeDirection) this.gameObj.play(getIdleAnimKey(beforeDirection));
        else this.gameObj.play(CharacterAnim.IDLE_DOWN);
    }

    private updateWalkAnim(direction: DirectionType) {
        this.gameObj.flipX = isRight(direction);

        const animKey = getWalkAnimKey(direction);

        this.gameObj.play(animKey);
    }
}