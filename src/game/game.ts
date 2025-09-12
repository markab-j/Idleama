import kaplay from "kaplay";
import { loadAssets } from "@/game/assets/load";
import { CharacterFactory } from "@/game/character/character.factory";
import { getCharacterSpriteKey } from "./assets/utils";
import { drawLevel } from "./map/draw-level";

export async function startGame(width: number, height: number) {
  const canvas = document.getElementById("game-container") as HTMLCanvasElement;

  const k = kaplay({
    // background: '#97D3D3',
    width,
    height,
    canvas,
    debug: true,
  });

  console.log("게임 캔버스 사이즈: ", {
    width,
    height,
  });

  await loadAssets(k);

  drawLevel(k);

  const characterFactory = new CharacterFactory(k);

  characterFactory.create("character_default", k.center().toFixed(0));
  characterFactory.create(
    getCharacterSpriteKey("testCharacter"),
    k.center().toFixed(0),
  );
}
