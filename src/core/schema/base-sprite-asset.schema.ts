import z from "zod";
import { BaseAssetSchema } from "./base-asset.schema";

export const BaseSpriteAssetSchema = BaseAssetSchema.extend({
  columns: z.number(),
  rows: z.number(),
});
