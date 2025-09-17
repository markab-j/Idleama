import type { BorderAsset } from "@feature/theme-pack/schema/border-asset.schema";

export class BorderRenderer {
  render(borderAsset: BorderAsset): void {
    document.documentElement.style.setProperty(
      "--top-border-sprite",
      `url(${borderAsset.src})`,
    );
  }
}
