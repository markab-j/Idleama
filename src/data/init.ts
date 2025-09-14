import { appConfigDir } from "@tauri-apps/api/path";
import { exists, mkdir } from "@tauri-apps/plugin-fs";
import { getCharacterPackPath } from "./path";

export async function initPath() {
  const characterPackPath = await getCharacterPackPath();
  const characterPackExists = await exists(characterPackPath);

  if (!characterPackExists) {
    await mkdir(characterPackPath, { recursive: true });
  }

  const appConfigPath = await appConfigDir();
  const appConfigExists = await exists(appConfigPath);

  if (!appConfigExists) {
    await mkdir(appConfigPath, { recursive: true });
  }
}
