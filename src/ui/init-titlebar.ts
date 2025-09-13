import { exit } from "@tauri-apps/plugin-process";
import { createMenuButton } from "./utils";
import { createPackManagementWindow } from "./windows/pack-management/window";

export async function initTitleBar(): Promise<void> {
  const menus = document.getElementById("menu");

  if (!menus) {
    console.error("Menu element not found");
    return;
  }

  const powerButton = await createPowerButton();
  const optionButton = await createOptionButton();

  menus.appendChild(powerButton);
  menus.appendChild(optionButton);
}

async function createPowerButton(): Promise<HTMLButtonElement> {
  const btn = await createMenuButton("Power");

  btn.addEventListener("click", async () => {
    await exit(0);
  });

  return btn;
}

async function createOptionButton(): Promise<HTMLButtonElement> {
  const btn = await createMenuButton("Gear");

  btn.addEventListener("click", async () => {
    await createPackManagementWindow();
  });

  return btn;
}
