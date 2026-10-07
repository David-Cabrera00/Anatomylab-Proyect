import { useEffect, useMemo, useState, type ReactNode } from "react";

import { anatomySystems, type AnatomySystemId } from "../config/anatomySystems";
import { systemTranslationKeys, useI18n, type Language } from "../i18n";
import { Button, EmptyState } from "../components/ui";
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

type MasteryStat = { anatomy_id: string; correct: number; total: number };
type SystemProgress = { answered: number; correct: number; structures: number };

const systemDescriptions: Record<Language, Record<AnatomySystemId, string>> = {
  es: {
    cardiovascular: "Corazón y circulación",
    respiratory: "Pulmones y vías respiratorias",
    nervous: "Cerebro, nervios y sentidos",
    skeletal: "Huesos y soporte corporal",
    muscular: "Músculos y movimiento",
    digestive: "Órganos y digestión",
  },
  en: {
    cardiovascular: "Heart and circulation",
    respiratory: "Lungs and airways",
    nervous: "Brain, nerves, and senses",
    skeletal: "Bones and body support",
    muscular: "Muscles and movement",
    digestive: "Organs and digestion",
  },
};

export function HomeView({ systems, search, onOpenSystem, onOpenAnatomy }: HomeViewProps) {
  const { language, t } = useI18n();
  const [progressBySystem, setProgressBySystem] = useState<Partial<Record<AnatomySystemId, SystemProgress>>>({});

  useEffect(() => {
    let cancelled = false;

    void Promise.all(
      systems.map(async (system) => {
        try {
          const stats = await dbGetMasteryStats(system.id) as MasteryStat[];
          return [system.id, summarizeStats(stats)] as const;
        } catch {
          return [system.id, null] as const;
        }
      }),
    ).then((entries) => {
      if (cancelled) return;
      const nextProgress: Partial<Record<AnatomySystemId, SystemProgress>> = {};
      for (const [systemId, summary] of entries) {
        if (summary) nextProgress[systemId] = summary;
      }
      setProgressBySystem(nextProgress);
    });

    return () => { cancelled = true; };
  }, [systems]);

  const progress = useMemo(() => summarizeProgress(Object.values(progressBySystem)), [progressBySystem]);
  const continueSystem = systems.find((system) => (progressBySystem[system.id]?.answered ?? 0) > 0);
  const continueProgress = continueSystem ? progressBySystem[continueSystem.id] : undefined;

  return (
    <section className="h-full overflow-y-auto bg-canvas px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="max-w-4xl">
          <p className="text-label font-semibold uppercase tracking-[0.16em] text-accent">{t("appName")}</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:items-end">
            <div>
              <h1 className="max-w-2xl text-display font-semibold tracking-tight text-ink">{t("homeWelcome")}</h1>
              <p className="mt-4 max-w-2xl text-body leading-7 text-ink-muted">{t("homeIntro")}</p>
            </div>
            <div className="min-w-0">{search}</div>
          </div>
        </header>

        <section aria-labelledby="continue-studying-title" className="border-y border-line py-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">01</p>
              <h2 id="continue-studying-title" className="mt-2 text-title font-semibold text-ink">{t("homeContinue")}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onOpenAnatomy}>
              {t("homeViewAnatomy")}<ArrowIcon />
            </Button>
          </div>

          {continueSystem && continueProgress ? (
            <ContinueStudy
              system={continueSystem}
              progress={continueProgress}
              description={systemDescriptions[language][continueSystem.id]}
              onOpen={() => onOpenSystem(continueSystem.id)}
            />
          ) : (
            <div className="mt-6 flex flex-col justify-between gap-4 rounded-ds-lg bg-surface-raised p-4 sm:flex-row sm:items-center">
              <EmptyState
                title={t("homeNoProgress")}
                description={t("homeChooseSystem")}
                className="max-w-2xl [&>div]:h-10 [&>div]:w-10 [&>div]:rounded-ds-sm [&>h2]:mt-3 [&>h2]:text-body [&>p]:mt-1 [&>p]:text-label"
              />
              <Button variant="primary" size="md" onClick={onOpenAnatomy}>
                {t("homeOpenAnatomy")}<ArrowIcon />
              </Button>
            </div>
          )}
        </section>

        <section aria-labelledby="explore-systems-title">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">02</p>
              <h2 id="explore-systems-title" className="mt-2 text-title font-semibold text-ink">{t("systemsTitle")}</h2>
            </div>
            <p className="max-w-sm text-right text-body text-ink-muted">{t("homeChooseSystem")}</p>
          </div>
          <div className="grid gap-x-10 gap-y-2 md:grid-cols-2">
            {systems.map((system) => (
              <AnatomySystemItem
                key={system.id}
                system={system}
                description={systemDescriptions[language][system.id]}
                onOpen={() => onOpenSystem(system.id)}
              />
            ))}
          </div>
        </section>

        <ProgressSummary progress={progress} onOpen={onOpenAnatomy} />
      </div>
    </section>
  );
}

function ContinueStudy({ system, progress, description, onOpen }: { system: HomeSystem; progress: SystemProgress; description: string; onOpen: () => void }) {
  const { t } = useI18n();
  const accuracy = progress.answered > 0 ? Math.round((progress.correct / progress.answered) * 100) : 0;
  const config = anatomySystems[system.id];

  return (
    <div className="mt-8 grid gap-8 rounded-ds-lg bg-surface-raised p-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-center lg:p-8">
      <div className="min-w-0">
        <div className="flex items-start gap-4">
          <SystemIcon system={system.id} color={config.color} />
          <div className="min-w-0">
            <p className="text-caption font-semibold uppercase tracking-[0.12em] text-ink-subtle">{t(systemTranslationKeys[system.id])}</p>
            <h3 className="mt-1 text-heading font-semibold text-ink">{system.fullName}</h3>
            <p className="mt-2 text-body text-ink-muted">{description}</p>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-label text-ink-muted">
          <span>{progress.answered} {t("homeAnswered").toLowerCase()}</span>
          <span>{accuracy}% {t("homeAccuracy").toLowerCase()}</span>
          <Button variant="primary" size="sm" onClick={onOpen}>{t("homeOpenSystem")}<ArrowIcon /></Button>
        </div>
      </div>
      <div className="hidden h-40 rounded-ds-md border border-line bg-canvas-muted lg:block" aria-hidden="true">
        <div className="flex h-full items-center justify-center text-ink-subtle"><SystemIcon system={system.id} color={config.color} size="large" /></div>
      </div>
    </div>
  );
}

function AnatomySystemItem({ system, description, onOpen }: { system: HomeSystem; description: string; onOpen: () => void }) {
  const { t } = useI18n();
  const config = anatomySystems[system.id];

  return (
    <button type="button" onClick={onOpen} className="group relative flex min-w-0 items-center gap-4 border-b border-line px-2 py-5 text-left transition-colors duration-150 hover:bg-surface-raised focus-visible:z-10 focus-visible:bg-accent-soft/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-accent-soft">
      <span className="h-10 w-1 shrink-0 rounded-full" style={{ backgroundColor: config.color }} aria-hidden="true" />
      <SystemIcon system={system.id} color={config.color} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-heading font-semibold text-ink">{t(systemTranslationKeys[system.id])}</span>
        <span className="mt-1 block truncate text-label text-ink-muted">{description}</span>
      </span>
      <ArrowIcon className="shrink-0 text-ink-subtle transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent" />
    </button>
  );
}

function ProgressSummary({ progress, onOpen }: { progress: SystemProgress | null; onOpen: () => void }) {
  const { t } = useI18n();
  const accuracy = progress && progress.answered > 0 ? Math.round((progress.correct / progress.answered) * 100) : 0;

  return (
    <section aria-labelledby="progress-summary-title" className="border-t border-line pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">03</p><h2 id="progress-summary-title" className="mt-2 text-title font-semibold text-ink">{t("homeGeneralProgress")}</h2></div>
        <Button variant="ghost" size="sm" onClick={onOpen}>{t("navProgress")}<ArrowIcon /></Button>
      </div>
      {progress && progress.answered > 0 ? (
        <div className="mt-6 max-w-2xl">
          <div className="flex items-baseline justify-between gap-4"><span className="text-heading font-semibold text-ink">{accuracy}%</span><span className="text-label text-ink-muted">{progress.structures} {t("homeStructures").toLowerCase()}</span></div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-canvas-muted" aria-label={`${accuracy}%`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={accuracy}><div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${accuracy}%` }} /></div>
        </div>
      ) : (
        <div className="mt-6 max-w-2xl">
          <div className="h-2 overflow-hidden rounded-full bg-canvas-muted" aria-label="0%" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
            <div className="h-full w-0 rounded-full bg-accent" />
          </div>
          <p className="mt-3 text-body text-ink-muted">{t("homeNoProgress")}</p>
        </div>
      )}
    </section>
  );
}

function summarizeStats(stats: MasteryStat[]): SystemProgress {
  return stats.reduce((summary, item) => ({ answered: summary.answered + item.total, correct: summary.correct + item.correct, structures: summary.structures + 1 }), { answered: 0, correct: 0, structures: 0 });
}

function summarizeProgress(progress: SystemProgress[]): SystemProgress | null {
  if (!progress.length) return null;
  return progress.reduce((summary, item) => ({ answered: summary.answered + item.answered, correct: summary.correct + item.correct, structures: summary.structures + item.structures }), { answered: 0, correct: 0, structures: 0 });
}

function SystemIcon({ system, color, size = "small" }: { system: AnatomySystemId; color: string; size?: "small" | "large" }) {
  const dimensions = size === "large" ? "h-20 w-20" : "h-7 w-7";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${dimensions}`} style={{ color }} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
        {system === "cardiovascular" && <><path d="M16 27S5 20.5 5 12.5A5.5 5.5 0 0 1 16 10a5.5 5.5 0 0 1 11 2.5C27 20.5 16 27 16 27Z" /><path d="M10 15h4l2-4 2 8 2-4h3" /></>}
        {system === "respiratory" && <><path d="M16 7v18M16 12c-2-3-6-4-8-1-2.5 3.5-3 9.5-1 12 1.5 2 5 1 7-1M16 12c2-3 6-4 8-1 2.5 3.5 3 9.5 1 12-1.5 2-5 1-7-1" /><path d="M16 7V4" /></>}
        {system === "nervous" && <><circle cx="16" cy="12" r="7" /><path d="M12 19c-2 2-2 5 0 7M20 19c2 2 2 5 0 7M9 10c-2-1-4 0-4 2s2 3 4 3M23 10c2-1 4 0 4 2s-2 3-4 3M16 19v8" /></>}
        {system === "skeletal" && <><path d="M12 5a2.5 2.5 0 1 0-3.5 3.5l5 5-5 5A2.5 2.5 0 1 0 12 22l4-4 4 4a2.5 2.5 0 1 0 3.5-3.5l-5-5 5-5A2.5 2.5 0 1 0 20 5l-4 4-4-4Z" /><path d="M16 9v9" /></>}
        {system === "muscular" && <><path d="M10 6c2 2 2 5 0 8s-2 7 2 11M22 6c-2 2-2 5 0 8s2 7-2 11M10 6h12M8 13h16M10 25h12" /></>}
        {system === "digestive" && <><path d="M11 5v6c0 2 1 3 3 3h4c2 0 3 1 3 3v3c0 4-2 6-5 6s-5-2-5-6v-3c0-2-1-3-3-3H6" /><path d="M11 5a2 2 0 1 0-4 0v2M21 5a2 2 0 1 0-4 0v2" /></>}
      </svg>
    </span>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-4 w-4 ${className}`}><path d="M3 10h13M11 5l5 5-5 5" /></svg>;
}
