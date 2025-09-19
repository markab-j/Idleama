import type { Monitor } from "@tauri-apps/api/window";

export type AppWindowContext = Pick<Monitor, "size" | "scaleFactor">;
