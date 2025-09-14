import type { KAPLAYCtx } from "kaplay";
import { CharacterPackManager } from "../manager/character-pack-manager";
import { loadDefaultTile } from "./load-default-tile";
import { loadCharacterPacks } from "./load/character-packs";

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