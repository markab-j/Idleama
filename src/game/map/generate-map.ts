import type { KAPLAYCtx } from "kaplay";

export function generateMap(k: KAPLAYCtx, width: number, height: number): Array<string> {
    const tileSize = 16;

    const rowRepeatCount = Math.ceil(width / tileSize);
    const colRepeatCount = Math.ceil(height/ tileSize);

    const map = Array
            .from({ length: colRepeatCount })
            .map(() => 
                Array
                    .from({ length: rowRepeatCount })
                    .map(() => String(k.randi(1, 10)))
                    .join("")
            );

    return map;
}