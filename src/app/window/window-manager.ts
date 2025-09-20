import type { CharacterPackManager } from "@feature/character-pack/character-pack.manager";
import {
  PackManagementEvent,
  type PackManagementWindowDomLoadedContext,
} from "@feature/pack-managment/events";
import type { ThemePackManager } from "@feature/theme-pack/theme-pack.manager";
import { createLogger } from "@shared/utils/logger";
import { emitTo, once } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import {
  currentMonitor,
  getCurrentWindow,
  PhysicalSize,
} from "@tauri-apps/api/window";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import { WindowLabel } from "./constants";
import type { AppWindowContext } from "./types";

export class WindowManager {
  private static readonly logger = createLogger(WindowManager.name);
  private currentWebViewWindow: WebviewWindow | null;

  constructor(
    private readonly characterPackManager: CharacterPackManager,
    private readonly themePackManager: ThemePackManager,
  ) {
    this.currentWebViewWindow = null;
  }

  static async initMainWindow(): Promise<AppWindowContext> {
    const monitor = await currentMonitor();

    if (monitor === null) {
      throw new Error("Display Not Detected");
    }

    WindowManager.logger.log("monitor Size: ", {
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

    if (!(await currentWindow.isVisible())) {
      await currentWindow.show();
    }

    return {
      size: new PhysicalSize(width, height),
      scaleFactor: monitor.scaleFactor,
    };
  }

  async showWindow(windowLabel: WindowLabel) {
  if (this.currentWebViewWindow?.label === windowLabel) {
    await this.currentWebViewWindow.close();
    this.currentWebViewWindow = null;
    return;
  }

  if (this.currentWebViewWindow) {
    await this.currentWebViewWindow.close();
    this.currentWebViewWindow = null;
  }

  switch (windowLabel) {
    case WindowLabel.packManagement:
      this.currentWebViewWindow = await this.packManagementWindow();
      break;
    case WindowLabel.settings:
      this.currentWebViewWindow = await this.settingWindow();
      break;
  }
}

  private async packManagementWindow(): Promise<WebviewWindow> {
    const packManagementWindow = new WebviewWindow(WindowLabel.packManagement, {
      url: "packs.html",
      width: 400,
      height: 600,
      devtools: true,
      transparent: true,
      decorations: false,
      shadow: false,
      alwaysOnTop: true,
      resizable: false,
    });

    packManagementWindow.once("tauri://window-created", async () => {
      await packManagementWindow.center();
    });

    once(PackManagementEvent.READY, async () => {
      WindowManager.logger.log(`${WindowLabel.packManagement} is Ready.`);
      const packs = this.characterPackManager.getAll();
      const enablePackNames = this.characterPackManager
        .getEnablePacks()
        .map((pack) => pack.meta.name);

      const themePacks = this.themePackManager.getAll();
      const currentThemePack = this.themePackManager.getCurrentPack();

      await emitTo<PackManagementWindowDomLoadedContext>(
        WindowLabel.packManagement,
        PackManagementEvent.WINDOW_DOM_LOADED,
        {
          packs,
          enablePackNames,
          themePacks,
          currentThemePack,
        },
      );
      WindowManager.logger.log(
        `send data to ${WindowLabel.packManagement} Pack : `,
        packs.length,
      );
    });

    return packManagementWindow;
  }

  private async settingWindow(): Promise<WebviewWindow> {
    const settingWindow = new WebviewWindow(WindowLabel.settings, {
      url: "settings.html",
      width: 400,
      height: 600,
      devtools: true,
      transparent: true,
      decorations: false,
      shadow: false,
      alwaysOnTop: true,
      resizable: false,
    });

    settingWindow.once("tauri://window-created", async () => {
      if (settingWindow) await settingWindow.center();
    });

    return settingWindow;
  }
}
