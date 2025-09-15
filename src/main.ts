import { CharacterPackManager } from "@/feature/character-pack/character-pack.manager";
import { PathService } from "./core/service/path.service";
import { createLogger } from "./core/utils/logger";
import { CharacterPackPathProvider } from "./feature/character-pack/character-pack-path.provider";
import { CharacterSpriteAtlasDataProvider } from "./feature/character-pack/character-sprite-atlas-data.provider";
import { FileSystemCharacterPackLoader } from "./feature/character-pack/fs-character-pack.loader";
import { FileSystemCharacterPackConfigStore } from "./feature/character-pack/fs-character-pack-config.store";
import { GameManager } from "./feature/game/game.manager";
import { FileSystemThemeLoader } from "./feature/theme-pack/fs-theme.loader";
import { FileSystemThemePackConfigStore } from "./feature/theme-pack/fs-theme-pack-config.store";
import { ThemePackManager } from "./feature/theme-pack/theme.manager";
import { ThemeRenderer } from "./feature/theme-pack/theme.renderer";
import { ThemePackPathProvider } from "./feature/theme-pack/theme-pack-path.provider";
import { CharacterManager } from "./game/manager/character-manager";
import { MainUIFactory } from "./ui/main/ui.factory";
import { MainUIManager } from "./ui/main/ui.manager";
import { WindowManager } from "./windows/window-manager";

async function main() {
  // Init Window
  const appWindowContext = await WindowManager.initMainWindow();

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

  const gameManager = new GameManager(appWindowContext);

  const k = gameManager.getGameCtx();

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

  const themePackManager = new ThemePackManager(
    themeLoader,
    themePackConfigStore,
    new ThemeRenderer(k),
    themePackPathProvider,
  );
  await themePackManager.init();

  const windowManager = new WindowManager(
    characterPackManager,
    themePackManager,
  );
  const mainUIFactory = new MainUIFactory(windowManager);
  const mainUIManager = new MainUIManager(mainUIFactory);

  await mainUIManager.initTitleBar();

  // Main
  const characterManager = new CharacterManager(k, characterPackManager);
  characterManager.createEnabledCharacters();
}

const mainLogger = createLogger("Main");

main()
  .then(() => mainLogger.log("Initialized"))
  .catch((e) => mainLogger.error(e));
