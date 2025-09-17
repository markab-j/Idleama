import z from "zod";
import { BaseAssetSchema } from "@/core/schema/base-asset.schema";

export const BackgroundAssetSchema = BaseAssetSchema.extend({
  tile: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  columns: z.number().positive(),
  rows: z.number().positive(),
});

export type BackgroundAsset = z.infer<typeof BackgroundAssetSchema>;
