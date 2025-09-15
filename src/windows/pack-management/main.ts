import { emitTo, once } from "@tauri-apps/api/event";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import type { CharacterPack } from "@/feature/character-pack/schema/character-pack.schema";
import { WindowLabel } from "../constants";
import {
  type PackInitEvent,
  type PackInitPayload,
  PackManagementEvent,
} from "./event";

document.addEventListener("DOMContentLoaded", () => {
  console.log(`${WindowLabel.packManagement} Dom Loaded`);

  const closeButton = document.getElementById(
    "close-button",
  ) as HTMLButtonElement;

  closeButton.addEventListener("click", async () => {
    const webviewWindow = getCurrentWebviewWindow();
    await webviewWindow.close();
  });

  once(PackManagementEvent.INIT_WINDOW, async (event: PackInitEvent) =>
    renderPacks(event.payload),
  );

  emitTo("main", PackManagementEvent.READY);
  console.log(`Send to ${WindowLabel.main} I'm Ready.`);
});

function renderPacks(payload: PackInitPayload): void {
  const { packs, enablePackNames } = payload;

  const container = document.getElementById(
    "packs-container",
  ) as HTMLDivElement;
  container.innerHTML = "";

  packs.forEach((pack) => {
    const enabled = enablePackNames.includes(pack.name);
    const packElement = createPackElement(pack, enabled);
    container.appendChild(packElement);
  });
}

function createPackElement(pack: CharacterPack, enabled: boolean): HTMLElement {
  const packName = pack.name;
  const elementId = `pack-check-${packName.replace(/\s+/g, "-")}`;

  const packItem = document.createElement("div");
  packItem.className = "pack-item";
  packItem.dataset.packName = packName;
  if (!enabled) {
    packItem.classList.add("disabled");
  }

  packItem.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox" id="${elementId}" class="pack-checkbox" ${enabled ? "checked" : ""}>
        <label for="${elementId}"></label>
      </div>
      <div class="pack-image"></div>
      <div class="pack-details">
        <strong class="pack-name">${pack.name}</strong>
        <span class="pack-description">${pack.description || "설명 없음"}</span>
        <span class="pack-author">제작자: ${pack.author || "알 수 없음"}</span>
      </div>
    `;

  const checkbox = packItem.querySelector(".pack-checkbox") as HTMLInputElement;
  checkbox.addEventListener("change", async () => {
    console.log("on Pack Toggle Change");
    await emitTo(WindowLabel.main, PackManagementEvent.ENABLE_UPDATE, {
      packName: packName,
      enabled: checkbox.checked,
    });
    packItem.classList.toggle("disabled", !checkbox.checked);
    console.log(
      `Send to ${WindowLabel.main}. ${PackManagementEvent.ENABLE_UPDATE}`,
    );
  });

  return packItem;
}
