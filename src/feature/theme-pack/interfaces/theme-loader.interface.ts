import type { ThemePack } from "../schema/theme.schema";

export interface ThemeLoader {
  load(packPath: string): Promise<ThemePack[]>;
}
