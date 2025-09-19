import z from "zod";
import { CharacterDataSchema } from "./character.schema";
import { CharacterSpriteAssetSchema } from "./character-sprite-asset.schema";

export const CharacterPackAssetSchema = z.object({
  character: CharacterDataSchema,
  sprite: CharacterSpriteAssetSchema,
});

export type CharacterPackAsset = z.infer<typeof CharacterPackAssetSchema>;
