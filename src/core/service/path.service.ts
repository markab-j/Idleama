import { appConfigDir } from "@tauri-apps/api/path";
import { exists, mkdir } from "@tauri-apps/plugin-fs";
import type { CharacterPackPathProvider } from "@/feature/character-pack/character-pack-path.provider";

export class PathService {
  constructor(
    private readonly characterPackPathProvider: CharacterPackPathProvider,
  ) {}

  async initAppPath() {
    const characterPackPath =
      await this.characterPackPathProvider.getUserPath();
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
}
