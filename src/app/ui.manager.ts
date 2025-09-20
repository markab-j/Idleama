import type { MainUIFactory } from "./ui.factory";

export class MainUIManager {
  constructor(private readonly uiFactory: MainUIFactory) {}

  async initTitleBar(): Promise<void> {
    const menus = document.getElementById("menu") as HTMLLIElement;

    const powerButton = await this.uiFactory.createPowerButton();
    const packManagementButton =
      await this.uiFactory.createPackManagementButton();
    const settingButton = await this.uiFactory.createSettingButton();

    menus.appendChild(powerButton);
    menus.appendChild(packManagementButton);
    menus.appendChild(settingButton);
  }
}
