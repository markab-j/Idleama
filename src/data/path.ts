import { documentDir, join } from "@tauri-apps/api/path";
import { name } from "package.json";

export async function getCharacterPackPath(): Promise<string> {
  const docPath = await documentDir();
  const characterPackPath = await join(docPath, name, "characterpacks");

  return characterPackPath;
}
