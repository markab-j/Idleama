import z from "zod";

export const CharacterSchema = z.object({
  name: z.string().min(1),
});

export type Character = z.infer<typeof CharacterSchema>;
