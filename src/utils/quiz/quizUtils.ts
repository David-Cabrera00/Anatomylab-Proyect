import type { QuizSession, QuizConfig, QuizProgress, QuizQuestion } from "../../data/quiz/types";
import { getQuizConfig, getRandomQuizQuestions } from "../../data/quiz";

const STORAGE_KEY_PREFIX = "anatomylab_quiz_";

export function saveQuizProgress(progress: QuizProgress): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${progress.system}`, JSON.stringify(progress));
  } catch {
    // Ignore storage errors (private browsing, quota exceeded, etc.)
  }
}

export function loadQuizProgress(system: string): QuizProgress | null {
  try {
    const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${system}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function createQuizSession(configId: string): QuizSession | null {
  const config = getQuizConfig(configId);
  if (!config) return null;

  const questionIds = getRandomQuizQuestions(config.system, config.questionsPerSession).map((q) => q.id);

  return {
    configId,
    system: config.system,
    questionIds,
    currentIndex: 0,
    answers: {},
    startedAt: Date.now(),
  };
}

export function getCurrentQuestion(session: QuizSession, config: QuizConfig): QuizQuestion | null {
  if (session.currentIndex >= session.questionIds.length) return null;
  const questionId = session.questionIds[session.currentIndex];
  return config.questionPool.find((q) => q.id === questionId) ?? null;
}

export function answerQuestion(
  session: QuizSession,
  config: QuizConfig,
  selectedIndex: number,
  timeMs: number
): QuizSession {
  const question = getCurrentQuestion(session, config);
  if (!question) return session;

  const correct = selectedIndex === question.correctIndex;
  const newAnswers = {
    ...session.answers,
    [question.id]: { selectedIndex, correct, timeMs },
  };

  return {
    ...session,
    answers: newAnswers,
    currentIndex: session.currentIndex + 1,
  };
}

export function finishQuizSession(session: QuizSession, config: QuizConfig): { session: QuizSession; progress: QuizProgress } {
  const completedSession = {
    ...session,
    completedAt: Date.now(),
  };

  const progress = loadQuizProgress(session.system) ?? {
    system: session.system,
    sessionsCompleted: 0,
    totalScore: 0,
    bestScore: 0,
    masteryByAnatomyId: {},
  };

  const updatedProgress = updateQuizProgress(progress, completedSession, config);
  saveQuizProgress(updatedProgress);

  return { session: completedSession, progress: updatedProgress };
}

function updateQuizProgress(
  progress: QuizProgress,
  session: QuizSession,
  config: QuizConfig
): QuizProgress {
  const correctCount = Object.values(session.answers).filter((a) => a.correct).length;
  const score = Math.round((correctCount / config.questionsPerSession) * 100);

  const newMastery = { ...progress.masteryByAnatomyId };
  for (const [questionId, answer] of Object.entries(session.answers)) {
    const question = config.questionPool.find((q) => q.id === questionId);
    if (!question) continue;
    const key = question.anatomyId;
    const current = newMastery[key] ?? { correct: 0, total: 0, lastSeen: 0 };
    newMastery[key] = {
      correct: current.correct + (answer.correct ? 1 : 0),
      total: current.total + 1,
      lastSeen: Date.now(),
    };
  }

  return {
    ...progress,
    sessionsCompleted: progress.sessionsCompleted + 1,
    totalScore: progress.totalScore + score,
    bestScore: Math.max(progress.bestScore, score),
    masteryByAnatomyId: newMastery,
    lastSessionAt: Date.now(),
  };
}

export function getMasteryLevel(
  correct: number,
  total: number
): "none" | "learning" | "familiar" | "proficient" | "mastered" {
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

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}