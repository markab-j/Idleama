import { emitTo, listen, once } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { characterPackManager } from "@/game/manager/character-pack-manager";
import { EventManager } from "@/game/manager/event-manager";
import { WindowLabel } from "@/ui/windows/constants";
import {
  type PackEnableEvent,
  type PackInitPayload,
  PackManagementEvent,
} from "./event";

export async function createPackManagementWindow(): Promise<void> {
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
    const packs = characterPackManager.getAllState();

    await emitTo<PackInitPayload>(
      WindowLabel.packManagement,
      PackManagementEvent.INIT_WINDOW,
      {
        packs,
      },
    );
    console.log(
      `send data to ${WindowLabel.packManagement} Pack : `,
      packs.length,
    );
  });

  listen(PackManagementEvent.ENABLE_UPDATE, (e: PackEnableEvent) => {
    console.log("Event Recieved");
    EventManager.emit("packs:enable_update", e.payload);
  });

  packManagementWindow.listen("tauri://error", (e) => {
    console.error("창 생성 실패:", e);
  });
}
