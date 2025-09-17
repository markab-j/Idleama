import z from "zod";
import { PackMetadataSchema } from "@/core/schema/pack-metadata.schema";
import { parseToObjectIfString } from "@/shared/utils/json";
import { ThemePackAssetSchema } from "./theme-pack-asset.schema";

export const ThemePackSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    meta: PackMetadataSchema,
    assets: ThemePackAssetSchema,
  }),
);

export type ThemePack = z.infer<typeof ThemePackSchema>;
