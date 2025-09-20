import { parseToObjectIfString } from "@shared/utils/json";
import z from "zod";

export const LanguegeSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    common: z.object({
      save: z.string(),
      cancel: z.string(),
    }),
    packManagement: z.object({
      title: z.string(),
      characterPackTabTitle: z.string(),
      themePackTabTitle: z.string(),
    }),
    settings: z.object({
      title: z.string(),
      language: z.object({
        title: z.string(),
      }),
      windowLevel: z.object({
        title: z.string(),
        alwaysOnTop: z.string(),
        alwaysOnBack: z.string(),
      }),
    }),
  }),
);

export type Languege = z.infer<typeof LanguegeSchema>;
