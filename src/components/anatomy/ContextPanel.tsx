import type { AnatomyLayerId, AnatomySystemConfig, AnatomySystemId } from "../../config/anatomySystems";
import { anatomySystemList } from "../../config/anatomySystems";
import { systemTranslationKeys, useI18n } from "../../i18n";

type ContextPanelProps = {
  activeSystem: AnatomySystemId;
  activeConfig: AnatomySystemConfig;
  activeLayer: AnatomyLayerId;
  activeLayers: AnatomySystemConfig["layers"];
  studyMode: boolean;
  heartDetail: boolean;
  onChangeSystem: (system: AnatomySystemId) => void;
  onChangeLayer: (layer: AnatomyLayerId) => void;
  onReturnToOverview: () => void;
};

export function ContextPanel({
  activeSystem,
  activeConfig,
  activeLayer,
  activeLayers,
  studyMode,
  heartDetail,
  onChangeSystem,
  onChangeLayer,
  onReturnToOverview,
}: ContextPanelProps) {
  const { t } = useI18n();

  return (
    <aside className="flex w-[236px] min-w-0 shrink-0 flex-col overflow-y-auto border-r border-line bg-surface">
      <div className="border-b border-line px-4 py-4">
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">Contexto</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: activeConfig.color }} aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate text-label font-semibold text-ink">{activeConfig.fullName}</p>
            <p className="mt-0.5 truncate text-caption text-ink-muted">{activeConfig.label}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-3 py-3">
        <section>
          <p className="mb-1.5 px-1 text-caption font-semibold uppercase tracking-[0.12em] text-ink-subtle">{t("systemsTitle")}</p>
          <div className="space-y-0.5">
            {anatomySystemList.map((system) => {
              const selected = system.id === activeSystem;
              return (
                <button
                  key={system.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChangeSystem(system.id)}
                    className={`relative flex w-full items-center gap-2 rounded-ds-sm px-2.5 py-1.5 text-left text-label transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    selected
                      ? "bg-accent-soft font-semibold text-accent before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full before:bg-accent"
                      : "text-ink-muted hover:bg-canvas-muted hover:text-ink"
                  }`}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: system.color }} aria-hidden="true" />
                  <span className="min-w-0 truncate">{t(systemTranslationKeys[system.id])}</span>
                </button>
              );
            })}
          </div>
        </section>

        {heartDetail ? (
          <section className="border-t border-line pt-3">
            <button
              type="button"
              onClick={onReturnToOverview}
              className="w-full rounded-ds-sm px-2.5 py-1.5 text-left text-label font-medium text-ink-muted transition-colors duration-150 hover:bg-canvas-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              ← Volver al sistema
            </button>
            <p className="mt-1.5 px-2.5 text-caption text-ink-subtle">Corazón en detalle</p>
          </section>
        ) : null}

        {!studyMode && !heartDetail ? (
          <section className="border-t border-line pt-3">
            <p className="mb-1.5 px-1 text-caption font-semibold uppercase tracking-[0.12em] text-ink-subtle">Capas</p>
            <div className="space-y-0.5">
              {activeLayers.map((layer) => {
                const selected = layer.id === activeLayer;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onChangeLayer(layer.id)}
                    className={`w-full rounded-ds-sm px-2.5 py-1.5 text-left text-label transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected ? "bg-canvas-muted font-semibold text-ink" : "text-ink-muted hover:bg-canvas-muted hover:text-ink"}`}
                  >
                    {layer.label}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {activeConfig.legend.length > 0 && !heartDetail ? (
          <section className="border-t border-line pt-3">
            <p className="mb-2 px-1 text-caption font-semibold uppercase tracking-[0.12em] text-ink-subtle">Categorías</p>
            <div className="space-y-2 px-1">
              {activeConfig.legend.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-caption text-ink-muted">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                  <span className="min-w-0 truncate">{item.label}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </aside>
  );
}
