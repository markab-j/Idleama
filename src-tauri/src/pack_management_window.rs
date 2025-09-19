use tauri::{AppHandle, Manager, WebviewWindowBuilder};

#[tauri::command]
pub async fn open_pack_management(
    app: AppHandle,
    webview_window: tauri::WebviewWindow
) -> Result<(), String> {
    open_pack_management_impl(app, webview_window)
        .await
        .map_err(|e| e.to_string())
}

async fn open_pack_management_impl(
    app: AppHandle,
    webview_window: tauri::WebviewWindow,
) -> Result<(), String> {
    let webview_url = tauri::WebviewUrl::App("packs.html".into());
    let label = "pack-management";

    if let Some(existing_window) = app.get_webview_window(&label) {
        if let Err(e) = existing_window.set_focus() {
            println!("Error focusing the dialog window: {:?}", e);
        }
    } else {
        let _ = WebviewWindowBuilder::new(
            &app,
            "pack-management",
            webview_url.clone())
            .title("pack-management")
            .decorations(false)
            .inner_size(400.0, 600.0)
            .min_inner_size(400.0, 600.0)
            .center()
            .parent(&webview_window).unwrap()
            .build().unwrap();

    }
    Ok(())
}