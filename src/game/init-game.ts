import kaplay, { type KAPLAYCtx } from "kaplay";

export async function initGame(
  width: number,
  height: number,
): Promise<KAPLAYCtx> {
  const canvas = document.getElementById("game-container") as HTMLCanvasElement;

  const k = kaplay({
    width,
    height,
    canvas,
    debug: true,
  });

  console.log("게임 캔버스 사이즈: ", {
    width,
    height,
  });

  return k;
}
