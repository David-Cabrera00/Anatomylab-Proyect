import { useEffect, useState } from "react";

import { dbGetMasteryStats, getMasteryColor, getMasteryLevel } from "../../utils/db";
import { useI18n } from "../../i18n";

export type MasteryStat = { anatomy_id: string; correct: number; total: number };

export interface ProgressTabProps {
  system: string;
  stats?: MasteryStat[];
  onStatsLoaded?: (stats: MasteryStat[]) => void;
  showSummary?: boolean;
}

const normalizeStats = (values: MasteryStat[]): MasteryStat[] => values.map((item) => ({
  anatomy_id: item.anatomy_id,
  correct: toFiniteCount(item.correct),
  total: toFiniteCount(item.total),
}));

const toFiniteCount = (value: unknown): number => {
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
};

const MASTERY_ORDER = { mastered: 0, proficient: 1, familiar: 2, learning: 3, none: 4 } as const;
const MASTERY_LABEL_KEYS = { mastered: "masteryMastered", proficient: "masteryProficient", familiar: "masteryFamiliar", learning: "masteryLearning", none: "masteryNone" } as const;

export function ProgressTab({ system, stats: providedStats, onStatsLoaded, showSummary = true }: ProgressTabProps) {
  const { t } = useI18n();
  const [stats, setStats] = useState<MasteryStat[]>(normalizeStats(providedStats ?? []));
  const [loading, setLoading] = useState(providedStats === undefined);

  useEffect(() => {
    if (providedStats) {
      setStats(normalizeStats(providedStats));
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    dbGetMasteryStats(system)
      .then((mastery) => {
        if (cancelled) return;
        const normalizedStats = normalizeStats(mastery);
        setStats(normalizedStats);
        onStatsLoaded?.(normalizedStats);
      })
      .catch((error) => console.error("Error loading progress:", error))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [system, providedStats, onStatsLoaded]);

  if (loading) return <div className="flex items-center justify-center py-8 text-label text-ink-muted">{t("progressLoading")}</div>;

  const totalAnswers = stats.reduce((sum, item) => sum + item.total, 0);
  const totalCorrect = stats.reduce((sum, item) => sum + item.correct, 0);

  return (
    <div className="space-y-6">
      {showSummary ? (
        <div className="border-b border-line pb-5">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-subtle">{t("progressActiveSystem")}</p><h4 className="mt-1 text-heading font-semibold text-ink">{system}</h4></div><span className="text-heading font-semibold text-accent">{totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0}%</span></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-canvas-muted"><div className="h-full rounded-full bg-accent" style={{ width: `${totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0}%` }} /></div>
        </div>
      ) : null}
      <div>
        <div className="mb-3 flex items-center justify-between gap-4"><h4 className="text-heading font-semibold text-ink">{t("progressMastery")}</h4><span className="text-caption uppercase tracking-[0.1em] text-ink-subtle">{stats.length} {t("progressMasteryCount")}</span></div>
        {stats.length === 0 ? (
          <div className="border-l-2 border-accent bg-accent-soft/40 px-4 py-4 text-body text-ink-muted">{t("progressNoMastery")}</div>
        ) : (
          <div className="max-h-[360px] divide-y divide-line overflow-y-auto border-y border-line">
            {[...stats].sort((a, b) => MASTERY_ORDER[getMasteryLevel(a.correct, a.total)] - MASTERY_ORDER[getMasteryLevel(b.correct, b.total)]).map((item) => {
              const level = getMasteryLevel(item.correct, item.total);
              const accuracy = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
              return (
                <div key={item.anatomy_id} className="flex flex-wrap items-center gap-4 px-2 py-3 text-body transition-colors duration-150 hover:bg-surface-raised">
                  <span className="h-8 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate font-medium text-ink">{item.anatomy_id}</span>
                  <div className="flex items-center gap-3"><span className={`rounded-ds-sm px-2 py-1 text-caption font-medium ${getMasteryColor(level)}`}>{t(MASTERY_LABEL_KEYS[level])}</span><span className="min-w-12 text-right text-label text-ink-muted">{accuracy}%</span></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
