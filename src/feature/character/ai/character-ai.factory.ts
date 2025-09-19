import type { KAPLAYCtx } from "kaplay";
import { CharacterAI } from "./character-ai";

export class CharacterAIFactory {
  private cache: CharacterAI | null;

  constructor(private readonly k: KAPLAYCtx) {
    this.cache = null;
  }

  create(): CharacterAI {
    if (this.cache) return this.cache;

    this.cache = new CharacterAI(this.k);

    return this.cache;
  }
}
