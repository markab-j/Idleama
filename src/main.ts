import { initTitleBar, initWindow } from "@/ui";
import { initPath } from "./data/init";
import { loadAssets } from "./game/assets/load";
import { getCharacterSpriteKey } from "./game/assets/utils";
import { CharacterFactory } from "./game/character/character.factory";
import { initGame } from "./game/init-game";
import { drawLevel } from "./game/map/draw-level";

async function main() {
  await initPath();
  const { size, scaleFactor } = await initWindow();

  const width = size.width / scaleFactor;
  const height = size.height / scaleFactor;

  const k = await initGame(width, height);

  // Data Load
  await loadAssets(k);

  // Prepare
  drawLevel(k);
  await initTitleBar();

  // Main
  const characterFactory = new CharacterFactory(k);

  characterFactory.create(
    getCharacterSpriteKey("template"),
    k.center().toFixed(0),
  );
  characterFactory.create(
    getCharacterSpriteKey("testCharacter"),
    k.center().toFixed(0),
  );
}

main()
  .then(() => console.log("Initialized"))
  .catch((e) => console.error(e));
