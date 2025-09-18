import { parseToObjectIfString } from "@shared/utils/json";
import z from "zod";

export const CharacterPackConfigSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    enabled_packs: z.string().array(),
  }),
);

export type CharacterPackConfig = z.infer<typeof CharacterPackConfigSchema>;
