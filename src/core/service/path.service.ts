import { appConfigDir } from "@tauri-apps/api/path";
import { exists, mkdir } from "@tauri-apps/plugin-fs";
import type { CharacterPackPathProvider } from "@/feature/character-pack/character-pack-path.provider";
import type { ThemePackPathProvider } from "@/feature/theme-pack/theme-pack-path.provider";

export class PathService {
  constructor(
    private readonly characterPackPathProvider: CharacterPackPathProvider,
    private readonly themePackPathProvider: ThemePackPathProvider,
  ) {}

  async initAppPath() {
    const characterPackPath =
      await this.characterPackPathProvider.getUserPath();
    const characterPackExists = await exists(characterPackPath);

    if (!characterPackExists) {
      await mkdir(characterPackPath, { recursive: true });
    }

    const themePackPathPath = await this.themePackPathProvider.getUserPath();
    const themePackExists = await exists(themePackPathPath);

    if (!themePackExists) {
      await mkdir(themePackPathPath, { recursive: true });
    }

    const appConfigPath = await appConfigDir();
    const appConfigExists = await exists(appConfigPath);

    if (!appConfigExists) {
      await mkdir(appConfigPath, { recursive: true });
    }
  }
}
