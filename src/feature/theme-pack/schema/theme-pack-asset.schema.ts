import z from "zod";
import { BackgroundAssetSchema } from "./background-asset.schema";
import { BorderAssetSchema } from "./border-asset.schema";

export const ThemePackAssetSchema = z.object({
  background: BackgroundAssetSchema,
  border: BorderAssetSchema,
});

export type ThemePackAsset = z.infer<typeof ThemePackAssetSchema>;
