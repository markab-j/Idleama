import type { ThemePack } from "@/feature/theme-pack/schema/theme-pack.schema";

export interface ThemePackLoader {
  load(packPath: string): Promise<ThemePack[]>;
  loadDefaultPack(): Promise<ThemePack[]>;
  loadExternalPack(): Promise<ThemePack[]>;
}
