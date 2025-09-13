import type { KAPLAYCtx } from "kaplay";
import { loadDefaultTile } from "@/game/assets/load-default-tile";
import { loadCharacterPacks } from "./character-packs";

export async function loadAssets(k: KAPLAYCtx): Promise<void> {
  console.log("load Assets...");

  await loadDefaultTile(k);
  await loadCharacterPacks(k);

  console.log("Loaded Assets!");
}
