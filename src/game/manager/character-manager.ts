import type { KAPLAYCtx } from "kaplay";
import type { CharacterPackManager } from "@/feature/character-pack/character-pack.manager";
import type { Character } from "@/game/character/character";
import { CharacterFactory } from "../character/character.factory";
import { EventManager } from "./event-manager";

export class CharacterManager {
  private readonly factory: CharacterFactory;

  private readonly characterMap: Map<string, Character>;

  constructor(
    private readonly k: KAPLAYCtx,
    private readonly packManager: CharacterPackManager,
  ) {
    console.log("CharacterManager init...");
    this.characterMap = new Map();
    this.factory = new CharacterFactory(this.k);
    this.initializedListener();
    console.log("CharacterManager initialized");
  }

  public createEnabledCharacters() {
    this.packManager.getEnablePackNames().forEach((packName) => {
      const character = this.factory.create(packName, this.center);
      this.characterMap.set(packName, character);
    });
  }

  private initializedListener() {
    EventManager.on("packs:enable_update", (e) => {
      if (e.enabled) {
        if (this.characterMap.has(e.packName)) return;

        const character = this.factory.create(e.packName, this.center);
        this.characterMap.set(e.packName, character);
      } else {
        const character = this.characterMap.get(e.packName);
        this.characterMap.delete(e.packName);
        character?.gameObj.destroy();
      }
    });
    console.log("Pack Enable Update Event Register");
  }

  private get center() {
    return this.k.center().toFixed(0);
  }
}
