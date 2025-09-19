import {
  EightAxisAnimKey,
  FourAxisAnimKey,
  IdleOnlyAnimKey,
} from "@feature/character/enums/character-anim-key.enum";
import z from "zod";

const CharacterAnimSchema = z.object({
  frameCount: z.number().positive(),
  speed: z.number().optional().default(5),
});

export const StaticSpriteAnimSchema = z.never().optional();
export const IdleOnlyAnimSchema = z.record(
  z.enum(IdleOnlyAnimKey),
  CharacterAnimSchema,
);
export const FourAxisAnimSchema = z.record(
  z.enum(FourAxisAnimKey),
  CharacterAnimSchema,
);
export const EightAxisAnimSchema = z.record(
  z.enum(EightAxisAnimKey),
  CharacterAnimSchema,
);

export type IdleOnlyAnims = z.infer<typeof IdleOnlyAnimSchema>;
export type FourAxisAnims = z.infer<typeof FourAxisAnimSchema>;
export type EightAxisAnims = z.infer<typeof EightAxisAnimSchema>;
