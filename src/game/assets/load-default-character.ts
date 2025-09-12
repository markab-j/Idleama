import type { KAPLAYCtx } from "kaplay";
import { getCharacterSpriteAtlasData } from "./utils";

export function loadDefaultCharacter(k: KAPLAYCtx): void {
  k.loadJSON(
    "character_pack_default",
    "src/game/assets/default/characterpacks/template/pack.json",
  );
  k.loadSpriteAtlas(
    "src/game/assets/default/characterpacks/template/sprite.png",
    getCharacterSpriteAtlasData("default"),
  );
}
