import z from "zod";

export const BackgroundSpriteDataSchema = z
  .object({
    width: z.number(),
    height: z.number(),
  })
  .default({
    width: 16,
    height: 16,
  });

export type BackgroundSpriteData = z.infer<typeof BackgroundSpriteDataSchema>;
