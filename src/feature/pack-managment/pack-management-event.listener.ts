import type { Initializable } from "@core/interfaces/initializable.interface";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import { EventManager } from "@/game/manager/event-manager";
import {
  type CharacterPackEnableEvent,
  PackManagementEvent,
  type ThemePackChangeEvent,
} from "@/windows/pack-management/event";
import { ThemePackEvent, ThemePackEventBus } from "../theme-pack/events";

export class PackManagementEventListener implements Initializable {
  private unListenFns: UnlistenFn[];

  constructor() {
    this.unListenFns = [];
  }

  async init(): Promise<void> {
    const unlistenFns = await Promise.all([
      listen(
        PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE,
        this.onCharacterPackEnableChange,
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

  private onCharacterPackEnableChange = (e: CharacterPackEnableEvent) => {
    EventManager.emit(
      PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE,
      e.payload,
    );
  };

  private onThemePackChange = (e: ThemePackChangeEvent) => {
    ThemePackEventBus.emit(ThemePackEvent.CHANGE, e.payload);
  };
}
