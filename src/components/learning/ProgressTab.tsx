import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export interface ProgressTabProps {
  system: string;
}

export function ProgressTab({ system }: ProgressTabProps) {
  const MASTERY_ORDER: Record<string, number> = {
    mastered: 0,
    proficient: 1,
    familiar: 2,
    learning: 3,
    none: 4,
  };

  const MASTERY_COLOR: Record<string, string> = {
    mastered: "bg-emerald-100 text-emerald-700 border-emerald-200",
    proficient: "bg-green-100 text-green-700 border-green-200",
    familiar: "bg-blue-100 text-blue-700 border-blue-200",
    learning: "bg-amber-100 text-amber-700 border-amber-200",
    none: "bg-slate-100 text-slate-500 border-slate-200",
  };

  const MASTERY_LABEL: Record<string, string> = {
    mastered: "Dominado",
    proficient: "Avanzado",
    familiar: "Familiar",
    learning: "Aprendiendo",
    none: "Sin datos",
  };

  const getMasteryLevel = (correct: number, total: number): string => {
    if (total === 0) return "none";
    const ratio = correct / total;
    if (ratio < 0.3) return "learning";
    if (ratio < 0.5) return "familiar";
    if (ratio < 0.8) return "proficient";
    return "mastered";
  };

  const getMasteryColor = (level: string): string => {
    switch (level) {
      case "mastered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "proficient": return "bg-green-100 text-green-700 border-green-200";
      case "familiar": return "bg-blue-100 text-blue-700 border-blue-200";
      case "learning": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  const getMasteryLabel = (level: string): string => {
    switch (level) {
      case "mastered": return "Dominado";
      case "proficient": return "Avanzado";
      case "familiar": return "Familiar";
      case "learning": return "Aprendiendo";
      default: return "Sin datos";
    }
  };

  const [stats, setStats] = useState<Array<{ anatomy_id: string; correct: number; total: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [system]);

  async function loadProgress() {
    setLoading(true);
    try {
      const mastery = await invoke("db_get_mastery_stats", { system });
      setStats(mastery as Array<{ anatomy_id: string; correct: number; total: number }>);
    } catch (e) {
      console.error("Error loading progress:", e);
    } finally {
      setLoading(false);
    }
  }

  function getMasteryLevel(correct: number, total: number): string {
    if (total === 0) return "none";
    const ratio = correct / total;
    if (ratio < 0.3) return "learning";
    if (ratio < 0.5) return "familiar";
    if (ratio < 0.8) return "proficient";
    return "mastered";
  }

  const getMasteryColor = (level: string): string => {
    switch (level) {
      case "mastered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "proficient": return "bg-green-100 text-green-700 border-green-200";
      case "familiar": return "bg-blue-100 text-blue-700 border-blue-200";
      case "learning": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-500 border-slate-200";
    }
  }

  const getMasteryLabel = (level: string): string => {
    switch (level) {
      case "mastered": return "Dominado";
      case "proficient": return "Avanzado";
      case "familiar": return "Familiar";
      case "learning": return "Aprendiendo";
      default: return "Sin datos";
    }
  };

  const [stats, setStats] = useState<Array<{ anatomy_id: string; correct: number; total: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [system]);

  async function loadProgress() {
    setLoading(true);
    try {
      const mastery = await invoke("db_get_mastery_stats", { system });
      setStats(mastery as Array<{ anatomy_id: string; correct: number; total: number }>);
    } catch (e) {
      console.error("Error loading progress:", e);
    } finally {
      setLoading(false);
    }
  }

  function getMasteryLevel(correct: number, total: number): string {
    if (total === 0) return "none";
    const ratio = correct / total;
    if (ratio < 0.3) return "learning";
    if (ratio < 0.5) return "familiar";
    if (ratio < 0.8) return "proficient";
    return "mastered";
  }

  const getMasteryColor = (level: string): string => {
    switch (level) {
      case "mastered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "proficient": return "bg-green-100 text-green-700 border-green-200";
      case "familiar": return "bg-blue-100 text-blue-700 border-blue-200";
      case "learning": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-500 border-slate-200";
    }
  }

  const getMasteryLabel = (level: string): string => {
    switch (level) {
      case "mastered": return "Dominado";
      case "proficient": return "Avanzado";
      case "familiar": return "Familiar";
      case "learning": return "Aprendiendo";
      default: return "Sin datos";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-slate-500 text-sm">
        Cargando progreso...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="font-medium text-sm text-slate-700 mb-3">Resumen global ({system})</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="text-2xl font-bold text-slate-700">{stats.reduce((sum, s) => sum + s.total, 0)}</div>
            <div className="text-xs text-slate-500">Preguntas respondidas</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="text-2xl font-bold text-emerald-600">
              {stats.reduce((sum, s) => sum + s.total, 0) > 0
                ? Math.round((stats.reduce((sum, s) => sum + s.correct, 0) / stats.reduce((sum, s) => sum + s.total, 0)) * 100)
                : 0}%
              </div>
            <div className="text-xs text-slate-500">Precisión global</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="text-2xl font-bold text-blue-600">{stats.length}</div>
            <div className="text-xs text-slate-500">Estructuras vistas</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm text-slate-700 mb-2">Maestría por estructura</h4>
        {stats.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-sm">
            No hay datos de maestría aún.<br />
            <span className="text-xs">Completa quizzes para ver el progreso.</span>
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {stats
              .sort((a, b) => {
                const levelA = getMasteryLevel(a.correct, a.total);
                const levelB = getMasteryLevel(b.correct, b.total);
                return MASTERY_ORDER[levelA] - MASTERY_ORDER[levelB];
              })
              .map((s) => {
                const level = getMasteryLevel(s.correct, s.total);
                const color = getMasteryColor(level);
                const label = getMasteryLabel(level);
                return (
                  <div
                    key={s.anatomy_id}
                    className={`rounded-lg border px-3 py-2 text-sm flex items-center justify-between ${color}`}
                  >
                    <span className="font-medium truncate">{s.anatomy_id}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}>
                        {label}
                      </span>
                      <span className="text-xs text-slate-600">{s.correct}/{s.total}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

const MASTERY_ORDER: Record<string, number> = {
  mastered: 0,
  proficient: 1,
  familiar: 2,
  learning: 3,
  none: 4,
};

const getMasteryLevel = (correct: number, total: number): string => {
  if (total === 0) return "none";
  const ratio = correct / total;
  if (ratio < 0.3) return "learning";
  if (ratio < 0.5) return "familiar";
  if (ratio < 0.8) return "proficient";
  return "mastered";
};

const getMasteryColor = (level: string): string => {
  switch (level) {
    case "mastered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "proficient": return "bg-green-100 text-green-700 border-green-200";
    case "familiar": return "bg-blue-100 text-blue-700 border-blue-200";
    case "learning": return "bg-amber-100 text-amber-700 border-amber-200";
    default: return "bg-slate-100 text-slate-500 border-slate-200";
  };
};

const getMasteryLabel = (level: string): string => {
  switch (level) {
    case "mastered": return "Dominado";
    case "proficient": return "Avanzado";
    case "familiar": return "Familiar";
    case "learning": return "Aprendiendo";
    default: return "Sin datos";
  };
}