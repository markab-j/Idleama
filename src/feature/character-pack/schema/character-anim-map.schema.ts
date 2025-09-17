import z from "zod";
import { CharacterAnim } from "@/feature/character/enums/anim.enum";

const characterAnimKeySchema = z.enum(CharacterAnim);
const characterAnimSchema = z.object({
  frameCount: z.number().positive(),
});

export const CharacterAnimMapSchema = z.record(
  characterAnimKeySchema,
  characterAnimSchema,
);

export type CharacterAnimMap = z.infer<typeof CharacterAnimMapSchema>;
