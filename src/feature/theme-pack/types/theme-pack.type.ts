import type { ThemePackMetadata } from "../schema/theme-pack-metadata.schema";

export type ThemePack = ThemePackMetadata & {
  borderSprite: string;
};
