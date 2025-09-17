import z from "zod";
import { parseToObjectIfString } from "@/core/utils/json";
import { PackMetadataSchema } from "@/shared/schema/pack-metadata.schema";
import { CharacterPackAssetSchema } from "./character-pack-asset.schema";

export const CharacterPackSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    meta: PackMetadataSchema,
    assets: CharacterPackAssetSchema,
  }),
);

export type CharacterPack = z.infer<typeof CharacterPackSchema>;
