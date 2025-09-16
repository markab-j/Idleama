import { documentDir, join, resourceDir } from "@tauri-apps/api/path";
import type { PathProvider } from "@/shared/interfaces/path-provider.interface";

export class ThemePackPathProvider implements PathProvider {
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
