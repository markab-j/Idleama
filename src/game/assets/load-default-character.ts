import { resolveResource } from "@tauri-apps/api/path";
import type { KAPLAYCtx } from "kaplay";
import { getCharacterSpriteAtlasData } from "./utils";
import { convertFileSrc } from "@tauri-apps/api/core";

export async function loadDefaultCharacter(k: KAPLAYCtx): Promise<void> {
  try {
    const defaultPackJsonPath = await resolveResource(
      "assets/default/characterpacks/template/pack.json",
    );
    const defaultSpritePath = await resolveResource(
      "assets/default/characterpacks/template/sprite.png",
    );

    console.log("loadDefaultCharacter Pack Json", defaultPackJsonPath);
    console.log("loadDefaultCharacter Sprite", defaultSpritePath);

    k.loadJSON("character_pack_default", convertFileSrc(defaultPackJsonPath));

    k.loadSpriteAtlas(
      convertFileSrc(defaultSpritePath),
      getCharacterSpriteAtlasData("default"),
    );

    console.log("DefaultCharacter Loaded");
  } catch (e) {
    console.error(e);
  }
}
