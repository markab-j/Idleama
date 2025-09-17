import z from "zod";
import { CharacterSchema } from "./character.schema";
import { CharacterAnimMapSchema } from "./character-anim-map.schema";
import { CharacterSpriteAssetSchema } from "./character-sprite-asset.schema";

export const CharacterPackAssetSchema = z.object({
  character: CharacterSchema,
  sprite: CharacterSpriteAssetSchema,
  anims: CharacterAnimMapSchema,
});

export type CharacterPackAsset = z.infer<typeof CharacterPackAssetSchema>;
