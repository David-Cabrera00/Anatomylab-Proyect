import type { ReactNode } from "react";

import { anatomySystems, type AnatomySystemId } from "../config/anatomySystems";
import { getLocalizedText, systemTranslationKeys, useI18n } from "../i18n";
import type { StudyGuide, StudyStep } from "../data/studyGuides";
import { anatomyLocalizedDisplayNames } from "../data/anatomyLocalizedDisplayNames";
import { Button } from "../components/ui";

type StudyViewProps = {
  system: AnatomySystemId;
  guide: StudyGuide | undefined;
  currentStep: StudyStep | undefined;
  stepIndex: number;
  progress: number;
  isActive: boolean;
  selectedStructureName: string | null;
  viewer: ReactNode;
  viewerToolbar: ReactNode;
  onStart: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: (completed: boolean) => void;
};

export function StudyView({
  system,
  guide,
  currentStep,
  stepIndex,
  progress,
  isActive,
  selectedStructureName,
  viewer,
  viewerToolbar,
  onStart,
  onPrevious,
  onNext,
  onFinish,
}: StudyViewProps) {
  const { language, t } = useI18n();
  const config = anatomySystems[system];

  if (!guide || !currentStep) {
    return (
      <section className="flex h-full items-center justify-center overflow-y-auto bg-canvas px-6 py-8 lg:px-10">
        <div className="max-w-xl border-l-4 border-accent bg-surface px-6 py-6 shadow-ds-raised">
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-accent">{t("studyGuidedLearning")}</p>
          <h1 className="mt-3 text-title font-semibold tracking-tight text-ink">{t("studyTitle")}</h1>
          <p className="mt-2 text-body leading-6 text-ink-muted">{t("studyUnavailable")} {t(systemTranslationKeys[system])}.</p>
        </div>
      </section>
    );
  }

  const currentProgress = Math.min(100, Math.max(0, progress));
  const stepNumber = stepIndex + 1;
  const totalSteps = guide.steps.length;
  const isLastStep = stepIndex === totalSteps - 1;
  const systemLabel = t(systemTranslationKeys[system]);
  const localizedAnatomyName = anatomyLocalizedDisplayNames[currentStep.anatomyId];
  const activeStructure = localizedAnatomyName
    ? getLocalizedText(localizedAnatomyName, language)
    : language === "es"
      ? selectedStructureName ?? getLocalizedText(currentStep.title, language)
      : getLocalizedText(currentStep.title, language);

  return (
    <section className="h-full overflow-y-auto bg-canvas px-6 py-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[88rem] space-y-8">
        <header className="border-b border-line pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-caption font-semibold uppercase tracking-[0.16em] text-accent">{t("studySession")}</p>
            <div className="flex items-center gap-2 text-caption uppercase tracking-[0.12em] text-ink-subtle">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} aria-hidden="true" />
              {systemLabel}
            </div>
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-end lg:gap-10">
            <div className="min-w-0">
              <h1 className="max-w-3xl text-display font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2.35rem] sm:leading-[1.08]">{getLocalizedText(guide.title, language)}</h1>
              <p className="mt-3 max-w-3xl text-body leading-7 text-ink-muted">{getLocalizedText(guide.description, language)}</p>
            </div>
            <SessionProgress progress={currentProgress} stepNumber={stepNumber} totalSteps={totalSteps} label={t("studyStep")} ofLabel={t("studyOf")} />
          </div>
        </header>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.85fr)_minmax(20rem,1fr)] xl:gap-10">
          <section className="relative min-h-[28rem] min-w-0 overflow-hidden border border-line bg-surface shadow-ds-raised" aria-label={t("studyViewer")}>
            <div className="pointer-events-none absolute left-5 top-4 z-10 flex items-center gap-3 text-caption text-ink-subtle">
              <span className="font-semibold uppercase tracking-[0.14em] text-ink-muted">{systemLabel}</span>
              <span className="h-3 w-px bg-line-strong" aria-hidden="true" />
              <span>{t("anatomyGuidedFocus")}</span>
            </div>
            <div className="h-[28rem] min-h-0 w-full sm:h-[32rem]">{viewer}</div>
            {viewerToolbar}
          </section>

          <StudyContentPanel
            systemLabel={systemLabel}
            structure={activeStructure}
            currentStep={currentStep}
            language={language}
            stepNumber={stepNumber}
            totalSteps={totalSteps}
            progress={currentProgress}
            isActive={isActive}
            color={config.color}
          />
        </div>

        <footer className="border-t border-line pt-5">
          {!isActive ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-label text-ink-muted">{t("studyFollowGuide")}</p>
              <Button variant="primary" size="lg" onClick={onStart}>
                <PlayIcon />
                {t("studyStart")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => onFinish(false)}>
                <ExitIcon />
                {t("studyExit")}
              </Button>
              <div className="ml-auto flex flex-wrap gap-3">
                <Button variant="secondary" size="md" disabled={stepIndex === 0} onClick={onPrevious}>
                  <ArrowIcon direction="back" />
                  {t("studyPrevious")}
                </Button>
                {isLastStep ? (
                  <Button variant="primary" size="md" onClick={() => onFinish(true)}>
                    <CheckIcon />
                    {t("studyFinish")}
                  </Button>
                ) : (
                  <Button variant="primary" size="md" onClick={onNext}>
                    {t("studyNext")}
                    <ArrowIcon direction="forward" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </footer>
      </div>
    </section>
  );
}

function SessionProgress({ progress, stepNumber, totalSteps, label, ofLabel }: { progress: number; stepNumber: number; totalSteps: number; label: string; ofLabel: string }) {
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-4 text-label">
        <span className="font-semibold text-ink">{label} {stepNumber} {ofLabel} {totalSteps}</span>
        <span className="text-ink-muted">{Math.round(progress)}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-canvas-muted" role="progressbar" aria-label={`${Math.round(progress)}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function StudyContentPanel({ systemLabel, structure, currentStep, stepNumber, totalSteps, progress, isActive, language, color }: { systemLabel: string; structure: string; currentStep: StudyStep; stepNumber: number; totalSteps: number; progress: number; isActive: boolean; language: "es" | "en"; color: string }) {
  const { t } = useI18n();
  return (
    <aside className="min-w-0 border border-line bg-surface p-5 shadow-ds-raised sm:p-6" aria-label={t("studyContent")}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">{systemLabel}</p>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      </div>
      <p className="mt-5 text-caption uppercase tracking-[0.12em] text-ink-subtle">{t("studyCurrentStructure")}</p>
      <h2 className="mt-2 text-[1.65rem] font-semibold leading-tight tracking-tight text-ink">{structure}</h2>

      <div className="mt-7 border-l-2 border-accent bg-accent-soft/45 px-4 py-4">
        <div className="flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.14em] text-accent">
          <InstructionIcon />
          {t("studyInstruction")}
        </div>
        <p className="mt-2 text-body leading-6 text-ink">{getLocalizedText(currentStep.instruction, language)}</p>
      </div>

      {currentStep.hint ? (
        <div className="mt-5 flex gap-3 border-t border-line pt-5">
          <HintIcon />
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">{t("studyHint")}</p>
            <p className="mt-1 text-label leading-5 text-ink-muted">{getLocalizedText(currentStep.hint, language)}</p>
          </div>
        </div>
      ) : null}

      <dl className="mt-6 divide-y divide-line border-t border-line">
        <RailItem label={t("studyStep")} value={`${stepNumber} / ${totalSteps}`} />
        <RailItem label={t("studyStatus")} value={isActive ? t("studyInProgress") : t("studyReady")} />
      </dl>
      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-3"><span className="text-label text-ink-muted">{t("studyProgress")}</span><span className="text-heading font-semibold text-ink">{Math.round(progress)}%</span></div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-canvas-muted"><div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} /></div>
      </div>
    </aside>
  );
}

function RailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-3 first:pt-4 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <dt className="text-caption uppercase tracking-[0.1em] text-ink-subtle">{label}</dt>
      <dd className="text-label font-medium text-ink sm:text-right">{value}</dd>
    </div>
  );
}

function InstructionIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="M10 2v12M6 6l4-4 4 4M5 18h10" /></svg>;
}

function HintIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-ink-subtle" aria-hidden="true"><circle cx="10" cy="10" r="7" /><path d="M10 9v4M10 6.5v.2" /></svg>;
}

function PlayIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="m7 4 8 6-8 6V4Z" /></svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="m4 10 4 4 8-8" /></svg>;
}

function ExitIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="M8 3H4v14h4M12 6l4 4-4 4M8 10h8" /></svg>;
}

function ArrowIcon({ direction }: { direction: "back" | "forward" }) {
  return direction === "back"
    ? <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="M17 10H4M9 5l-5 5 5 5" /></svg>
    : <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>;
}
