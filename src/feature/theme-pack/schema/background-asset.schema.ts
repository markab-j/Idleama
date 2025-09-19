import { BaseSpriteAssetSchema } from "@core/schema/base-sprite-asset.schema";
import z from "zod";

export const BackgroundAssetSchema = BaseSpriteAssetSchema.extend({
  tile: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  variations: z.number().positive(),
});

export type BackgroundAsset = z.infer<typeof BackgroundAssetSchema>;
