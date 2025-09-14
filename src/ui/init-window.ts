import {
  currentMonitor,
  getCurrentWindow,
  type Monitor,
  PhysicalPosition,
  PhysicalSize,
} from "@tauri-apps/api/window";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";

export async function initWindow(): Promise<
  Pick<Monitor, "size" | "scaleFactor">
> {
  const monitor = await currentMonitor();

  if (monitor === null) {
    throw new Error("Display Not Detected");
  }

  console.log("monitor Size: ", {
    size: monitor.size,
    factor: monitor.scaleFactor,
  });

  const monitorSize = monitor.size;

  const currentWindow = getCurrentWindow();

  const scaledHeight = Math.floor(monitor.size.height / 4);

  const newWindowSize = new PhysicalSize(monitorSize.width, scaledHeight);

  await currentWindow.setSize(newWindowSize);

  await moveWindow(Position.BottomCenter);
  // const { workArea } = monitor;
  // const newX = workArea.position.x + (workArea.size.width - newWindowSize.width) / 2;
  // const newY = workArea.position.y + workArea.size.height - newWindowSize.height;

  // await currentWindow.setPosition(new PhysicalPosition(newX, newY));

  const { width, height } = await currentWindow.innerSize();

  console.log("Current Window InnerSize: ", {
    width,
    height,
  });

  currentWindow.setResizable(false);

  if (!currentWindow.isVisible()) {
    currentWindow.show();
  }

  return {
    size: new PhysicalSize(width, height),
    scaleFactor: monitor.scaleFactor,
  };
}
