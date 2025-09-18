import { BaseAssetSchema } from "@core/schema/base-asset.schema";
import z from "zod";

export const CharacterSpriteAssetSchema = BaseAssetSchema.extend({
  columns: z.number().positive(),
  rows: z.number().positive(),
});

export type CharacterSpriteAsset = z.infer<typeof CharacterSpriteAssetSchema>;
