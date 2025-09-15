import z from "zod";
import { parseToObjectIfString } from "@/core/utils/json";
import { BackgroundSpriteDataSchema } from "./background-sprite-data.schema";

export const ThemePackSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    name: z.string().min(1),
    author: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    version: z.string().min(1),
    sprite: BackgroundSpriteDataSchema,
  }),
);

export type ThemePack = z.infer<typeof ThemePackSchema>;
