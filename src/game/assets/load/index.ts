import type { KAPLAYCtx } from "kaplay";
import { loadDefaultTile } from "@/game/assets/load-default-tile";
import type { CharacterPackManager } from "@/game/manager/character-pack-manager";
import { loadCharacterPacks } from "./character-packs";

export async function loadAssets(
  k: KAPLAYCtx,
  characterPackManager: CharacterPackManager,
): Promise<void> {
  console.log("load Assets...");

  await loadDefaultTile(k);
  await loadCharacterPacks(k, characterPackManager);

  console.log("Loaded Assets!");
}
