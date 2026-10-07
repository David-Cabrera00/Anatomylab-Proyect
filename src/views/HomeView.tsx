import { useEffect, useState, type ReactNode } from "react";

import type { AnatomySystemId } from "../config/anatomySystems";
import { systemTranslationKeys, useI18n } from "../i18n";
import { dbGetMasteryStats } from "../utils/db";

type HomeSystem = {
  id: AnatomySystemId;
  label: string;
  fullName: string;
};

type HomeViewProps = {
  systems: readonly HomeSystem[];
  search: ReactNode;
  onOpenSystem: (system: AnatomySystemId) => void;
  onOpenAnatomy: () => void;
};

type ProgressSummary = {
  answered: number;
  correct: number;
  structures: number;
};

export function HomeView({ systems, search, onOpenSystem, onOpenAnatomy }: HomeViewProps) {
  const { t } = useI18n();
  const [progress, setProgress] = useState<ProgressSummary | null>(null);

  useEffect(() => {
    let cancelled = false;

    void Promise.all(
      systems.map(async (system) => {
        try {
          return await dbGetMasteryStats(system.id);
        } catch {
          return [];
        }
      }),
    ).then((statsBySystem) => {
      if (cancelled) return;

      const stats = statsBySystem.flat();
      setProgress({
        answered: stats.reduce((sum, item) => sum + item.total, 0),
        correct: stats.reduce((sum, item) => sum + item.correct, 0),
        structures: stats.length,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [systems]);

  const accuracy = progress && progress.answered > 0
    ? Math.round((progress.correct / progress.answered) * 100)
    : 0;

  return (
    <section className="h-full overflow-y-auto bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">{t("appName")}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{t("homeWelcome")}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            {t("homeIntro")}
          </p>
          <div className="mt-5 max-w-xl">{search}</div>
          <button
            type="button"
            onClick={onOpenAnatomy}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            {t("homeOpenAnatomy")}
          </button>
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{t("homeContinue")}</h2>
              <p className="mt-1 text-sm text-slate-500">{t("homeChooseSystem")}</p>
            </div>
            <button
              type="button"
              onClick={onOpenAnatomy}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              {t("homeViewAnatomy")}
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((system) => (
              <button
                key={system.id}
                type="button"
                onClick={() => onOpenSystem(system.id)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-sm"
              >
                <span className="text-base font-semibold text-slate-900">{t(systemTranslationKeys[system.id])}</span>
                <span className="mt-4 block text-sm font-medium text-slate-700">{t("homeOpenSystem")} \u2192</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">{t("homeGeneralProgress")}</h2>
          {progress && progress.answered > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <SummaryItem label={t("homeAnswered")} value={progress.answered.toString()} />
              <SummaryItem label={t("homeAccuracy")} value={`${accuracy}%`} />
              <SummaryItem label={t("homeStructures")} value={progress.structures.toString()} />
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-500">
              {t("homeNoProgress")}
            </p>
          )}
        </section>
      </div>
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}
