import type { CharacterPackConfig } from "@/data/config/character-pack-config";
import type {
  CharacterPackData,
  CharacterPackState,
} from "@/types/character-pack";
import { createLogger } from "@/utils/logger";
import { EventManager } from "./event-manager";

export class CharacterPackManager {
  private readonly logger = createLogger(CharacterPackManager.name);
  private readonly characterPacks: CharacterPackState[];

  constructor(private readonly config: CharacterPackConfig) {
    this.characterPacks = [];
    this.initializeListener();
  }

  getAllState(): CharacterPackState[] {
    return [...this.characterPacks];
  }

  getAllEnabled(): CharacterPackData[] {
    return [...this.characterPacks.filter((pack) => pack.enabled)];
  }

  add(characterPack: CharacterPackData): void {
    this.logger.log("add", characterPack);

    const enabled = this.config
      .get("enabled_packs")
      .includes(characterPack.name);

    this.characterPacks.push({ ...characterPack, enabled });
    this.characterPacks.sort();

    this.logger.log("add success");
  }

  initializeListener() {
    EventManager.on(
      "packs:enable_update",
      async (e) => await this.updateState(e.packName, e.enabled),
    );
  }

  async updateState(packName: string, enabled: boolean): Promise<void> {
    this.logger.log("update State");
    const pack = this.characterPacks.find((pack) => pack.name === packName);

    if (pack) {
      pack.enabled = enabled;
    }

    if (enabled)
      await this.config.set(
        "enabled_packs",
        [...this.config.get("enabled_packs"), packName],
        true,
      );
    else {
      await this.config.set(
        "enabled_packs",
        [...this.config.get('enabled_packs').filter((v) => v !== packName)],
        true,
      )
    }
  }

  loadedPackCount(): number {
    return this.characterPacks.length;
  }
}
