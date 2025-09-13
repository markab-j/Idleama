import { emit, listen } from "@tauri-apps/api/event";

const container = document.getElementById("packs-container");

listen("packs:update", (e) => {
  const { packs } = e.payload;
  renderPacks(packs);
});

function renderPacks(packs) {
  container.innerHTML = "";
  packs.forEach((pack) => {
    const div = document.createElement("div");
    div.className = "pack-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      emit("packs:selected", { selected: getSelected() });
    });

    const label = document.createElement("label");
    label.textContent = pack;

    div.appendChild(checkbox);
    div.appendChild(label);
    container.appendChild(div);
  });
}

function getSelected() {
  return Array.from(container.querySelectorAll("input[type=checkbox]"))
    .map((cb, idx) => (cb.checked ? idx : null))
    .filter((v) => v !== null);
}
