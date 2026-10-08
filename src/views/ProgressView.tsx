import { useState } from "react";
import { useI18n, systemFullNameTranslationKeys } from "../i18n";

import { HistoryTab, ProgressTab } from "../components/learning";
import { anatomySystemList, type AnatomySystemId } from "../config/anatomySystems";

export function ProgressView({ system }: { system: AnatomySystemId }) {
  const { t } = useI18n();
  const activeSystem = anatomySystemList.find((item) => item.id === system);
  const [stats, setStats] = useState<MasteryStat[] | undefined>(undefined);
  const totalAnswers = stats?.reduce((sum, item) => sum + item.total, 0) ?? 0;
  const totalCorrect = stats?.reduce((sum, item) => sum + item.correct, 0) ?? 0;
  const accuracy = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

  return (
    <section className="h-full overflow-y-auto bg-canvas px-6 py-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[88rem] space-y-8">
        <header className="border-b border-line pb-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">{t("progressTitle")}</p>
            <span className="text-caption uppercase tracking-[0.14em] text-ink-subtle">AnatomyLab AI</span>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:items-end lg:gap-10">
            <div>
              <h1 className="max-w-3xl text-display font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2.45rem] sm:leading-[1.08]">{t("progressHeadline")}</h1>
              <p className="mt-3 max-w-2xl text-body leading-7 text-ink-muted">{t("progressIntro")}</p>
            </div>
            {activeSystem ? (
              <div className="flex items-center gap-3 border-l-2 pl-4" style={{ borderColor: activeSystem.color }}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: activeSystem.color }} aria-hidden="true" />
                <div><p className="text-caption uppercase tracking-[0.12em] text-ink-subtle">{t("progressActiveSystem")}</p><p className="mt-1 text-body font-semibold text-ink">{t(systemFullNameTranslationKeys[system])}</p></div>
              </div>
            ) : null}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.75fr)] lg:gap-10">
          <section aria-labelledby="overall-progress-title" className="min-w-0 border border-line bg-surface p-6 shadow-ds-raised sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">01</p><h2 id="overall-progress-title" className="mt-2 text-title font-semibold tracking-tight text-ink">{t("progressOverall")}</h2></div>
              <span className="text-caption uppercase tracking-[0.12em] text-ink-subtle">{t("progressActiveSystem")}</span>
            </div>
            <div className="mt-6"><GeneralSummary accuracy={accuracy} totalAnswers={totalAnswers} structures={stats?.length ?? 0} /></div>
          </section>

          <SystemIndex activeSystem={system} />
        </div>

        <section aria-labelledby="mastery-title" className="border-t border-line pt-7">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">02</p><h2 id="mastery-title" className="mt-2 text-title font-semibold tracking-tight text-ink">{t("progressMastery")}</h2></div><p className="max-w-md text-body text-ink-muted">{t("progressMasteryIntro")}</p></div>
          <div className="mt-5 border border-line bg-surface p-5 shadow-ds-raised sm:p-6"><ProgressTab system={system} stats={stats} onStatsLoaded={setStats} showSummary={false} /></div>
        </section>

        <section aria-labelledby="history-title" className="border-t border-line pt-7">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">03</p><h2 id="history-title" className="mt-2 text-title font-semibold tracking-tight text-ink">{t("progressHistory")}</h2></div><p className="max-w-md text-body text-ink-muted">{t("progressHistoryIntro")}</p></div>
          <div className="mt-5 border border-line bg-surface p-5 shadow-ds-raised sm:p-6"><HistoryTab system={system} /></div>
        </section>
      </div>
    </section>
  );
}

type MasteryStat = { anatomy_id: string; correct: number; total: number };

function GeneralSummary({ accuracy, totalAnswers, structures }: { accuracy: number; totalAnswers: number; structures: number }) {
  const { t } = useI18n();
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4"><span className="text-[3.5rem] font-semibold leading-none tracking-tight text-ink">{accuracy}%</span><span className="text-label text-ink-muted">{totalAnswers} {t("progressAnswered")}</span></div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-canvas-muted" role="progressbar" aria-label={`${accuracy}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={accuracy}><div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${accuracy}%` }} /></div>
      <p className="mt-4 max-w-xl text-body leading-6 text-ink-muted">{totalAnswers > 0 ? `${structures} ${t("progressActivity")}` : t("progressEmpty")}</p>
    </div>
  );
}

function SystemIndex({ activeSystem }: { activeSystem: AnatomySystemId }) {
  const { t } = useI18n();
  return (
    <aside className="border border-line bg-surface p-5 shadow-ds-raised" aria-label={t("systemsTitle")}>
      <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">{t("systemsTitle")}</p>
      <div className="mt-4 divide-y divide-line">
        {anatomySystemList.map((system) => {
          const isActive = system.id === activeSystem;
          return (
            <div key={system.id} className={`flex items-center gap-3 py-3 first:pt-0 last:pb-0 ${isActive ? "text-ink" : "text-ink-muted"}`}>
              <span className="h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: system.color }} aria-hidden="true" />
              <span className="min-w-0 flex-1"><span className="block text-body font-semibold">{t(systemFullNameTranslationKeys[system.id])}</span><span className="mt-0.5 block text-caption">{isActive ? t("progressActiveSystem") : t("progressAvailable")}</span></span>
              <SystemMark active={isActive} />
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function SystemMark({ active }: { active: boolean }) {
  const { t } = useI18n();
  return active
    ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-accent" aria-label={t("progressActiveSystem")}><path d="m4 10 4 4 8-8" /></svg>
    : <span className="h-1.5 w-1.5 rounded-full bg-line-strong" aria-hidden="true" />;
}
