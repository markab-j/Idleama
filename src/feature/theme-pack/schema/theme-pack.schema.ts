import z from "zod";
import { parseToObjectIfString } from "@/core/utils/json";
import { PackMetadataSchema } from "@/shared/schema/pack-metadata.schema";
import { ThemePackAssetSchema } from "./theme-pack-asset-data.schema";

export const ThemePackSchema = z.preprocess(
  parseToObjectIfString,
  z.object({
    meta: PackMetadataSchema,
    assets: ThemePackAssetSchema,
  }),
);

export type ThemePack = z.infer<typeof ThemePackSchema>;
