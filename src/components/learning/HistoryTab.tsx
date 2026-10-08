import { useEffect, useState } from "react";

import { dbGetQuizHistory, type QuizHistory } from "../../utils/db";

export interface HistoryTabProps {
  system: string;
}

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleString("es-ES", {
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
  const [sessions, setSessions] = useState<QuizHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    dbGetQuizHistory(system, 50)
      .then((data) => {
        if (!cancelled) setSessions(data);
      })
      .catch((error) => console.error("Error loading history:", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [system]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-ink-muted text-sm">
        Cargando historial...
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="border-l-2 border-accent bg-accent-soft/30 px-4 py-5 text-sm text-ink-muted">
        <p className="font-medium text-ink">No hay sesiones de quiz aún.</p>
        <p className="mt-1 text-xs">Completa un quiz para ver el historial.</p>
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-y-auto border-y border-line">
      {sessions.map((session) => {
        const isExpanded = expandedId === session.id;
        return (
          <div
            key={session.id}
            className="overflow-hidden border-b border-line last:border-b-0"
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : session.id)}
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
                  <span>{formatDate(session.completed_at)}</span>
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
                  Config: {session.config_id} · Inicio: {formatDate(session.started_at)}
                </div>
                <span className="text-xs text-ink-muted underline underline-offset-2">
                  Ver respuestas detalladas (próximamente)
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
