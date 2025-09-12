import { startGame } from "@/game/game";
import { initWindow } from "@/ui";
import { initPath } from "./data/init";

async function main() {
  await initPath();
  const { size, scaleFactor } = await initWindow();

  const width = size.width / scaleFactor;
  const height = size.height / scaleFactor;

  await startGame(width, height);
}

main()
  .then()
  .catch((e) => console.error(e))
  .finally(() => console.log("Initialized"));
