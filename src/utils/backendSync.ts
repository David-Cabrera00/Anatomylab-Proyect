import { anatomySystemList } from "../config/anatomySystems";
import { dbGetAllPreferences, dbGetFavorites, dbGetQuizAnswers, dbGetQuizHistory, dbGetStudyProgress, dbGetStudySessions } from "./db";
import { backendSync, type BackendFavoriteItem, type BackendPreferenceItem, type BackendProgressItem, type BackendQuizSessionItem, type BackendStudySessionItem } from "./backendApi";

export async function syncLocalLearningData(token: string) {
  const progressRows = await Promise.all(
    anatomySystemList.map((system) => dbGetStudyProgress(system.id)),
  );
  const favoritesRows = await Promise.all(
    anatomySystemList.map((system) => dbGetFavorites(system.id)),
  );
  const quizHistory = await dbGetQuizHistory(undefined, 500);
  const quizSessions: BackendQuizSessionItem[] = await Promise.all(quizHistory.map(async (session) => ({
    id: session.id,
    system: session.system,
    configId: session.config_id,
    score: session.score,
    totalQuestions: session.total_questions,
    correctCount: session.correct_count,
    startedAt: session.started_at,
    completedAt: session.completed_at,
    timeSpentMs: session.time_spent_ms ?? 0,
    answers: (await dbGetQuizAnswers(session.id)).map((answer) => ({
      questionId: answer.question_id,
      anatomyId: answer.anatomy_id,
      selectedIndex: answer.selected_index,
      correctIndex: answer.correct_index,
      isCorrect: answer.is_correct,
      timeMs: answer.time_ms,
    })),
  })));
  const studySessions: BackendStudySessionItem[] = (await dbGetStudySessions()).map((session) => ({
    id: session.id,
    system: session.system,
    stepsDone: session.current_step,
    startedAt: session.started_at,
    ...(session.completed_at ? { completedAt: session.completed_at } : {}),
  }));
  const preferences: BackendPreferenceItem[] = (await dbGetAllPreferences()).map((preference) => ({
    key: preference.key,
    value: preference.value,
  }));

  const progress: BackendProgressItem[] = progressRows.flat().map((row) => ({
    system: row.system,
    anatomyId: row.anatomy_id,
    score: row.score ?? 0,
    timeSpentMs: row.time_spent_ms ?? 0,
  }));
  const favorites: BackendFavoriteItem[] = favoritesRows.flat().map((row) => ({
    system: row.system,
    anatomyId: row.anatomy_id,
    ...(row.notes ? { notes: row.notes } : {}),
  }));

  return backendSync(token, progress, favorites, quizSessions, studySessions, preferences);
}
