import { parseToObjectIfString } from "@shared/utils/json";
import z from "zod";

export const SettingConfigSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    lang: z.string(),
    windowLevel: z.string(),
  }),
);

export type SettingConfig = z.infer<typeof SettingConfigSchema>;
