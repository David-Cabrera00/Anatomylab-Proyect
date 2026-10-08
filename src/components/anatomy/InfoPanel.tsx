import type { AnatomySystemConfig, AnatomySystemId } from "../../config/anatomySystems";
import type { AnatomyStructureData } from "../../data/anatomyStructureData";
import type { StudyGuide } from "../../data/studyGuides";
import { Badge, Button, EmptyState, InfoSection } from "../ui";

type InfoPanelProps = {
  activeSystem: AnatomySystemId;
  activeConfig: AnatomySystemConfig;
  activeViewName: string;
  selectedAnatomyId: string | null;
  selectedDisplayName: string | null;
  selectedData: AnatomyStructureData | null;
  systemSymbol: string;
  emptyDescription: string;
  studyMode: boolean;
  activeStudyGuide?: StudyGuide;
  studyStepIndex: number;
  canExploreHeart: boolean;
  onExploreHeart: () => void;
  favoriteSaved: boolean;
  onSaveFavorite: () => void;
};

export function InfoPanel({
  activeConfig,
  activeViewName,
  selectedAnatomyId,
  selectedDisplayName,
  selectedData,
  systemSymbol,
  emptyDescription,
  studyMode,
  activeStudyGuide,
  studyStepIndex,
  canExploreHeart,
  onExploreHeart,
  favoriteSaved,
  onSaveFavorite,
}: InfoPanelProps) {
  return (
    <aside className="flex w-[340px] min-w-0 shrink-0 flex-col overflow-y-auto border-l border-line bg-surface">
      <div className="border-b border-line px-5 pb-4 pt-4">
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">Información anatómica</p>

        {selectedAnatomyId ? (
          <div className="mt-4 min-w-0">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-ds-md text-heading font-semibold" style={{ backgroundColor: activeConfig.accentColor, color: activeConfig.color }} aria-hidden="true">
              {systemSymbol}
            </div>
            <p className="text-caption font-semibold uppercase tracking-[0.12em]" style={{ color: activeConfig.color }}>{activeConfig.label}</p>
            <h2 className="mt-1 text-title font-semibold tracking-tight text-ink [overflow-wrap:anywhere]">{selectedDisplayName}</h2>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {selectedData && <Badge>{selectedData.type}</Badge>}
              <span className="text-caption text-ink-muted">{activeConfig.fullName}</span>
            </div>
            <p className="mt-2 text-caption text-ink-subtle">Vista: {activeViewName}</p>
            {studyMode && activeStudyGuide && <Badge variant="warning" className="mt-3">Estudio {studyStepIndex + 1}/{activeStudyGuide.steps.length}</Badge>}
          </div>
        ) : null}
      </div>

      {selectedAnatomyId ? (
        <div className="flex flex-col gap-5 px-5 py-5">
          <InfoSection title="Descripción">
            <p className="break-words">{selectedData?.description ?? `Has seleccionado ${selectedDisplayName}. ${emptyDescription}`}</p>
          </InfoSection>
          {selectedData?.function && <InfoSection title="Función"><p>{selectedData.function}</p></InfoSection>}
          {selectedData?.location && <InfoSection title="Ubicación"><p>{selectedData.location}</p></InfoSection>}
          {selectedData?.relationships && selectedData.relationships.length > 0 && (
            <InfoSection title="Relaciones anatómicas">
              <ul className="list-disc space-y-1 pl-5 marker:text-ink-subtle">
                {selectedData.relationships.map((relationship) => <li key={relationship} className="break-words">{relationship}</li>)}
              </ul>
            </InfoSection>
          )}
        </div>
      ) : (
        <div className="px-5 py-8"><EmptyState title="Selecciona una estructura" description={emptyDescription} /></div>
      )}

      {selectedAnatomyId ? (
        <div className="sticky bottom-0 z-20 mt-auto shrink-0 border-t border-line bg-surface px-5 py-4">
          <p className="mb-2.5 text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">Acciones</p>
          <div className="space-y-2">
            {canExploreHeart && <Button variant="secondary" onClick={onExploreHeart} className="w-full whitespace-normal">Explorar corazón en detalle →</Button>}
            <Button variant="secondary" disabled={favoriteSaved} onClick={onSaveFavorite} className="w-full whitespace-normal">{favoriteSaved ? "Guardado en favoritos" : "Guardar en favoritos"}</Button>
            <Button variant="primary" className="w-full whitespace-normal">Preguntar a Anatomy AI</Button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
