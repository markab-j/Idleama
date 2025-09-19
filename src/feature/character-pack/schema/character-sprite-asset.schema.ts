import { CharacterSpriteType } from "@core/enum/character-sprite-type.enum";
import { BaseSpriteAssetSchema } from "@core/schema/base-sprite-asset.schema";
import z from "zod";
import {
  EightAxisAnimSchema,
  FourAxisAnimSchema,
  IdleOnlyAnimSchema,
} from "./character-anim.schema";

export const StaticSpriteAssetSchema = BaseSpriteAssetSchema.extend({
  type: z.literal(CharacterSpriteType.STATIC),
  anims: z.undefined(),
});

const IdleOnlySpriteAssetSchema = BaseSpriteAssetSchema.extend({
  type: z.literal(CharacterSpriteType.IDLE_ONLY),
  anims: IdleOnlyAnimSchema,
});

const FourAxisSprtieAssetSchema = BaseSpriteAssetSchema.extend({
  type: z.literal(CharacterSpriteType.FOUR_AXIS),
  anims: FourAxisAnimSchema,
});

const EightAxisSpriteAssetSchema = BaseSpriteAssetSchema.extend({
  type: z.literal(CharacterSpriteType.EIGHT_AXIS),
  anims: EightAxisAnimSchema,
});

export const CharacterSpriteAssetSchema = z.discriminatedUnion("type", [
  StaticSpriteAssetSchema,
  IdleOnlySpriteAssetSchema,
  FourAxisSprtieAssetSchema,
  EightAxisSpriteAssetSchema,
]);

export type CharacterSpriteAsset = z.infer<typeof CharacterSpriteAssetSchema>;
