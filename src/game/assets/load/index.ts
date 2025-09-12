import type { KAPLAYCtx } from "kaplay";
import { loadDefaultCharacter } from "@/game/assets/load-default-character";
import { loadCharacterPacks } from "./character-packs";

export async function loadAssets(k: KAPLAYCtx): Promise<void> {
  loadDefaultCharacter(k);
  k.loadSprite("grass_tile", "src/game/assets/default/grass_tile.png", {
    sliceX: 11,
    sliceY: 7,
  });

  await loadCharacterPacks(k);
}
