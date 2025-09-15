import type { ThemePack } from "../types/theme-pack.type";

export interface ThemeLoader {
  load(packPath: string): Promise<ThemePack[]>;
}
