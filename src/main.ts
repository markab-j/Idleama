import "@/ui";
import { startGame } from "@/game/game";
import { initWindow } from "./init-window";

async function main() {
  const { size, scaleFactor } = await initWindow();

  const width = size.width / scaleFactor;
  const height = size.height / scaleFactor;

  startGame(width, height);
}

main()
  .then()
  .catch((e) => console.error(e))
  .finally(() => console.log("Initialized"));
