import { convertFileSrc } from "@tauri-apps/api/core";
import { resolveResource } from "@tauri-apps/api/path";
import type { KAPLAYCtx } from "kaplay";

export async function loadDefaultTile(k: KAPLAYCtx): Promise<void> {
    try {
        const defaultTilePath = await resolveResource("assets/default/tile.png");
      
        await k.loadSprite("tile_default", convertFileSrc(defaultTilePath), {
          sliceX: 11,
          sliceY: 7,
        });
    } catch (e) {
        console.error(e);
    }
}
