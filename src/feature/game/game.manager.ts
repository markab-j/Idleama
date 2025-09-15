import kaplay, { type KAPLAYCtx } from "kaplay";
import type { AppWindowContext } from "@/windows/types";

export class GameManager {
  private readonly k: KAPLAYCtx;

  constructor(appWindowContext: AppWindowContext) {
    const { size, scaleFactor } = appWindowContext;

    const width = size.width / scaleFactor;
    const height = size.height / scaleFactor;

    const canvas = document.getElementById(
      "game-container",
    ) as HTMLCanvasElement;

    this.k = kaplay({
      width,
      height,
      canvas,
      debug: true,
    });
  }

  getGameCtx(): KAPLAYCtx {
    return this.k;
  }
}
