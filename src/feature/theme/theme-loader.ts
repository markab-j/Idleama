import { convertFileSrc } from "@tauri-apps/api/core";
import { resolveResource } from "@tauri-apps/api/path";
import type { KAPLAYCtx } from "kaplay";

export class ThemeLoader {
  constructor(private readonly k: KAPLAYCtx) {}

  async loadDefaultTile(): Promise<void> {
    console.log("start load DefaultTile...");

    const defaultTilePath = await resolveResource("assets/default/tile.png");

    await this.k.loadSprite("tile_default", convertFileSrc(defaultTilePath), {
      sliceX: 11,
      sliceY: 7,
    });

    console.log("default tile Loaded...");
  }
}
