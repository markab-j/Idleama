import z from "zod";
import { BaseAssetSchema } from "@/core/schema/base-asset.schema";

export const CharacterSpriteAssetSchema = BaseAssetSchema.extend({
  columns: z.number().positive(),
  rows: z.number().positive(),
});

export type CharacterSpriteAsset = z.infer<typeof CharacterSpriteAssetSchema>;
