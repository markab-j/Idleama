#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    println!("Tauri Backend Starting...");
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_fs::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
