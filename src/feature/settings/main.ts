/** biome-ignore-all lint/style/noNonNullAssertion: is not NULL */
import { WindowLabel } from "@app/window/constants";
import TauriFsBackend from "@core/i18n/tauri-backend";
import {
  getCurrentWebviewWindow,
  WebviewWindow,
} from "@tauri-apps/api/webviewWindow";
import i18next from "i18next";
import { SettingConfigStore } from "./setting-config.store";

const languageMap: Record<string, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

function applyTranslations() {
  document.getElementById("settings-title")!.textContent = i18next.t("title");
  document.getElementById("language-setting-title")!.textContent =
    i18next.t("language.title");
  document.getElementById("window-level-title")!.textContent =
    i18next.t("windowLevel.title");
  document.getElementById("always-on-top-button")!.textContent = i18next.t(
    "windowLevel.alwaysOnTop",
  );
  document.getElementById("always-on-bottom-button")!.textContent = i18next.t(
    "windowLevel.alwaysOnBack",
  );

  document.querySelectorAll<HTMLDivElement>(".option").forEach((option) => {
    const lang = option.dataset.value!;
    option.textContent = languageMap[lang] || lang;
  });
}

function setupEventListeners(
  current: WebviewWindow,
  settingConfigStore: SettingConfigStore,
) {
  document.getElementById("close-button")?.addEventListener("click", () => {
    current.close();
  });

  document
    .getElementById("always-on-top-button")
    ?.addEventListener("click", async () => {
      const mainWindow = await WebviewWindow.getByLabel(WindowLabel.main);
      if (mainWindow) mainWindow.setAlwaysOnTop(true);

      settingConfigStore.setWindowLevel("alwaysOnTop");
    });

  document
    .getElementById("always-on-bottom-button")
    ?.addEventListener("click", async () => {
      const mainWindow = await WebviewWindow.getByLabel(WindowLabel.main);
      if (mainWindow) mainWindow.setAlwaysOnTop(false);

      settingConfigStore.setWindowLevel("alwaysOnBottom");
    });

  const select = document.getElementById("language-select")!;
  const trigger = select.querySelector(".select-trigger")!;
  const options = select.querySelectorAll<HTMLDivElement>(".option");

  trigger.addEventListener("click", () => {
    select.classList.toggle("open");
  });

  options.forEach((option) => {
    option.addEventListener("click", async () => {
      const selectedLanguage = option.dataset.value!;
      await i18next.changeLanguage(selectedLanguage);
      await settingConfigStore.setLang(selectedLanguage);
      select.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target as Node)) {
      select.classList.remove("open");
    }
  });
}

function updateLanguageSelection() {
  const currentLang = i18next.language.split("-")[0];

  const selectedLanguageEl = document.getElementById("selected-language")!;
  selectedLanguageEl.textContent = languageMap[currentLang] || currentLang;

  document.querySelectorAll<HTMLDivElement>(".option").forEach((option) => {
    if (option.dataset.value === currentLang) {
      option.classList.add("selected");
    } else {
      option.classList.remove("selected");
    }
  });
}

async function initialize() {
  const settingConfigStore = new SettingConfigStore();

  await settingConfigStore.load();

  const currentWindow = getCurrentWebviewWindow();
  setupEventListeners(currentWindow, settingConfigStore);

  await i18next.use(TauriFsBackend).init({
    lng: settingConfigStore.getCurrentLang(),
    fallbackLng: "en",
    ns: ["common", "settings"],
    defaultNS: "settings",
  });

  i18next.on("languageChanged", () => {
    applyTranslations();
    updateLanguageSelection();
  });

  applyTranslations();
  updateLanguageSelection();
}

document.addEventListener("DOMContentLoaded", initialize);
