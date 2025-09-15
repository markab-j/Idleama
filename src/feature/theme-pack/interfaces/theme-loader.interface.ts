import type { ThemePack } from "../schema/theme-pack.schema";

export interface ThemeLoader {
  load(packPath: string): Promise<ThemePack[]>;
}
