import { emitTo, once } from "@tauri-apps/api/event";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import type { CharacterPack } from "@/feature/character-pack/schema/character-pack.schema";
import type { ThemePack } from "@/feature/theme-pack/schema/theme-pack.schema";
import { WindowLabel } from "../constants";
import { PackManagementEvent, type PackManagementInitEvent } from "./event";

type PackTab = "character" | "theme";

let allCharacterPacks: CharacterPack[] = [];
let enabledCharacterPackNames: Set<string> = new Set();
let allThemePacks: ReadonlyArray<Readonly<ThemePack>> = [];
let currentThemeName: string = "";

let activeTab: PackTab = "character";

document.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.getElementById(
    "close-button",
  ) as HTMLButtonElement;
  const characterTab = document.querySelector(
    "#pack-tab > div:nth-child(1)",
  ) as HTMLDivElement;
  const themeTab = document.querySelector(
    "#pack-tab > div:nth-child(2)",
  ) as HTMLDivElement;

  closeButton.addEventListener("click", async () => {
    await getCurrentWebviewWindow().close();
  });

  characterTab.addEventListener("click", () => switchTab("character"));
  themeTab.addEventListener("click", () => switchTab("theme"));

  once(PackManagementEvent.INIT_WINDOW, (event: PackManagementInitEvent) => {
    const { packs, enablePackNames, themePacks, currentThemePack } =
      event.payload;

    allCharacterPacks = packs;
    enabledCharacterPackNames = new Set(enablePackNames);
    allThemePacks = themePacks;
    currentThemeName = currentThemePack.meta.name;

    renderContent();
  });

  emitTo(WindowLabel.main, PackManagementEvent.READY);
});

function renderContent(): void {
  updateTabStyles();
  const container = document.getElementById(
    "packs-container",
  ) as HTMLDivElement;
  container.innerHTML = "";

  if (activeTab === "character") {
    renderCharacterPacks(container);
  } else {
    renderThemePacks(container);
  }
}

function updateTabStyles(): void {
  const characterTab = document.querySelector(
    "#pack-tab > div:nth-child(1)",
  ) as HTMLDivElement;
  const themeTab = document.querySelector(
    "#pack-tab > div:nth-child(2)",
  ) as HTMLDivElement;
  characterTab.classList.toggle("active", activeTab === "character");
  themeTab.classList.toggle("active", activeTab === "theme");
}

function switchTab(tab: PackTab): void {
  if (activeTab !== tab) {
    activeTab = tab;
    renderContent();
  }
}

function renderCharacterPacks(container: HTMLElement): void {
  allCharacterPacks.forEach((pack) => {
    const enabled = enabledCharacterPackNames.has(pack.meta.name);
    const packElement = createCharacterPackElement(pack, enabled);
    container.appendChild(packElement);
  });
}

function renderThemePacks(container: HTMLElement): void {
  allThemePacks.forEach((pack) => {
    const isCurrent = currentThemeName === pack.meta.name;
    const packElement = createThemePackElement(pack, isCurrent);
    container.appendChild(packElement);
  });
}

function createCharacterPackElement(
  pack: CharacterPack,
  enabled: boolean,
): HTMLElement {
  const packName = pack.meta.name;
  const elementId = `pack-check-${packName.replace(/\s+/g, "-")}`;
  const packItem = createPackItemBase(pack);

  const controlHtml = `
    <div class="checkbox-container">
      <input type="checkbox" id="${elementId}" class="pack-checkbox" ${enabled ? "checked" : ""}>
      <label for="${elementId}"></label>
    </div>
  `;
  packItem.insertAdjacentHTML("afterbegin", controlHtml);

  const checkbox = packItem.querySelector(".pack-checkbox") as HTMLInputElement;
  checkbox.addEventListener("change", async () => {
    const isChecked = checkbox.checked;
    await emitTo(
      WindowLabel.main,
      PackManagementEvent.CHARACTER_PACK_ENABLE_CHANGE,
      {
        packName: packName,
        enabled: isChecked,
      },
    );
    isChecked
      ? enabledCharacterPackNames.add(packName)
      : enabledCharacterPackNames.delete(packName);
    packItem.classList.toggle("disabled", !isChecked);
  });

  if (!enabled) {
    packItem.classList.add("disabled");
  }

  return packItem;
}

function createThemePackElement(
  pack: ThemePack,
  isCurrent: boolean,
): HTMLElement {
  const packName = pack.meta.name;
  const elementId = `pack-radio-${packName.replace(/\s+/g, "-")}`;
  const packItem = createPackItemBase(pack);

  const controlHtml = `
    <div class="checkbox-container">
      <input type="radio" id="${elementId}" name="theme-pack" class="pack-radio" value="${packName}" ${isCurrent ? "checked" : ""}>
      <label for="${elementId}"></label>
    </div>
  `;
  packItem.insertAdjacentHTML("afterbegin", controlHtml);

  packItem.addEventListener("click", async () => {
    const radio = packItem.querySelector(".pack-radio") as HTMLInputElement;
    if (!radio.checked) {
      radio.checked = true;
      currentThemeName = packName;
      await emitTo(WindowLabel.main, PackManagementEvent.THEME_PACK_CHANGE, {
        packName: packName,
      });
    }
  });

  return packItem;
}

function createPackItemBase(pack: CharacterPack | ThemePack): HTMLElement {
  const packItem = document.createElement("div");
  packItem.className = "pack-item";
  packItem.dataset.packName = pack.meta.name;

  packItem.innerHTML = `
      <div class="pack-image"></div>
      <div class="pack-details">
        <strong class="pack-name">${pack.meta.name}</strong>
        <span class="pack-description">${pack.meta.description || "설명 없음"}</span>
        <span class="pack-author">제작자: ${pack.meta.author || "알 수 없음"}</span>
      </div>
    `;
  return packItem;
}
