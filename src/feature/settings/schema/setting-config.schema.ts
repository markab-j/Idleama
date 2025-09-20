import { WindowLevel } from "@feature/settings/enum/window-level.enum";
import { parseToObjectIfString } from "@shared/utils/json";
import z from "zod";

export const SettingConfigSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    lang: z.string(),
    windowLevel: z.enum(WindowLevel),
  }),
);

export type SettingConfig = z.infer<typeof SettingConfigSchema>;
