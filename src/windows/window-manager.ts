import { emitTo, listen, once } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import {
  currentMonitor,
  getCurrentWindow,
  PhysicalSize,
} from "@tauri-apps/api/window";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import type { CharacterPackManager } from "@/feature/character-pack/character-pack.manager";
import type { ThemePackManager } from "@/feature/theme-pack/theme.manager";
import { EventManager } from "@/game/manager/event-manager";
import { WindowLabel } from "./constants";
import {
  type PackEnableEvent,
  PackManagementEvent,
  type PackManagementInitPayload,
} from "./pack-management/event";
import type { AppWindowContext } from "./types";

export class WindowManager {
  constructor(
    private readonly characterPackManager: CharacterPackManager,
    private readonly themePackManager: ThemePackManager,
  ) {}

  static async initMainWindow(): Promise<AppWindowContext> {
    const monitor = await currentMonitor();

    if (monitor === null) {
      throw new Error("Display Not Detected");
    }

    console.log("monitor Size: ", {
      size: monitor.size,
      factor: monitor.scaleFactor,
    });

    const monitorSize = monitor.size;

    const currentWindow = getCurrentWindow();

    const scaledHeight = Math.floor(monitor.size.height / 4);

    const newWindowSize = new PhysicalSize(monitorSize.width, scaledHeight);

    await currentWindow.setSize(newWindowSize);

    await moveWindow(Position.BottomCenter);
    // const { workArea } = monitor;
    // const newX = workArea.position.x + (workArea.size.width - newWindowSize.width) / 2;
    // const newY = workArea.position.y + workArea.size.height - newWindowSize.height;

    // await currentWindow.setPosition(new PhysicalPosition(newX, newY));

    const { width, height } = await currentWindow.innerSize();

    await currentWindow.setResizable(false);

    if (!await currentWindow.isVisible()) {
      await currentWindow.show();
    }

    return {
      size: new PhysicalSize(width, height),
      scaleFactor: monitor.scaleFactor,
    };
  }

  async packManagementWindow(): Promise<void> {
    let packManagementWindow = await WebviewWindow.getByLabel(
      WindowLabel.packManagement,
    );

    console.log("createPackManagementWindow", packManagementWindow);

    if (packManagementWindow) {
      packManagementWindow.setFocus();
      return;
    }

    packManagementWindow = new WebviewWindow(WindowLabel.packManagement, {
      url: "packs.html",
      width: 400,
      height: 600,
      devtools: true,
      transparent: true,
      decorations: false,
      shadow: false,
    });

    packManagementWindow.once("tauri://window-created", async () => {
      await packManagementWindow.center();
    });

    once(PackManagementEvent.READY, async () => {
      console.log(`${WindowLabel.packManagement} is Ready.`);
      const packs = this.characterPackManager.getAll();
      const enablePackNames = this.characterPackManager.getEnablePackNames();

      const themePacks = this.themePackManager.getAll();
      const currentThemePack = this.themePackManager.getCurrentPack();

      await emitTo<PackManagementInitPayload>(
        WindowLabel.packManagement,
        PackManagementEvent.INIT_WINDOW,
        {
          packs,
          enablePackNames,
          themePacks,
          currentThemePack,
        },
      );
      console.log(
        `send data to ${WindowLabel.packManagement} Pack : `,
        packs.length,
      );
    });

    listen(
      PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE,
      (e: PackEnableEvent) => {
        EventManager.emit(
          PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE,
          e.payload,
        );
      },
    );

    packManagementWindow.listen("tauri://error", (e) => {
      console.error("창 생성 실패:", e);
    });
  }
}
