import z from "zod";
import { parseToObjectIfString } from "@/core/utils/json";
import { PackMetadataSchema } from "@/shared/schema/pack-metadata.schema";
import { BackgroundSpriteDataSchema } from "./background-sprite-data.schema";

export const ThemePackSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    meta: PackMetadataSchema,
    sprite: BackgroundSpriteDataSchema,
  }),
);

export type ThemePack = z.infer<typeof ThemePackSchema>;
