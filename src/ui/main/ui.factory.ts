import { convertFileSrc } from "@tauri-apps/api/core";
import { resolveResource } from "@tauri-apps/api/path";
import { exit } from "@tauri-apps/plugin-process";
import type { WindowManager } from "@/windows/window-manager";

export class MainUIFactory {
  constructor(private readonly windowManager: WindowManager) {}

  async createPowerButton(): Promise<HTMLButtonElement> {
    const btn = await this.createMenuButton("Power");

    btn.addEventListener("click", async () => {
      await exit(0);
    });

    return btn;
  }

  async createPackManagementButton(): Promise<HTMLButtonElement> {
    const btn = await this.createMenuButton("Gear");

    btn.addEventListener(
      "click",
      async () => await this.windowManager.packManagementWindow(),
    );

    return btn;
  }

  private async createMenuButton(iconName: string): Promise<HTMLButtonElement> {
    const iconResourcePath = await resolveResource(`assets/ui/${iconName}.png`);
    const imgSrc = convertFileSrc(iconResourcePath);

    const btn = document.createElement("button");

    btn.classList.add("menu-btn");

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = iconName;

    btn.appendChild(img);

    return btn;
  }
}
