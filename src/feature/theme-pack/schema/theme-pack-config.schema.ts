import { parseToObjectIfString } from "@shared/utils/json";
import z from "zod";

export const ThemePackConfigSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    current: z.string(),
  }),
);

export type ThemePackConfig = z.infer<typeof ThemePackConfigSchema>;
