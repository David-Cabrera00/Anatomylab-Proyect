import { useEffect, useState } from "react";

import { dbGetMasteryStats, getMasteryColor, getMasteryLevel } from "../../utils/db";

export interface ProgressTabProps { system: string; }

const MASTERY_ORDER = { mastered: 0, proficient: 1, familiar: 2, learning: 3, none: 4 } as const;
const MASTERY_LABEL = { mastered: "Dominado", proficient: "Avanzado", familiar: "Familiar", learning: "Aprendiendo", none: "Sin datos" } as const;

export function ProgressTab({ system }: ProgressTabProps) {
  const [stats, setStats] = useState<Array<{ anatomy_id: string; correct: number; total: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    dbGetMasteryStats(system)
      .then((mastery) => { if (!cancelled) setStats(mastery); })
      .catch((error) => console.error("Error loading progress:", error))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [system]);

  if (loading) return <div className="flex items-center justify-center py-8 text-sm text-slate-500">Cargando progreso...</div>;

  const totalAnswers = stats.reduce((sum, item) => sum + item.total, 0);
  const totalCorrect = stats.reduce((sum, item) => sum + item.correct, 0);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-medium text-slate-700">Resumen global ({system})</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-slate-50 p-3"><div className="text-2xl font-bold text-slate-700">{totalAnswers}</div><div className="text-xs text-slate-500">Preguntas respondidas</div></div>
          <div className="rounded-lg bg-slate-50 p-3"><div className="text-2xl font-bold text-emerald-600">{totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0}%</div><div className="text-xs text-slate-500">Precisión global</div></div>
          <div className="rounded-lg bg-slate-50 p-3"><div className="text-2xl font-bold text-blue-600">{stats.length}</div><div className="text-xs text-slate-500">Estructuras vistas</div></div>
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium text-slate-700">Maestría por estructura</h4>
        {stats.length === 0 ? (
          <div className="py-6 text-center text-sm text-slate-500">No hay datos de maestría aún.<br /><span className="text-xs">Completa quizzes para ver el progreso.</span></div>
        ) : (
          <div className="max-h-[300px] space-y-2 overflow-y-auto">
            {[...stats].sort((a, b) => MASTERY_ORDER[getMasteryLevel(a.correct, a.total)] - MASTERY_ORDER[getMasteryLevel(b.correct, b.total)]).map((item) => {
              const level = getMasteryLevel(item.correct, item.total);
              return (
                <div key={item.anatomy_id} className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${getMasteryColor(level)}`}>
                  <span className="truncate font-medium">{item.anatomy_id}</span>
                  <div className="flex items-center gap-2"><span className="rounded px-2 py-0.5 text-xs font-medium">{MASTERY_LABEL[level]}</span><span className="text-xs">{item.correct}/{item.total}</span></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
