import z from "zod";
import { parseToObjectIfString } from "@/core/utils/json";
import { BackgroundSpriteDataSchema } from "./background-sprite-data.schema";
import { PackMetadataSchema } from "@/shared/schema/pack-metadata.schema";

export const ThemePackSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    meta: PackMetadataSchema,
    sprite: BackgroundSpriteDataSchema,
  }),
);

export type ThemePack = z.infer<typeof ThemePackSchema>;
