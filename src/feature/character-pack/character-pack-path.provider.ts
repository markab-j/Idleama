import type { PackPathProvider } from "@core/interfaces/pack-path-provider.interface";
import { documentDir, join, resourceDir } from "@tauri-apps/api/path";

export class CharacterPackPathProvider implements PackPathProvider {
  async getDefaultPath(): Promise<string> {
    const resourcePath = await resourceDir();
    const defaultCharacterPath = await join(
      resourcePath,
      "assets/characterpacks",
    );

    return defaultCharacterPath;
  }

  async getUserPath(): Promise<string> {
    const docPath = await documentDir();
    const characterPackPath = await join(docPath, "Idleama", "characterpacks");

    return characterPackPath;
  }
}
