import z from "zod";
import { CharacterDataSchema } from "./character-data.schema";
import { SpriteDataSchema } from "./sprite-data.schema";

export const CharacterPackSchema = z.preprocess(
  (v) => {
    if (typeof v === "string") {
      return JSON.parse(v);
    }

    return v;
  },
  z.object({
    name: z.string().min(1),
    author: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    version: z.string(),
    character: CharacterDataSchema,
    sprite: SpriteDataSchema,
  }),
);

export type CharacterPack = z.infer<typeof CharacterPackSchema>;
