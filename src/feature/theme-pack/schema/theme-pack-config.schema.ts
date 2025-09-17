import z from "zod";
import { parseToObjectIfString } from "@/shared/utils/json";

export const ThemePackConfigSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    current: z.string(),
  }),
);

export type ThemePackConfig = z.infer<typeof ThemePackConfigSchema>;
