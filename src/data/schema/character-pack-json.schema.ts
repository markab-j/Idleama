import z from "zod";
import { CharacterDataSchema } from "./character-data.schema";

export const CharacterPackJsonSchema = z.preprocess(
  (v) => {
    if (typeof v === "string") {
      return JSON.parse(v);
    }

    return v;
  },
  z.object({
    packName: z.string().min(1),
    version: z.string(),
    characterData: CharacterDataSchema,
  }),
);

export type CharacterPackJson = z.infer<typeof CharacterPackJsonSchema>;
