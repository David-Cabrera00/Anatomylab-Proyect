import type { AnatomySystemId } from "../../config/anatomySystems";

export type QuizQuestionType =
  | "identify-by-description"
  | "identify-by-function"
  | "identify-by-location"
  | "identify-by-relationship"
  | "match-anatomy-id"
  | "true-false";

export type QuizQuestion = {
  id: string;
  type: QuizQuestionType;
  anatomyId: string;
  system: AnatomySystemId;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
};

export type QuizConfig = {
  id: string;
  system: AnatomySystemId;
  title: string;
  description: string;
  questionPool: QuizQuestion[];
  questionsPerSession: number;
  passingScore: number;
  timeLimitSeconds?: number;
};

export type QuizSession = {
  configId: string;
  system: AnatomySystemId;
  questionIds: string[];
  currentIndex: number;
  answers: Record<string, { selectedIndex: number; correct: boolean; timeMs: number }>;
  startedAt: number;
  completedAt?: number;
  score?: number;
};

export type QuizProgress = {
  system: AnatomySystemId;
  sessionsCompleted: number;
  totalScore: number;
  bestScore: number;
  masteryByAnatomyId: Record<string, { correct: number; total: number; lastSeen: number }>;
  lastSessionAt?: number;
};

export type QuizState =
  | { status: "closed" }
  | { status: "idle" }
  | { status: "configuring"; configId: string }
  | { status: "active"; session: QuizSession; config: QuizConfig }
  | { status: "reviewing"; session: QuizSession; config: QuizConfig }
  | { status: "completed"; session: QuizSession; config: QuizConfig; progress: QuizProgress };

export function createEmptyQuizProgress(system: AnatomySystemId): QuizProgress {
  return {
    system,
    sessionsCompleted: 0,
    totalScore: 0,
    bestScore: 0,
    masteryByAnatomyId: {},
  };
}

export function updateQuizProgress(
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