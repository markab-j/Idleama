import z from "zod";

export const BaseAssetSchema = z.object({
  src: z.string(),
});
