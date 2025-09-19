import { PackMetadataSchema } from "@core/schema/pack-metadata.schema";
import { parseToObjectIfString } from "@shared/utils/json";
import z from "zod";
import { CharacterPackAssetSchema } from "./character-pack-asset.schema";

export const CharacterPackSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    meta: PackMetadataSchema,
    assets: CharacterPackAssetSchema,
  }),
);

export type CharacterPack = z.infer<typeof CharacterPackSchema>;
