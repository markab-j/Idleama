import type { KAPLAYCtx } from "kaplay";
import { loadDefaultCharacter } from "@/game/assets/load-default-character";
import { loadDefaultTile } from "@/game/assets/load-default-tile";
import { loadCharacterPacks } from "./character-packs";

export async function loadAssets(k: KAPLAYCtx): Promise<void> {
  await loadDefaultCharacter(k);
  await loadDefaultTile(k);
  await loadCharacterPacks(k);
}
