import z from "zod";
import { parseToObjectIfString } from "@/core/utils/json";
import { CharacterDataSchema } from "./character-data.schema";
import { SpriteDataSchema } from "./sprite-data.schema";

export const CharacterPackSchema = z.preprocess(
  parseToObjectIfString,
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
