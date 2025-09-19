import z from "zod";

export const SpriteDataSchema = z
  .object({
    width: z.number(),
    height: z.number(),
  })
  .default({
    width: 32,
    height: 48,
  });

export type SpriteData = z.infer<typeof SpriteDataSchema>;
