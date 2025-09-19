import type {
  GameObj,
  LayerComp,
  PosComp,
  SpriteComp,
  StateComp,
  TimerComp,
} from "kaplay";

export type CharacterGameObj = GameObj<
  SpriteComp | PosComp | TimerComp | StateComp | LayerComp
>;
