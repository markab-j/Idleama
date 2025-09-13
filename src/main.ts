import { initTitleBar, initWindow } from "@/ui";
import { initPath } from "./data/init";
import { loadAssets } from "./game/assets/load";
import { initGame } from "./game/init-game";
import { CharacterManager } from "./game/manager/character-manager";
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
  const characterManager = new CharacterManager(k);

  characterManager.createEnabledCharacters();
}

main()
  .then(() => console.log("Initialized"))
  .catch((e) => console.error(e));
