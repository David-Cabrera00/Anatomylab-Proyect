import type { AnatomySystemId } from "../config/anatomySystems";
import type { StudyGuide, StudyStep } from "../data/studyGuides";

type StudyViewProps = {
  system: AnatomySystemId;
  guide: StudyGuide | undefined;
  currentStep: StudyStep | undefined;
  stepIndex: number;
  progress: number;
  isActive: boolean;
  selectedStructureName: string | null;
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
  onStart,
  onPrevious,
  onNext,
  onFinish,
}: StudyViewProps) {
  if (!guide || !currentStep) {
    return (
      <section className="flex h-full items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Estudio</h1>
          <p className="mt-3 text-slate-600">No hay una guía de estudio disponible para {system}.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="h-full overflow-y-auto bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Modo estudio</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{guide.title}</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
            </div>
            {selectedStructureName && (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {selectedStructureName}
              </span>
            )}
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-slate-500">
              <span>Paso {stepIndex + 1} de {guide.steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estructura actual</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{currentStep.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{currentStep.instruction}</p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pista</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{currentStep.hint}</p>
            </div>
          </div>

          {!isActive ? (
            <button
              type="button"
              onClick={onStart}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Iniciar estudio
            </button>
          ) : (
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={stepIndex === 0}
                onClick={onPrevious}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Anterior
              </button>
              {stepIndex === guide.steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => onFinish(true)}
                  className="flex-1 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Finalizar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onNext}
                  className="flex-1 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Siguiente →
                </button>
              )}
              <button
                type="button"
                onClick={() => onFinish(false)}
                className="w-full rounded-lg px-4 py-2 text-sm text-slate-500 hover:bg-slate-50"
              >
                Salir del estudio
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
