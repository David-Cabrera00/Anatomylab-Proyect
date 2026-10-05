mod db;

use db::DbConnection;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(DbConnection::new)
        .invoke_handler(tauri::generate_handler![
            greet,
            // Preferences
            db::db_set_preference,
            db::db_get_preference,
            db::db_get_all_preferences,
            // Study Progress
            db::db_save_study_progress,
            db::db_get_study_progress,
            // Quiz History
            db::db_save_quiz_session,
            db::db_get_quiz_history,
            // Favorites
            db::db_add_favorite,
            db::db_remove_favorite,
            db::db_get_favorites,
            // Study Sessions
            db::db_save_study_session,
            db::db_get_study_sessions,
            // Search History
            db::db_add_search_history,
            db::db_get_search_history,
            // Mastery
            db::db_get_mastery_stats,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}