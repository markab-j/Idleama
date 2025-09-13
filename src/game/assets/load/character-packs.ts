import type { KAPLAYCtx } from "kaplay";
import { getCharacterPackData } from "@/data/character-pack";
import { getCharacterPackPath, getDefaultChraterPackPath } from "@/data/path";
import { getCharacterSpriteAtlasData } from "@/game/assets/utils";
import { characterPackManager } from "@/game/manager/character-pack-manager";

export async function loadCharacterPacks(k: KAPLAYCtx): Promise<void> {
  console.log("load Character Packs...");

  const defaultCharacterPackPath = await getDefaultChraterPackPath();
  const externalCharacterPackPath = await getCharacterPackPath();

  await Promise.all([
    loadPacks(k, defaultCharacterPackPath),
    loadPacks(k, externalCharacterPackPath),
  ]);

  console.log(
    "Loaded Character Pack! Count: ",
    characterPackManager.loadedPackCount(),
  );
}

async function loadPacks(k: KAPLAYCtx, packPath: string): Promise<void> {
  const characterPacks = await getCharacterPackData(packPath);

  for (const pack of characterPacks) {
    console.log("Pack Load: ", pack);

    k.loadSpriteAtlas(
      pack.spritePath,
      getCharacterSpriteAtlasData(pack.pack.packName),
    );

    characterPackManager.add(pack);
  }
}
