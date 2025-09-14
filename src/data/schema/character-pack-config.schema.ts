import z from "zod";

export const emptyCharacterConfig: CharacterPackConfigJson = {
  enabled_packs: [],
};

export const defaultCharacterConfig: CharacterPackConfigJson = {
  enabled_packs: ["template"],
};

export const CharacterPackConfigJsonSchema = z.preprocess(
  (v) => {
    if (typeof v === "string") return JSON.parse(v);

    return v;
  },
  z.object({
    enabled_packs: z.string().array(),
  }),
);

export type CharacterPackConfigJson = z.infer<
  typeof CharacterPackConfigJsonSchema
>;
