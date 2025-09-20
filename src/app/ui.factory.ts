import type { WindowManager } from "@app/window/window-manager";
import { exit } from "@tauri-apps/plugin-process";
import { WindowLabel } from "./window/constants";

export class MainUIFactory {
  constructor(private readonly windowManager: WindowManager) {}

  async createPowerButton(): Promise<HTMLButtonElement> {
    const btn = this.createMenuButton("X");
    btn.classList.add("power-btn");

    btn.addEventListener("click", async () => {
      await exit(0);
    });

    return btn;
  }

  async createPackManagementButton(): Promise<HTMLButtonElement> {
    const btn = this.createMenuButton("PACK");

    btn.addEventListener(
      "click",
      async () => await this.windowManager.showWindow(WindowLabel.packManagement),
    );

    return btn;
  }

  async createSettingButton(): Promise<HTMLButtonElement> {
    const btn = this.createMenuButton("SETTING");

    btn.addEventListener(
      "click",
      async () => await this.windowManager.showWindow(WindowLabel.settings),
    );

    return btn;
  }

  private createMenuButton(text: string): HTMLButtonElement {
    const btn = document.createElement("button");

    btn.classList.add("menu-btn");
    btn.textContent = text;

    return btn;
  }
}
