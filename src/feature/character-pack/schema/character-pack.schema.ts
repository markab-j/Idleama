import z from "zod";
import { parseToObjectIfString } from "@/core/utils/json";
import { PackMetadataSchema } from "@/shared/schema/pack-metadata.schema";
import { CharacterDataSchema } from "./character-data.schema";
import { SpriteDataSchema } from "./sprite-data.schema";

export const CharacterPackSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    meta: PackMetadataSchema,
    character: CharacterDataSchema,
    sprite: SpriteDataSchema,
  }),
);

export type CharacterPack = z.infer<typeof CharacterPackSchema>;
