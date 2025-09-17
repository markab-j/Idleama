import z from "zod";
import { parseToObjectIfString } from "@/shared/utils/json";

export const CharacterPackConfigSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    enabled_packs: z.string().array(),
  }),
);

export type CharacterPackConfig = z.infer<typeof CharacterPackConfigSchema>;
