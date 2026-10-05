import { useEffect, useState } from 'react';
import { dbGetQuizHistory, type QuizHistory } from '../../utils/db';

export interface HistoryTabProps {
  system: string;
}

const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatTime = (ms: number | null): string => {
  if (!ms) return '—';
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return m + ':' + (s % 60).toString().padStart(2, '0');
};

export function HistoryTab({ system }: HistoryTabProps) {
  const [sessions, setSessions] = useState<QuizHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, [system]);

  async function loadHistory() {
    setLoading(true);
    try {
      setSessions(await dbGetQuizHistory(system, 50));
    } catch (e) {
      console.error('Error loading history:', e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-8 text-slate-500 text-sm'>
        Cargando historial...
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className='text-center py-8 text-slate-500 text-sm'>
        No hay sesiones de quiz aún.<br />
        <span className='text-xs'>Completa un quiz para ver el historial.</span>
      </div>
    );
  }

  return (
    <div className='space-y-2 max-h-[400px] overflow-y-auto'>
      {sessions.map((session) => {
        const isExpanded = expandedId === session.id;
        return (
          <div
            key={session.id}
            className='rounded-lg border border-slate-200 bg-white overflow-hidden'
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : session.id)}
              className='w-full p-3 flex items-center justify-between gap-2 text-left'
            >
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 text-sm'>
                  <span className='font-medium'>{session.correct_count}/{session.total_questions}</span>
                  <span className={'px-2 py-0.5 rounded text-xs font-medium ' + (session.score >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}>
                    {session.score}%
                  </span>
                </div>
                <div className='flex items-center gap-2 text-xs text-slate-500'>
                  <span>{formatDate(session.completed_at)}</span>
                  <span>·</span>
                  <span>{formatTime(session.time_spent_ms)}</span>
                </div>
              </div>
              <span className={isExpanded ? 'rotate-180' : ''}>▼</span>
            </button>

            {isExpanded && (
              <div className='border-t border-slate-200 bg-slate-50 p-3 space-y-3'>
                <div className='text-xs text-slate-600'>
                  Config: {session.config_id} · Inicio: {formatDate(session.started_at)}
                </div>
                <span className='text-xs text-slate-500 underline cursor-pointer'>
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
