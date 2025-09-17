import { CharacterPackManager } from "@/feature/character-pack/character-pack.manager";
import { PathService } from "./core/service/path.service";
import { createLogger } from "./core/utils/logger";
import { CharacterGameObjectManager } from "./feature/character/character-gameobject.manager";
import { CharacterManager } from "./feature/character/character-manager";
import { CharacterPackPathProvider } from "./feature/character-pack/character-pack-path.provider";
import { CharacterSpriteAtlasDataProvider } from "./feature/character-pack/character-sprite-atlas-data.provider";
import { FileSystemCharacterPackLoader } from "./feature/character-pack/fs-character-pack.loader";
import { FileSystemCharacterPackConfigStore } from "./feature/character-pack/fs-character-pack-config.store";
import { GameManager } from "./feature/game/game.manager";
import { PackManagementEventListener } from "./feature/pack-managment/pack-management-event.listener";
import { ThemeManager } from "./feature/theme/theme.manager";
import { FileSystemThemePackLoader } from "./feature/theme-pack/fs-theme-pack.loader";
import { FileSystemThemePackConfigStore } from "./feature/theme-pack/fs-theme-pack-config.store";
import { ThemeRenderer } from "./feature/theme-pack/theme.renderer";
import { ThemePackManager } from "./feature/theme-pack/theme-pack.manager";
import { ThemePackAssetRegistrar } from "./feature/theme-pack/theme-pack-asset.registrar";
import { ThemePackEventListener } from "./feature/theme-pack/theme-pack-event.listener";
import { ThemePackPathProvider } from "./feature/theme-pack/theme-pack-path.provider";
import { CharacterFactory } from "./game/character/character.factory";
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

  // Init Character
  const characterFactory = new CharacterFactory(k);
  const characterGameObjectManager = new CharacterGameObjectManager(
    characterFactory,
  );
  const characterManager = new CharacterManager(characterGameObjectManager);

  // Init CharacterPack
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

  // Init Theme
  const themeRenderer = new ThemeRenderer(k);
  const themeManager = new ThemeManager(themeRenderer);

  // Init Theme Pack
  const themePackEventListener = new ThemePackEventListener(themeManager);
  const themePackLoader = new FileSystemThemePackLoader(themePackPathProvider);
  const themePackAssetRegisterar = new ThemePackAssetRegistrar(k);
  const themePackConfigStore = new FileSystemThemePackConfigStore();
  await themePackConfigStore.load();

  const themePackManager = new ThemePackManager(
    themePackLoader,
    themePackAssetRegisterar,
    themePackConfigStore,
  );

  themePackEventListener.init();
  await themePackManager.init();

  const packManagementEventListener = new PackManagementEventListener(
    characterPackManager,
    characterManager,
  );
  packManagementEventListener.init();

  const windowManager = new WindowManager(
    characterPackManager,
    themePackManager,
  );
  const mainUIFactory = new MainUIFactory(windowManager);
  const mainUIManager = new MainUIManager(mainUIFactory);

  await mainUIManager.initTitleBar();

  // Main

  characterManager.initializeCharacters(characterPackManager.getEnablePacks());
}

const mainLogger = createLogger("Main");

main()
  .then(() => mainLogger.log("Initialized"))
  .catch((e) => mainLogger.error(e));
