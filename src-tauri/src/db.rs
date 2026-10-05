use rusqlite::{params, Connection, OptionalExtension, Result};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::Manager;
use uuid::Uuid;
use chrono::{DateTime, Utc};

// Database connection manager
pub struct DbConnection(Mutex<Connection>);

impl DbConnection {
    pub fn new(app_handle: &tauri::AppHandle) -> Result<Self> {
        let db_path = get_db_path(app_handle)?;
        let conn = Connection::open(&db_path)?;
        
        // Enable foreign keys
        conn.execute("PRAGMA foreign_keys = ON", [])?;
        
        // Initialize schema
        init_schema(&conn)?;
        
        Ok(DbConnection(Mutex::new(conn)))
    }
    
    pub fn get_connection(&self) -> std::sync::MutexGuard<'_, Connection> {
        self.0.lock().unwrap()
    }
}

fn get_db_path(app_handle: &tauri::AppHandle) -> Result<PathBuf> {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| rusqlite::Error::ToSqlConversionFailure(Box::new(e)))?;
    
    std::fs::create_dir_all(&app_dir)
        .map_err(|e| rusqlite::Error::ToSqlConversionFailure(Box::new(e)))?;
    
    Ok(app_dir.join("anatomylab.db"))
}

fn init_schema(conn: &Connection) -> Result<()> {
    // Users/preferences table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS preferences (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )",
        [],
    )?;

    // Study progress table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS study_progress (
            id TEXT PRIMARY KEY,
            system TEXT NOT NULL,
            anatomy_id TEXT NOT NULL,
            completed_at TEXT NOT NULL,
            score INTEGER,
            time_spent_ms INTEGER,
            UNIQUE(system, anatomy_id)
        )",
        [],
    )?;

    // Quiz history table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS quiz_history (
            id TEXT PRIMARY KEY,
            system TEXT NOT NULL,
            config_id TEXT NOT NULL,
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL,
            correct_count INTEGER NOT NULL,
            started_at TEXT NOT NULL,
            completed_at TEXT NOT NULL,
            time_spent_ms INTEGER
        )",
        [],
    )?;

    // Quiz answers detail
    conn.execute(
        "CREATE TABLE IF NOT EXISTS quiz_answers (
            id TEXT PRIMARY KEY,
            quiz_history_id TEXT NOT NULL,
            question_id TEXT NOT NULL,
            anatomy_id TEXT NOT NULL,
            selected_index INTEGER NOT NULL,
            correct_index INTEGER NOT NULL,
            is_correct INTEGER NOT NULL,
            time_ms INTEGER NOT NULL,
            FOREIGN KEY (quiz_history_id) REFERENCES quiz_history(id) ON DELETE CASCADE
        )",
        [],
    )?;

    // Favorites table
    conn.execute(
        "CREATE TABLE IF NOT EXISTS favorites (
            id TEXT PRIMARY KEY,
            system TEXT NOT NULL,
            anatomy_id TEXT NOT NULL,
            created_at TEXT NOT NULL,
            notes TEXT,
            UNIQUE(system, anatomy_id)
        )",
        [],
    )?;

    // Study sessions (guided study mode)
    conn.execute(
        "CREATE TABLE IF NOT EXISTS study_sessions (
            id TEXT PRIMARY KEY,
            system TEXT NOT NULL,
            guide_id TEXT NOT NULL,
            current_step INTEGER NOT NULL,
            started_at TEXT NOT NULL,
            completed_at TEXT,
            completed INTEGER NOT NULL DEFAULT 0
        )",
        [],
    )?;

    // Search history
    conn.execute(
        "CREATE TABLE IF NOT EXISTS search_history (
            id TEXT PRIMARY KEY,
            query TEXT NOT NULL,
            system TEXT,
            results_count INTEGER NOT NULL,
            selected_anatomy_id TEXT,
            searched_at TEXT NOT NULL
        )",
        [],
    )?;

    // Create indexes
    conn.execute("CREATE INDEX IF NOT EXISTS idx_study_progress_system ON study_progress(system)", [])?;
    conn.execute("CREATE INDEX IF NOT EXISTS idx_quiz_history_system ON quiz_history(system)", [])?;
    conn.execute("CREATE INDEX IF NOT EXISTS idx_quiz_history_completed ON quiz_history(completed_at)", [])?;
    conn.execute("CREATE INDEX IF NOT EXISTS idx_favorites_system ON favorites(system)", [])?;
    conn.execute("CREATE INDEX IF NOT EXISTS idx_search_history_searched ON search_history(searched_at)", [])?;

    Ok(())
}

// ============ Types ============

#[derive(Debug, Serialize, Deserialize)]
pub struct Preference {
    pub key: String,
    pub value: String,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct StudyProgress {
    pub id: String,
    pub system: String,
    pub anatomy_id: String,
    pub completed_at: DateTime<Utc>,
    pub score: Option<i32>,
    pub time_spent_ms: Option<i64>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct QuizHistory {
    pub id: String,
    pub system: String,
    pub config_id: String,
    pub score: i32,
    pub total_questions: i32,
    pub correct_count: i32,
    pub started_at: DateTime<Utc>,
    pub completed_at: DateTime<Utc>,
    pub time_spent_ms: Option<i64>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QuizAnswerInput {
    pub question_id: String,
    pub anatomy_id: String,
    pub selected_index: i32,
    pub correct_index: i32,
    pub is_correct: bool,
    pub time_ms: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Favorite {
    pub id: String,
    pub system: String,
    pub anatomy_id: String,
    pub created_at: DateTime<Utc>,
    pub notes: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct StudySession {
    pub id: String,
    pub system: String,
    pub guide_id: String,
    pub current_step: i32,
    pub started_at: DateTime<Utc>,
    pub completed_at: Option<DateTime<Utc>>,
    pub completed: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SearchHistory {
    pub id: String,
    pub query: String,
    pub system: Option<String>,
    pub results_count: i32,
    pub selected_anatomy_id: Option<String>,
    pub searched_at: DateTime<Utc>,
}

// ============ Tauri Commands ============

#[tauri::command]
pub fn db_set_preference(
    db: tauri::State<'_, DbConnection>,
    key: String,
    value: String,
) -> Result<(), String> {
    let conn = db.get_connection();
    let now = Utc::now().to_rfc3339();
    conn.execute(
        "INSERT OR REPLACE INTO preferences (key, value, updated_at) VALUES (?, ?, ?)",
        params![key, value, now],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn db_get_preference(
    db: tauri::State<'_, DbConnection>,
    key: String,
) -> Result<Option<String>, String> {
    let conn = db.get_connection();
    let mut stmt = conn.prepare("SELECT value FROM preferences WHERE key = ?")
        .map_err(|e| e.to_string())?;
    let value = stmt.query_row(params![key], |row| row.get(0))
        .optional()
        .map_err(|e| e.to_string())?;
    Ok(value)
}

#[tauri::command]
pub fn db_get_all_preferences(
    db: tauri::State<'_, DbConnection>,
) -> Result<Vec<Preference>, String> {
    let conn = db.get_connection();
    let mut stmt = conn.prepare("SELECT key, value, updated_at FROM preferences")
        .map_err(|e| e.to_string())?;
    let prefs = stmt.query_map([], |row| {
        Ok(Preference {
            key: row.get(0)?,
            value: row.get(1)?,
            updated_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(2)?)
                .map(|dt| dt.with_timezone(&Utc))
                .unwrap_or_else(|_| Utc::now()),
        })
    }).map_err(|e| e.to_string())?;
    
    let mut result = Vec::new();
    for pref in prefs {
        result.push(pref.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

// Study Progress
#[tauri::command]
pub fn db_save_study_progress(
    db: tauri::State<'_, DbConnection>,
    system: String,
    anatomy_id: String,
    score: Option<i32>,
    time_spent_ms: Option<i64>,
) -> Result<(), String> {
    let conn = db.get_connection();
    let now = Utc::now().to_rfc3339();
    let id = Uuid::new_v4().to_string();
    conn.execute(
        "INSERT OR REPLACE INTO study_progress (id, system, anatomy_id, completed_at, score, time_spent_ms)
         VALUES (?, ?, ?, ?, ?, ?)",
        params![id, system, anatomy_id, now, score, time_spent_ms],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn db_get_study_progress(
    db: tauri::State<'_, DbConnection>,
    system: String,
) -> Result<Vec<StudyProgress>, String> {
    let conn = db.get_connection();
    let mut stmt = conn.prepare(
        "SELECT id, system, anatomy_id, completed_at, score, time_spent_ms FROM study_progress WHERE system = ?"
    ).map_err(|e| e.to_string())?;
    let rows = stmt.query_map(params![system], |row| {
        Ok(StudyProgress {
            id: row.get(0)?,
            system: row.get(1)?,
            anatomy_id: row.get(2)?,
            completed_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(3)?)
                .map(|dt| dt.with_timezone(&Utc))
                .unwrap_or_else(|_| Utc::now()),
            score: row.get(4)?,
            time_spent_ms: row.get(5)?,
        })
    }).map_err(|e| e.to_string())?;
    
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

// Quiz History
#[tauri::command]
pub fn db_save_quiz_session(
    db: tauri::State<'_, DbConnection>,
    system: String,
    config_id: String,
    score: i32,
    total_questions: i32,
    correct_count: i32,
    started_at: String,
    completed_at: String,
    time_spent_ms: Option<i64>,
    answers: Vec<QuizAnswerInput>,
) -> Result<String, String> {
    let mut conn = db.get_connection();
    let quiz_id = Uuid::new_v4().to_string();
    let transaction = conn.transaction().map_err(|e| e.to_string())?;

    transaction.execute(
        "INSERT INTO quiz_history (id, system, config_id, score, total_questions, correct_count, started_at, completed_at, time_spent_ms)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        params![quiz_id, system, config_id, score, total_questions, correct_count, started_at, completed_at, time_spent_ms],
    ).map_err(|e| e.to_string())?;
    
    for answer in answers {
        let ans_id = Uuid::new_v4().to_string();
        transaction.execute(
            "INSERT INTO quiz_answers (id, quiz_history_id, question_id, anatomy_id, selected_index, correct_index, is_correct, time_ms)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            params![ans_id, quiz_id, answer.question_id, answer.anatomy_id, answer.selected_index, answer.correct_index, answer.is_correct as i32, answer.time_ms],
        ).map_err(|e| e.to_string())?;
    }

    transaction.commit().map_err(|e| e.to_string())?;
    Ok(quiz_id)
}

#[tauri::command]
pub fn db_get_quiz_history(
    db: tauri::State<'_, DbConnection>,
    system: Option<String>,
    limit: Option<i32>,
) -> Result<Vec<QuizHistory>, String> {
    let conn = db.get_connection();
    let limit = limit.unwrap_or(50);
    
    let (sql, params_list) = match system {
        Some(sys) => (
            "SELECT id, system, config_id, score, total_questions, correct_count, started_at, completed_at, time_spent_ms 
             FROM quiz_history WHERE system = ? ORDER BY completed_at DESC LIMIT ?",
            vec![sys, limit.to_string()],
        ),
        None => (
            "SELECT id, system, config_id, score, total_questions, correct_count, started_at, completed_at, time_spent_ms 
             FROM quiz_history ORDER BY completed_at DESC LIMIT ?",
            vec![limit.to_string()],
        ),
    };
    
    let mut stmt = conn.prepare(sql).map_err(|e| e.to_string())?;
    let rows = stmt.query_map(rusqlite::params_from_iter(params_list.iter()), |row| {
        Ok(QuizHistory {
            id: row.get(0)?,
            system: row.get(1)?,
            config_id: row.get(2)?,
            score: row.get(3)?,
            total_questions: row.get(4)?,
            correct_count: row.get(5)?,
            started_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(6)?)
                .map(|dt| dt.with_timezone(&Utc))
                .unwrap_or_else(|_| Utc::now()),
            completed_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(7)?)
                .map(|dt| dt.with_timezone(&Utc))
                .unwrap_or_else(|_| Utc::now()),
            time_spent_ms: row.get(8)?,
        })
    }).map_err(|e| e.to_string())?;
    
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

// Favorites
#[tauri::command]
pub fn db_add_favorite(
    db: tauri::State<'_, DbConnection>,
    system: String,
    anatomy_id: String,
    notes: Option<String>,
) -> Result<(), String> {
    let conn = db.get_connection();
    let now = Utc::now().to_rfc3339();
    let id = Uuid::new_v4().to_string();
    conn.execute(
        "INSERT OR REPLACE INTO favorites (id, system, anatomy_id, created_at, notes)
         VALUES (?, ?, ?, ?, ?)",
        params![id, system, anatomy_id, now, notes],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn db_remove_favorite(
    db: tauri::State<'_, DbConnection>,
    system: String,
    anatomy_id: String,
) -> Result<(), String> {
    let conn = db.get_connection();
    conn.execute(
        "DELETE FROM favorites WHERE system = ? AND anatomy_id = ?",
        params![system, anatomy_id],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn db_get_favorites(
    db: tauri::State<'_, DbConnection>,
    system: Option<String>,
) -> Result<Vec<Favorite>, String> {
    let conn = db.get_connection();
    let (sql, params_list) = match system {
        Some(sys) => (
            "SELECT id, system, anatomy_id, created_at, notes FROM favorites WHERE system = ? ORDER BY created_at DESC",
            vec![sys],
        ),
        None => (
            "SELECT id, system, anatomy_id, created_at, notes FROM favorites ORDER BY created_at DESC",
            vec![],
        ),
    };
    
    let mut stmt = conn.prepare(sql).map_err(|e| e.to_string())?;
    let rows = stmt.query_map(rusqlite::params_from_iter(params_list.iter()), |row| {
        Ok(Favorite {
            id: row.get(0)?,
            system: row.get(1)?,
            anatomy_id: row.get(2)?,
            created_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(3)?)
                .map(|dt| dt.with_timezone(&Utc))
                .unwrap_or_else(|_| Utc::now()),
            notes: row.get(4)?,
        })
    }).map_err(|e| e.to_string())?;
    
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

// Study Sessions
#[tauri::command]
pub fn db_save_study_session(
    db: tauri::State<'_, DbConnection>,
    system: String,
    guide_id: String,
    current_step: i32,
    started_at: String,
    completed_at: Option<String>,
    completed: bool,
) -> Result<String, String> {
    let conn = db.get_connection();
    let id = Uuid::new_v4().to_string();
    conn.execute(
        "INSERT OR REPLACE INTO study_sessions (id, system, guide_id, current_step, started_at, completed_at, completed)
         VALUES (?, ?, ?, ?, ?, ?, ?)",
        params![id, system, guide_id, current_step, started_at, completed_at, completed as i32],
    ).map_err(|e| e.to_string())?;
    Ok(id)
}

#[tauri::command]
pub fn db_get_study_sessions(
    db: tauri::State<'_, DbConnection>,
    system: Option<String>,
) -> Result<Vec<StudySession>, String> {
    let conn = db.get_connection();
    let (sql, params_list) = match system {
        Some(sys) => (
            "SELECT id, system, guide_id, current_step, started_at, completed_at, completed FROM study_sessions WHERE system = ? ORDER BY started_at DESC",
            vec![sys],
        ),
        None => (
            "SELECT id, system, guide_id, current_step, started_at, completed_at, completed FROM study_sessions ORDER BY started_at DESC",
            vec![],
        ),
    };
    
    let mut stmt = conn.prepare(sql).map_err(|e| e.to_string())?;
    let rows = stmt.query_map(rusqlite::params_from_iter(params_list.iter()), |row| {
        Ok(StudySession {
            id: row.get(0)?,
            system: row.get(1)?,
            guide_id: row.get(2)?,
            current_step: row.get(3)?,
            started_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(4)?)
                .map(|dt| dt.with_timezone(&Utc))
                .unwrap_or_else(|_| Utc::now()),
            completed_at: row.get::<_, Option<String>>(5)?
                .and_then(|s| DateTime::parse_from_rfc3339(&s).ok().map(|dt| dt.with_timezone(&Utc))),
            completed: row.get::<_, i32>(6)? == 1,
        })
    }).map_err(|e| e.to_string())?;
    
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

// Search History
#[tauri::command]
pub fn db_add_search_history(
    db: tauri::State<'_, DbConnection>,
    query: String,
    system: Option<String>,
    results_count: i32,
    selected_anatomy_id: Option<String>,
) -> Result<(), String> {
    let conn = db.get_connection();
    let now = Utc::now().to_rfc3339();
    let id = Uuid::new_v4().to_string();
    conn.execute(
        "INSERT INTO search_history (id, query, system, results_count, selected_anatomy_id, searched_at)
         VALUES (?, ?, ?, ?, ?, ?)",
        params![id, query, system, results_count, selected_anatomy_id, now],
    ).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn db_get_search_history(
    db: tauri::State<'_, DbConnection>,
    limit: Option<i32>,
) -> Result<Vec<SearchHistory>, String> {
    let conn = db.get_connection();
    let limit = limit.unwrap_or(20);
    let mut stmt = conn.prepare(
        "SELECT id, query, system, results_count, selected_anatomy_id, searched_at 
         FROM search_history ORDER BY searched_at DESC LIMIT ?"
    ).map_err(|e| e.to_string())?;
    
    let rows = stmt.query_map(params![limit], |row| {
        Ok(SearchHistory {
            id: row.get(0)?,
            query: row.get(1)?,
            system: row.get(2)?,
            results_count: row.get(3)?,
            selected_anatomy_id: row.get(4)?,
            searched_at: DateTime::parse_from_rfc3339(&row.get::<_, String>(5)?)
                .map(|dt| dt.with_timezone(&Utc))
                .unwrap_or_else(|_| Utc::now()),
        })
    }).map_err(|e| e.to_string())?;
    
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

// Mastery stats
#[tauri::command]
pub fn db_get_mastery_stats(
    db: tauri::State<'_, DbConnection>,
    system: String,
) -> Result<Vec<(String, i32, i32)>, String> {
    let conn = db.get_connection();
    let mut stmt = conn.prepare(
        "SELECT anatomy_id, 
                SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct,
                COUNT(*) as total
         FROM quiz_answers qa
         JOIN quiz_history qh ON qa.quiz_history_id = qh.id
         WHERE qh.system = ?
         GROUP BY anatomy_id
         ORDER BY correct DESC"
    ).map_err(|e| e.to_string())?;
    
    let rows = stmt.query_map(params![system], |row| {
        Ok((row.get(0)?, row.get(1)?, row.get(2)?))
    }).map_err(|e| e.to_string())?;
    
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}
