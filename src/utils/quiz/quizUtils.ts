import type { QuizSession, QuizConfig, QuizQuestion } from "../../data/quiz/types";
import { getQuizConfig, getRandomQuizQuestions } from "../../data/quiz";

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

export function finishQuizSession(session: QuizSession): QuizSession {
  return {
    ...session,
    completedAt: Date.now(),
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
