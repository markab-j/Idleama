import { documentDir, join, resourceDir } from "@tauri-apps/api/path";
import { name } from "package.json";

export async function getDefaultChraterPackPath(): Promise<string> {
  const resourcePath = await resourceDir();
  const defaultCharacterPath = await join(
    resourcePath,
    "assets/default/characterpacks",
  );

  return defaultCharacterPath;
}

export async function getCharacterPackPath(): Promise<string> {
  const docPath = await documentDir();
  const characterPackPath = await join(docPath, name, "characterpacks");

  return characterPackPath;
}
