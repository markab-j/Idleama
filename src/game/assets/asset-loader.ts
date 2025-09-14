import type { KAPLAYCtx } from "kaplay";
import type { CharacterPackManager } from "../manager/character-pack-manager";
import { loadCharacterPacks } from "./load/character-packs";
import { loadDefaultTile } from "./load-default-tile";

export class AssetLoader {
  constructor(
    private readonly k: KAPLAYCtx,
    private readonly characterPackManager: CharacterPackManager,
  ) {}

  async load(): Promise<void> {
    await loadDefaultTile(this.k);
    await loadCharacterPacks(this.k, this.characterPackManager);
  }
}
