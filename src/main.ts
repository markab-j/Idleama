import { CharacterPackManager } from "@/feature/character-pack/character-pack.manager";
import { PathService } from "./core/service/path.service";
import { CharacterPackPathProvider } from "./feature/character-pack/character-pack-path.provider";
import { CharacterSpriteAtlasDataProvider } from "./feature/character-pack/character-sprite-atlas-data.provider";
import { FileSystemCharacterPackLoader } from "./feature/character-pack/fs-character-pack.loader";
import { FileSystemCharacterPackConfigStore } from "./feature/character-pack/fs-character-pack-config.store";
import { BackGroundRenderer } from "./feature/theme-pack/background.renderer";
import { FileSystemThemeLoader } from "./feature/theme-pack/fs-theme.loader";
import { ThemePackManager } from "./feature/theme-pack/theme.manager";
import { FileSystemThemePackConfigStore } from "./feature/theme-pack/theme-pack-config.store";
import { ThemePackPathProvider } from "./feature/theme-pack/theme-pack-path.provider";
import { initGame } from "./game/init-game";
import { CharacterManager } from "./game/manager/character-manager";
import { MainUIFactory } from "./ui/main/ui.factory";
import { MainUIManager } from "./ui/main/ui.manager";
import { WindowManager } from "./windows/window-manager";

async function main() {
  // Init Window
  const { size, scaleFactor } = await WindowManager.initMainWindow();

  const width = size.width / scaleFactor;
  const height = size.height / scaleFactor;

  // TODO
  // Loading Screen

  const characterPackPathProvider = new CharacterPackPathProvider();
  const themePackPathProvider = new ThemePackPathProvider();
  // Init
  const pathService = new PathService(
    characterPackPathProvider,
    themePackPathProvider,
  );
  await pathService.initAppPath();

  const k = await initGame(width, height);

  const characterPackConfigStore = new FileSystemCharacterPackConfigStore();
  await characterPackConfigStore.load();

  const characterPackManager = new CharacterPackManager(
    new FileSystemCharacterPackLoader(
      k,
      new CharacterSpriteAtlasDataProvider(),
    ),
    characterPackConfigStore,
    characterPackPathProvider,
  );
  await characterPackManager.init();

  // Data Load
  const themeLoader = new FileSystemThemeLoader(k);
  const themePackConfigStore = new FileSystemThemePackConfigStore();
  await themePackConfigStore.load();

  const themeManager = new ThemePackManager(
    themeLoader,
    themePackConfigStore,
    new BackGroundRenderer(k),
    themePackPathProvider,
  );
  await themeManager.init();

  const windowManager = new WindowManager(characterPackManager);
  const mainUIFactory = new MainUIFactory(windowManager);
  const mainUIManager = new MainUIManager(mainUIFactory);

  await mainUIManager.initTitleBar();

  // Main
  const characterManager = new CharacterManager(k, characterPackManager);
  characterManager.createEnabledCharacters();
}

main()
  .then(() => console.log("Initialized"))
  .catch((e) => console.error(e));
