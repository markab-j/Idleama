import kaplay, { type KAPLAYCtx } from "kaplay";
import type { AppWindowContext } from "@/windows/types";

export class GameManager {
  private readonly k: KAPLAYCtx;

  constructor(appWindowContext: AppWindowContext) {
    const { size, scaleFactor } = appWindowContext;

    const topBorderHeight = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--top-border-height");

    const width = size.width / scaleFactor;
    const height = size.height / scaleFactor - parseInt(topBorderHeight, 10);

    const canvas = document.getElementById(
      "game-container",
    ) as HTMLCanvasElement;

    this.k = kaplay({
      width,
      height,
      canvas,
      debug: true,
    });

    this.k.setLayers(["bg", "obj"], "bg");
  }

  getGameCtx(): KAPLAYCtx {
    return this.k;
  }
}
