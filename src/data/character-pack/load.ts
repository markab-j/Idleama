import { convertFileSrc } from "@tauri-apps/api/core";
import { join } from "@tauri-apps/api/path";
import { exists, readDir, readTextFile } from "@tauri-apps/plugin-fs";
import z from "zod";
import { CharacterPackJsonSchema } from "@/data/schema/character-pack-json.schema";
import type { CharacterPackData } from "@/types/character-pack";

export async function loadCharacterPackData(
  packPath: string,
): Promise<CharacterPackData[]> {
  console.log("base packPath: ", packPath);

  const packFolders = await readDir(packPath);

  const loadedPacks: CharacterPackData[] = [];

  for (const folder of packFolders) {
    if (!folder.isDirectory || folder.name.startsWith(".")) continue;

    const packJsonPath = await join(packPath, folder.name, "pack.json");
    const spritePath = await join(packPath, folder.name, "sprite.png");

    const packJsonExists = await exists(packJsonPath);
    const spriteExists = await exists(spritePath);

    if (packJsonExists && spriteExists) {
      const jsonContent = await readTextFile(packJsonPath);
      const result = CharacterPackJsonSchema.safeParse(jsonContent);

      if (!result.success) {
        console.warn(z.prettifyError(result.error));
        continue;
      }

      const characterPackJson = result.data;

      loadedPacks.push({
        ...characterPackJson,
        spritePath: convertFileSrc(spritePath),
      });
    }
  }

  return loadedPacks;
}
