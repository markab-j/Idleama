import { documentDir, join, resourceDir } from "@tauri-apps/api/path";
import type { PackPathProvider } from "@/core/interfaces/pack-path-provider.interface";

export class ThemePackPathProvider implements PackPathProvider {
  async getDefaultPath() {
    const resourcePath = await resourceDir();
    const defaultThemePath = await join(resourcePath, "assets/themepacks");

    return defaultThemePath;
  }

  async getUserPath() {
    const docPath = await documentDir();
    const characterPackPath = await join(docPath, "Idleama", "themePacks");

    return characterPackPath;
  }
}
