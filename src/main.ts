import { initTitleBar, initWindow } from "@/ui";
import { CharacterPackConfig } from "./data/config/character-pack-config";
import { initPath } from "./data/init";
import { loadAssets } from "./game/assets/load";
import { initGame } from "./game/init-game";
import { CharacterManager } from "./game/manager/character-manager";
import { CharacterPackManager } from "./game/manager/character-pack-manager";
import { drawLevel } from "./game/map/draw-level";

async function main() {
  const { size, scaleFactor } = await initWindow();

  const width = size.width / scaleFactor;
  const height = size.height / scaleFactor;

  await initPath();
  const k = await initGame(width, height);

  const characterPackConfig = new CharacterPackConfig();
  await characterPackConfig.load();

  const characterPackManager = new CharacterPackManager(characterPackConfig);

  // Data Load
  await loadAssets(k, characterPackManager);

  // Prepare
  drawLevel(k);
  await initTitleBar(characterPackManager);

  // Main
  const characterManager = new CharacterManager(k, characterPackManager);
  characterManager.createEnabledCharacters();
}

main()
  .then(() => console.log("Initialized"))
  .catch((e) => console.error(e));
