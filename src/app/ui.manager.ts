import type { MainUIFactory } from "./ui.factory";

export class MainUIManager {
  constructor(private readonly uiFactory: MainUIFactory) {}

  async initTitleBar(): Promise<void> {
    const menus = document.getElementById("menu") as HTMLLIElement;

    const powerButton = await this.uiFactory.createPowerButton();
    const optionButton = await this.uiFactory.createPackManagementButton();

    menus.appendChild(powerButton);
    menus.appendChild(optionButton);
  }
}
