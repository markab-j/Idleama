import { exists, mkdir } from "@tauri-apps/plugin-fs";
import { getCharacterPackPath } from "./path";

export async function initPath() {
  const characterPackPath = await getCharacterPackPath();
  const characterPackExists = await exists(characterPackPath);

  if (!characterPackExists) {
    await mkdir(characterPackPath, { recursive: true });
  }
}
