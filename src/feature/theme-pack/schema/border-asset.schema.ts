import { BaseAssetSchema } from "@core/schema/base-asset.schema";
import z from "zod";

export const BorderAssetSchema = BaseAssetSchema.extend({
  width: z.number().positive(),
  height: z.number().positive(),
});

export type BorderAsset = z.infer<typeof BorderAssetSchema>;
