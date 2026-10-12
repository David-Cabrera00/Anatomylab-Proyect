import { useEffect, useState } from "react";

import { dbGetQuizAnswers, dbGetQuizHistory, type QuizAnswer, type QuizHistory } from "../../utils/db";
import { getLocalizedText, useI18n } from "../../i18n";
import { getQuizConfig } from "../../data/quiz";
import { ErrorState, LoadingState } from "../ui";

export interface HistoryTabProps {
  system: string;
}

const formatDate = (iso: string, language: "es" | "en"): string =>
  new Date(iso).toLocaleString(language === "en" ? "en-US" : "es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatTime = (ms: number | null): string => {
  if (!ms) return "—";
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${(s % 60).toString().padStart(2, "0")}`;
};

export function HistoryTab({ system }: HistoryTabProps) {
  const { language, t } = useI18n();
  const [sessions, setSessions] = useState<QuizHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [answersBySession, setAnswersBySession] = useState<Record<string, QuizAnswer[]>>({});
  const [loadingAnswers, setLoadingAnswers] = useState<string | null>(null);
  const [answerErrors, setAnswerErrors] = useState<Record<string, boolean>>({});

  const toggleSession = async (session: QuizHistory) => {
    const isExpanded = expandedId === session.id;
    setExpandedId(isExpanded ? null : session.id);
    if (isExpanded || answersBySession[session.id]) return;
    setLoadingAnswers(session.id);
    try {
      const answers = await dbGetQuizAnswers(session.id);
      setAnswersBySession((current) => ({ ...current, [session.id]: answers }));
    } catch (error) {
      console.error("Error loading quiz answers:", error);
      setAnswerErrors((current) => ({ ...current, [session.id]: true }));
    } finally {
      setLoadingAnswers((current) => current === session.id ? null : current);
    }
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setHasError(false);
    dbGetQuizHistory(system, 50)
      .then((data) => {
        if (!cancelled) setSessions(data);
      })
      .catch((error) => { console.error("Error loading history:", error); if (!cancelled) setHasError(true); })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [system, retryKey]);

  if (loading) {
    return <LoadingState label={t("historyLoading")} />;
  }

  if (hasError) return <ErrorState title={t("dataLoadErrorTitle")} description={t("historyLoadError")} retryLabel={t("commonRetry")} onRetry={() => setRetryKey((key) => key + 1)} />;

  if (sessions.length === 0) {
    return (
      <div className="border-l-2 border-accent bg-accent-soft/30 px-4 py-5 text-sm text-ink-muted">
        <p className="font-medium text-ink">{t("historyEmpty")}</p>
        <p className="mt-1 text-xs">{t("historyEmptyHint")}</p>
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-y-auto border-y border-line">
      {sessions.map((session) => {
        const isExpanded = expandedId === session.id;
        const config = getQuizConfig(session.config_id);
        const answers = answersBySession[session.id] ?? [];
        return (
          <div
            key={session.id}
            className="overflow-hidden border-b border-line last:border-b-0"
          >
            <button
              onClick={() => void toggleSession(session)}
              className="group flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition-colors duration-150 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm text-ink">
                  <span className="font-semibold">{session.correct_count}/{session.total_questions}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium ${
                    session.score >= 70
                      ? "bg-success-soft text-success"
                      : "bg-error-soft text-error"
                  }`}>
                    {session.score}%
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-ink-muted">
                  <span>{formatDate(session.completed_at, language)}</span>
                  <span>·</span>
                  <span>{formatTime(session.time_spent_ms)}</span>
                </div>
              </div>
              <svg
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 text-ink-muted transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isExpanded && (
              <div className="space-y-3 border-t border-line bg-surface-raised px-3 py-3">
                <div className="text-xs text-ink-muted">
                  {t("historyConfig")}: {session.config_id} · {t("historyStart")}: {formatDate(session.started_at, language)}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">{t("historyDetails")}</p>
                {loadingAnswers === session.id ? (
                  <p className="text-sm text-ink-muted">{t("historyAnswerLoading")}</p>
                ) : answerErrors[session.id] ? (
                  <p className="text-sm text-error">{t("historyAnswerError")}</p>
                ) : answers.length === 0 ? (
                  <p className="text-sm text-ink-muted">{t("historyQuestionUnavailable")}</p>
                ) : (
                  <div className="space-y-2">
                    {answers.map((answer, index) => {
                      const question = config?.questionPool.find((candidate) => candidate.id === answer.question_id);
                      const selected = question?.options[answer.selected_index];
                      const correct = question?.options[answer.correct_index];
                      return (
                        <div key={answer.id} className="border border-line bg-surface px-3 py-2 text-sm">
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-medium text-ink">{index + 1}. {question ? getLocalizedText(question.prompt, language) : t("historyQuestionUnavailable")}</span>
                            <span className={answer.is_correct ? "text-success" : "text-error"}>{answer.is_correct ? "✓" : "×"}</span>
                          </div>
                          <div className="mt-2 grid gap-1 text-xs text-ink-muted sm:grid-cols-2">
                            <span>{t("historySelected")}: <strong className="font-medium text-ink">{selected ? getLocalizedText(selected, language) : "—"}</strong></span>
                            <span>{t("historyCorrectAnswer")}: <strong className="font-medium text-ink">{correct ? getLocalizedText(correct, language) : "—"}</strong></span>
                            <span>{t("historyAnswerTime")}: {formatTime(answer.time_ms)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
