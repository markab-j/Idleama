import type { Initializable } from "@core/interfaces/initializable.interface";
import type { CharacterPackManager } from "@feature/character-pack/character-pack.manager";
import { ThemePackEvent, ThemePackEventBus } from "@feature/theme-pack/events";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import type { CharacterManager } from "../character/character-manager";
import {
  type CharacterPackChangeEvent,
  PackManagementEvent,
  type ThemePackChangeEvent,
} from "./events";

export class PackManagementEventListener implements Initializable {
  private unListenFns: UnlistenFn[];

  constructor(
    private readonly characterPackManager: CharacterPackManager,
    private readonly characterManager: CharacterManager,
  ) {
    this.unListenFns = [];
  }

  async init(): Promise<void> {
    const unlistenFns = await Promise.all([
      listen(
        PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE,
        this.onCharacterPackChange,
      ),
      listen(PackManagementEvent.THEME_PACK_CHANGE, this.onThemePackChange),
    ]);

    this.unListenFns = unlistenFns;
  }

  destroy(): void {
    for (const unlistenFn of this.unListenFns) {
      unlistenFn();
    }
  }

  private onCharacterPackChange = (e: CharacterPackChangeEvent) => {
    const { payload } = e;
    this.characterPackManager.updatePack(payload.packName, payload.enabled);
    this.characterManager.updateCharacter(payload.packName, payload.enabled);
  };

  private onThemePackChange = (e: ThemePackChangeEvent) => {
    ThemePackEventBus.emit(ThemePackEvent.CHANGE, e.payload);
  };
}
