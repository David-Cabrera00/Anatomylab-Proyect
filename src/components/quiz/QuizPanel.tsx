import { useCallback, useState } from "react";

import { Button } from "../ui";
import type { QuizState } from "../../data/quiz/types";
import type { AnatomySystemId } from "../../config/anatomySystems";
import { getQuizConfig, getQuizConfigsBySystem } from "../../data/quiz";
import { answerQuestion, createQuizSession, finishQuizSession, formatTime } from "../../utils/quiz/quizUtils";
import { dbSaveQuizSession } from "../../utils/db";
import { getLocalizedText, systemTranslationKeys, useI18n } from "../../i18n";

interface QuizPanelProps {
  activeSystem: AnatomySystemId;
  quizState: QuizState;
  onStateChange: (state: QuizState) => void;
  onClose: () => void;
}

export function QuizPanel({ activeSystem: activeSystemId, quizState, onStateChange, onClose }: QuizPanelProps) {
  const { language, t } = useI18n();
  const activeSystem = t(systemTranslationKeys[activeSystemId]);
  const [configs] = useState(() => getQuizConfigsBySystem(activeSystemId));
  const [persistenceError, setPersistenceError] = useState<string | null>(null);

  const handleStartQuiz = useCallback((configId: string) => {
    const session = createQuizSession(configId);
    if (!session) return;
    const config = getQuizConfig(configId)!;
    onStateChange({ status: "active", session, config });
  }, [onStateChange]);

  if (quizState.status === "idle") {
    return (
      <section className="border border-line bg-surface shadow-ds-raised">
        <header className="border-b border-line px-6 py-6 sm:px-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.16em] text-accent">{t("quizTitle")}</p>
              <h1 className="mt-3 text-display font-semibold tracking-tight text-ink">{t("quizChooseAssessment")}</h1>
              <p className="mt-3 max-w-2xl text-body leading-6 text-ink-muted">{t("quizDescription")}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label={t("quizClose")}>×</Button>
          </div>
        </header>
        <div className="px-6 py-6 sm:px-8">
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">{t("quizActiveSystem")} · {activeSystem}</p>
          <div className="mt-4 grid gap-3">
            {configs.map((config) => (
              <button
                key={config.id}
                type="button"
                onClick={() => handleStartQuiz(config.id)}
                className="group flex w-full items-center justify-between gap-5 border border-line bg-surface-raised px-4 py-4 text-left transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="min-w-0">
                  <span className="block text-heading font-semibold text-ink">{getLocalizedText(config.title, language)}</span>
                  <span className="mt-1 block text-body leading-6 text-ink-muted">{getLocalizedText(config.description, language)}</span>
                </span>
                <ArrowIcon className="shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (quizState.status === "active") {
    const { session, config } = quizState;
    const question = config.questionPool.find((q) => q.id === session.questionIds[session.currentIndex]);
    const progress = (session.currentIndex / config.questionsPerSession) * 100;

    if (!question) return null;

    const handleAnswer = (selectedIndex: number) => {
      const timeMs = Date.now() - session.startedAt;
      const updatedSession = answerQuestion(session, config, selectedIndex, timeMs);

      if (updatedSession.currentIndex >= config.questionsPerSession) {
        const completedSession = finishQuizSession(updatedSession);
        const correctCount = Object.values(completedSession.answers).filter((answer) => answer.correct).length;
        const completedAt = completedSession.completedAt ?? Date.now();
        setPersistenceError(null);
        void dbSaveQuizSession({
          system: completedSession.system,
          configId: config.id,
          score: Math.round((correctCount / completedSession.questionIds.length) * 100),
          totalQuestions: completedSession.questionIds.length,
          correctCount,
          startedAt: new Date(completedSession.startedAt).toISOString(),
          completedAt: new Date(completedAt).toISOString(),
          timeSpentMs: completedAt - completedSession.startedAt,
          answers: completedSession.questionIds.flatMap((questionId) => {
            const completedQuestion = config.questionPool.find((item) => item.id === questionId);
            const answer = completedSession.answers[questionId];
            return completedQuestion && answer ? [{
              questionId,
              anatomyId: completedQuestion.anatomyId,
              selectedIndex: answer.selectedIndex,
              correctIndex: completedQuestion.correctIndex,
              isCorrect: answer.correct,
              timeMs: answer.timeMs,
            }] : [];
          }),
        }).catch((error) => {
          console.error("Error saving quiz session:", error);
          setPersistenceError(t("quizPersistenceError"));
        });
        onStateChange({ status: "reviewing", session: completedSession, config });
      } else {
        onStateChange({ status: "active", session: updatedSession, config });
      }
    };

    return (
      <section className="border border-line bg-surface shadow-ds-raised">
        <header className="border-b border-line px-6 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3 text-caption uppercase tracking-[0.12em] text-ink-subtle">
                <span>{t("quizTitle")}</span>
                <span>{t("quizQuestion")} {session.currentIndex + 1} {t("studyOf")} {config.questionsPerSession}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-canvas-muted" role="progressbar" aria-label={`${Math.round(progress)}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label={t("quizClose")}>×</Button>
          </div>
        </header>

        <div className="px-6 py-8 sm:px-12 sm:py-10">
          <div className="max-w-3xl">
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-accent">{difficultyLabel(question.difficulty, t)}</p>
            <h1 className="mt-3 text-[1.65rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2rem]">{getLocalizedText(question.prompt, language)}</h1>
          </div>
          <div className="mt-8 grid gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleAnswer(index)}
                className="group flex min-h-14 w-full items-center gap-4 border border-line bg-surface-raised px-4 py-3 text-left transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-label font-semibold text-ink-muted transition-colors duration-150 group-hover:border-accent group-hover:text-accent">{String.fromCharCode(65 + index)}</span>
                <span className="text-body text-ink">{getLocalizedText(option, language)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (quizState.status === "reviewing") {
    const { session, config } = quizState;
    const correctCount = Object.values(session.answers).filter((a) => a.correct).length;
    const score = Math.round((correctCount / config.questionsPerSession) * 100);
    const passed = score >= config.passingScore;
    const totalTime = session.completedAt ? session.completedAt - session.startedAt : 0;

    return (
      <section className="border border-line bg-surface shadow-ds-raised">
        <header className="border-b border-line px-6 py-7 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.16em] text-accent">{t("quizResult")}</p>
              <h1 className="mt-3 text-display font-semibold tracking-tight text-ink">{passed ? t("quizPassed") : t("quizKeepPracticing")}</h1>
              <p className="mt-2 text-body text-ink-muted">{correctCount} {t("studyOf")} {config.questionsPerSession} {t("quizCorrectCount")} · {formatTime(totalTime)}</p>
            </div>
            <div className="text-right"><span className="text-[3.5rem] font-semibold leading-none tracking-tight text-ink">{score}%</span><p className="mt-2 text-caption uppercase tracking-[0.12em] text-ink-subtle">{t("quizScore")}</p></div>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-canvas-muted" role="progressbar" aria-label={`${score}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}><div className={`h-full rounded-full ${passed ? "bg-success" : "bg-accent"}`} style={{ width: `${score}%` }} /></div>
        </header>

        <div className="space-y-3 px-6 py-6 sm:px-8">
          {persistenceError && <p className="border-l-2 border-error bg-error-soft px-4 py-3 text-body text-error" role="alert">{persistenceError}</p>}
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">{t("quizReviewAnswers")}</p>
          {session.questionIds.map((qId, index) => {
            const question = config.questionPool.find((q) => q.id === qId);
            const answer = session.answers[qId];
            if (!question || !answer) return null;

            const isCorrect = answer.correct;
            return (
              <article key={qId} className={`border px-4 py-4 ${isCorrect ? "border-success/40 bg-success-soft/40" : "border-error/40 bg-error-soft/40"}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-subtle">{t("quizQuestion")} {index + 1}</span>
                  <span className={`flex items-center gap-2 text-label font-semibold ${isCorrect ? "text-success" : "text-error"}`}><StatusIcon correct={isCorrect} />{isCorrect ? t("quizCorrect") : t("quizIncorrect")}</span>
                </div>
                <p className="mt-3 text-body font-medium text-ink">{getLocalizedText(question.prompt, language)}</p>
                <div className="mt-3 space-y-1.5">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = optionIndex === answer.selectedIndex;
                    const isCorrectOption = optionIndex === question.correctIndex;
                    return <div key={optionIndex} className={`flex items-start gap-3 text-label ${isSelected || isCorrectOption ? "font-medium text-ink" : "text-ink-muted"}`}><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-caption ${isCorrectOption ? "border-success bg-success-soft text-success" : isSelected ? "border-error bg-error-soft text-error" : "border-line-strong"}`}>{isCorrectOption ? "✓" : isSelected ? "×" : String.fromCharCode(65 + optionIndex)}</span><span>{getLocalizedText(option, language)}</span></div>;
                  })}
                </div>
                <p className="mt-4 border-t border-current/10 pt-3 text-label leading-5 text-ink-muted">{getLocalizedText(question.explanation, language)}</p>
              </article>
            );
          })}
        </div>

        <footer className="flex flex-wrap justify-end gap-3 border-t border-line px-6 py-5 sm:px-8">
          <Button variant="ghost" onClick={onClose}>{t("quizBack")}</Button>
          <Button variant="primary" onClick={() => {
            const newSession = createQuizSession(config.id);
            if (newSession) onStateChange({ status: "active", session: newSession, config });
          }}>{t("quizRetry")}</Button>
        </footer>
      </section>
    );
  }

  return null;
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-4 w-4 ${className}`}><path d="M3 10h13M11 5l5 5-5 5" /></svg>;
}

function StatusIcon({ correct }: { correct: boolean }) {
  return correct
    ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>
    : <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8" /></svg>;
}

function difficultyLabel(difficulty: "easy" | "medium" | "hard", t: ReturnType<typeof useI18n>["t"]): string {
  return t(difficulty === "easy" ? "quizDifficultyEasy" : difficulty === "medium" ? "quizDifficultyMedium" : "quizDifficultyHard");
}
