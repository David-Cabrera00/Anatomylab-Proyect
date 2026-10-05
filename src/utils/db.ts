// SQLite Database API for Frontend
import { invoke } from "@tauri-apps/api/core";

export interface Preference {
  key: string;
  value: string;
  updated_at: string;
}

export interface StudyProgress {
  id: string;
  system: string;
  anatomy_id: string;
  completed_at: string;
  score: number | null;
  time_spent_ms: number | null;
}

export interface QuizHistory {
  id: string;
  system: string;
  config_id: string;
  score: number;
  total_questions: number;
  correct_count: number;
  started_at: string;
  completed_at: string;
  time_spent_ms: number | null;
}

export interface QuizAnswer {
  id: string;
  quiz_history_id: string;
  question_id: string;
  anatomy_id: string;
  selected_index: number;
  correct_index: number;
  is_correct: boolean;
  time_ms: number;
}

export interface Favorite {
  id: string;
  system: string;
  anatomy_id: string;
  created_at: string;
  notes: string | null;
}

export interface StudySession {
  id: string;
  system: string;
  guide_id: string;
  current_step: number;
  started_at: string;
  completed_at: string | null;
  completed: boolean;
}

export interface SearchHistory {
  id: string;
  query: string;
  system: string | null;
  results_count: number;
  selected_anatomy_id: string | null;
  searched_at: string;
}

export interface MasteryStat {
  anatomy_id: string;
  correct: number;
  total: number;
}

// Preferences
export async function dbSetPreference(key: string, value: string): Promise<void> {
  return invoke("db_set_preference", { key, value });
}

export async function dbGetPreference(key: string): Promise<string | null> {
  return invoke("db_get_preference", { key });
}

export async function dbGetAllPreferences(): Promise<Preference[]> {
  return invoke("db_get_all_preferences");
}

// Study Progress
export async function dbSaveStudyProgress(
  system: string,
  anatomyId: string,
  score: number | null = null,
  timeSpentMs: number | null = null
): Promise<void> {
  return invoke("db_save_study_progress", { system, anatomy_id: anatomyId, score, time_spent_ms: timeSpentMs });
}

export async function dbGetStudyProgress(system: string): Promise<StudyProgress[]> {
  return invoke("db_get_study_progress", { system });
}

// Quiz History
export interface SaveQuizSessionParams {
  system: string;
  config_id: string;
  score: number;
  total_questions: number;
  correct_count: number;
  started_at: string;
  completed_at: string;
  time_spent_ms: number | null;
  answers: Array<{
    question_id: string;
    anatomy_id: string;
    selected: number;
    correct: number;
    is_correct: boolean;
    time_ms: number;
  }>;
}

export async function dbSaveQuizSession(params: SaveQuizSessionParams): Promise<string> {
  return invoke("db_save_quiz_session", {
    system: params.system,
    config_id: params.config_id,
    score: params.score,
    total_questions: params.total_questions,
    correct_count: params.correct_count,
    started_at: params.started_at,
    completed_at: params.completed_at,
    time_spent_ms: params.time_spent_ms,
    answers: params.answers,
  });
}

export async function dbGetQuizHistory(system?: string, limit?: number): Promise<QuizHistory[]> {
  return invoke("db_get_quiz_history", { system, limit });
}

// Favorites
export async function dbAddFavorite(
  system: string,
  anatomyId: string,
  notes?: string
): Promise<void> {
  return invoke("db_add_favorite", { system, anatomy_id: anatomyId, notes });
}

export async function dbRemoveFavorite(system: string, anatomyId: string): Promise<void> {
  return invoke("db_remove_favorite", { system, anatomy_id: anatomyId });
}

export async function dbGetFavorites(system?: string): Promise<Favorite[]> {
  return invoke("db_get_favorites", { system });
}

// Study Sessions
export interface SaveStudySessionParams {
  system: string;
  guide_id: string;
  current_step: number;
  started_at: string;
  completed_at?: string | null;
  completed: boolean;
}

export async function dbSaveStudySession(params: SaveStudySessionParams): Promise<string> {
  return invoke("db_save_study_session", {
    system: params.system,
    guide_id: params.guide_id,
    current_step: params.current_step,
    started_at: params.started_at,
    completed_at: params.completed_at,
    completed: params.completed,
  });
}

export async function dbGetStudySessions(system?: string): Promise<StudySession[]> {
  return invoke("db_get_study_sessions", { system });
}

// Search History
export async function dbAddSearchHistory(
  query: string,
  system: string | null,
  resultsCount: number,
  selectedAnatomyId?: string | null
): Promise<void> {
  return invoke("db_add_search_history", {
    query,
    system,
    results_count: resultsCount,
    selected_anatomy_id: selectedAnatomyId,
  });
}

export async function dbGetSearchHistory(limit?: number): Promise<SearchHistory[]> {
  return invoke("db_get_search_history", { limit });
}

// Mastery Stats
export async function dbGetMasteryStats(system: string): Promise<Array<{ anatomy_id: string; correct: number; total: number }>> {
  return invoke("db_get_mastery_stats", { system });
}

// Convenience: Mastery level calculation
export function getMasteryLevel(correct: number, total: number): "none" | "learning" | "familiar" | "proficient" | "mastered" {
  if (total === 0) return "none";
  const ratio = correct / total;
  if (ratio < 0.3) return "learning";
  if (ratio < 0.5) return "familiar";
  if (ratio < 0.8) return "proficient";
  return "mastered";
}

export function getMasteryColor(level: ReturnType<typeof getMasteryLevel>): string {
  switch (level) {
    case "mastered": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "proficient": return "text-green-600 bg-green-50 border-green-200";
    case "familiar": return "text-blue-600 bg-blue-50 border-blue-200";
    case "learning": return "text-amber-600 bg-amber-50 border-amber-200";
    default: return "text-slate-500 bg-slate-50 border-slate-200";
  }
}