import type { KAPLAYCtx } from "kaplay";
import { loadCharacterPackData } from "@/data/character-pack/load";
import { getCharacterPackPath, getDefaultChraterPackPath } from "@/data/path";
import { getCharacterSpriteAtlasData } from "@/game/assets/utils";
import type { CharacterPackManager } from "@/game/manager/character-pack-manager";

export async function loadCharacterPacks(
  k: KAPLAYCtx,
  characterPackManager: CharacterPackManager,
): Promise<void> {
  console.log("load Character Packs...");

  const defaultCharacterPackPath = await getDefaultChraterPackPath();
  const externalCharacterPackPath = await getCharacterPackPath();

  await Promise.all([
    loadPacks(k, characterPackManager, defaultCharacterPackPath),
    loadPacks(k, characterPackManager, externalCharacterPackPath),
  ]);

  console.log(
    "Loaded Character Pack! Count: ",
    characterPackManager.loadedPackCount(),
  );
}

async function loadPacks(
  k: KAPLAYCtx,
  characterPackManager: CharacterPackManager,
  packPath: string,
): Promise<void> {
  const characterPacks = await loadCharacterPackData(packPath);

  for (const pack of characterPacks) {
    console.log("Pack Load: ", pack);

    k.loadSpriteAtlas(pack.spritePath, getCharacterSpriteAtlasData(pack));

    characterPackManager.add(pack);
  }
}
