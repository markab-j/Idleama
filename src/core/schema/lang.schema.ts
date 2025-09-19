import { parseToObjectIfString } from "@shared/utils/json";
import z from "zod";

export const LanguegeSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    "pack-managment-title": z.string(),
    "character-pack-tab-title": z.string(),
    "theme-pack-tab-title": z.string(),
  }),
);

export type Languege = z.infer<typeof LanguegeSchema>;
