import type { KAPLAYCtx } from "kaplay";
import { getCharacterPackData } from "@/data/character-pack";
import { getCharacterSpriteAtlasData } from "@/game/assets/utils";

export async function loadCharacterPacks(k: KAPLAYCtx): Promise<void> {
  const characterPacks = await getCharacterPackData();

  console.log("Loaded CharacterPacks: ", characterPacks);

  for (const pack of characterPacks) {
    await k.loadSpriteAtlas(
      pack.spritePath,
      getCharacterSpriteAtlasData(pack.pack.packName),
    );
  }
}
