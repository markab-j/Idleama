import z from "zod";

export const CharacterPackConfigSchema = z.preprocess(
  (v) => {
    if (typeof v === "string") return JSON.parse(v);

    return v;
  },
  z.object({
    enabled_packs: z.string().array(),
  }),
);

export type CharacterPackConfig = z.infer<typeof CharacterPackConfigSchema>;
