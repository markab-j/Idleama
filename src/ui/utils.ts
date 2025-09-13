import { convertFileSrc } from "@tauri-apps/api/core";
import { resolveResource } from "@tauri-apps/api/path";

export async function createMenuButton(
  iconName: string,
): Promise<HTMLButtonElement> {
  const iconResourcePath = await resolveResource(`assets/ui/${iconName}.png`);
  const imgSrc = convertFileSrc(iconResourcePath);

  const btn = document.createElement("button");

  btn.classList.add("menu-btn");

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = iconName;

  btn.appendChild(img);

  return btn;
}
