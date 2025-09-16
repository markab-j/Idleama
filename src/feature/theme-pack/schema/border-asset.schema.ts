import z from "zod";
import { BaseAssetSchema } from "@/shared/schema/base-asset.schema";

export const BorderAssetSchema = BaseAssetSchema.extend({
  width: z.number().positive(),
  height: z.number().positive(),
});

export type BorderAsset = z.infer<typeof BorderAssetSchema>;
