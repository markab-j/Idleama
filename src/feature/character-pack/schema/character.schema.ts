import z from "zod";

export const CharacterDataSchema = z.object({
  name: z.string().min(1),
});

export type CharacterData = z.infer<typeof CharacterDataSchema>;
