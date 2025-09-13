import { emit } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { exit } from "@tauri-apps/plugin-process";
import { createMenuButton } from "./utils";
import { characterPackManager } from "@/game/manager/character-pack-manager";

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
    const webView = new WebviewWindow("pack", {
      url: "pack.html",
      width: 400,
      height: 600,
      decorations: false,
    });

    webView.once("tauri://created", () => {
      console.log("pack.html 창 생성 완료");
        emit("packs:update", { packs: characterPackManager.getAll() });
    });

    webView.once("tauri://error", (e) => {
      console.error("창 생성 실패:", e);
    });
  });

  return btn;
}
