import { getCurrentWindow } from "@tauri-apps/api/window";

export function windowMoveToggle() {
    const button = document.createElement('button');

    button.textContent = "토글";

    button.classList.add('window-move-toggle');

    button.addEventListener('click', async () => {
        console.log("버튼 클릭");
        const cur = getCurrentWindow();

        const newValue = await cur.isDecorated()

        await cur.setDecorations(!newValue);
    });

    document.body.appendChild(button);
}