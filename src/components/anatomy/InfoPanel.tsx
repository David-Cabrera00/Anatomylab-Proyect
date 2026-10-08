import type { AnatomySystemConfig, AnatomySystemId } from "../../config/anatomySystems";
import type { AnatomyStructureData } from "../../data/anatomyStructureData";
import type { StudyGuide } from "../../data/studyGuides";
import { anatomyLocalizedDisplayNames } from "../../data/anatomyLocalizedDisplayNames";
import { Badge, Button, EmptyState, InfoSection } from "../ui";
import { getLocalizedText, systemFullNameTranslationKeys, systemTranslationKeys, useI18n } from "../../i18n";

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
  const { language, t } = useI18n();
  const localizedDisplayName = selectedAnatomyId
    ? getLocalizedText(anatomyLocalizedDisplayNames[selectedAnatomyId] ?? selectedDisplayName ?? "", language)
    : null;
  return (
    <aside className="flex w-[340px] min-w-0 shrink-0 flex-col overflow-y-auto border-l border-line bg-surface">
      <div className="border-b border-line px-5 pb-4 pt-4">
        <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">{t("anatomyInformation")}</p>

        {selectedAnatomyId ? (
          <div className="mt-4 min-w-0">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-ds-md text-heading font-semibold" style={{ backgroundColor: activeConfig.accentColor, color: activeConfig.color }} aria-hidden="true">
              {systemSymbol}
            </div>
            <p className="text-caption font-semibold uppercase tracking-[0.12em]" style={{ color: activeConfig.color }}>{t(systemTranslationKeys[activeConfig.id])}</p>
            <h2 className="mt-1 text-title font-semibold tracking-tight text-ink [overflow-wrap:anywhere]">{localizedDisplayName}</h2>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {selectedData && <Badge>{getLocalizedText(selectedData.type, language)}</Badge>}
              <span className="text-caption text-ink-muted">{t(systemFullNameTranslationKeys[activeConfig.id])}</span>
            </div>
            <p className="mt-2 text-caption text-ink-subtle">{t("anatomyView")}: {activeViewName}</p>
            {studyMode && activeStudyGuide && <Badge variant="warning" className="mt-3">{t("studyTitle")} {studyStepIndex + 1}/{activeStudyGuide.steps.length}</Badge>}
          </div>
        ) : null}
      </div>

      {selectedAnatomyId ? (
        <div className="flex flex-col gap-5 px-5 py-5">
          <InfoSection title={t("anatomyDescription")}>
            <p className="break-words">{selectedData ? getLocalizedText(selectedData.description, language) : `${t("anatomySelectedPrefix")} ${localizedDisplayName}. ${emptyDescription}`}</p>
          </InfoSection>
          {selectedData?.function && <InfoSection title={t("anatomyFunction")}><p>{getLocalizedText(selectedData.function, language)}</p></InfoSection>}
          {selectedData?.location && <InfoSection title={t("anatomyLocation")}><p>{getLocalizedText(selectedData.location, language)}</p></InfoSection>}
          {selectedData?.relationships && selectedData.relationships.length > 0 && (
            <InfoSection title={t("anatomyRelationships")}>
              <ul className="list-disc space-y-1 pl-5 marker:text-ink-subtle">
                {selectedData.relationships.map((relationship, index) => <li key={`${index}-${getLocalizedText(relationship, language)}`} className="break-words">{getLocalizedText(relationship, language)}</li>)}
              </ul>
            </InfoSection>
          )}
        </div>
      ) : (
        <div className="px-5 py-8"><EmptyState title={t("anatomySelectStructure")} description={emptyDescription} /></div>
      )}

      {selectedAnatomyId ? (
        <div className="sticky bottom-0 z-20 mt-auto shrink-0 border-t border-line bg-surface px-5 py-4">
          <p className="mb-2.5 text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">{t("anatomyActions")}</p>
          <div className="space-y-2">
            {canExploreHeart && <Button variant="secondary" onClick={onExploreHeart} className="w-full whitespace-normal">{t("anatomyExploreHeart")}</Button>}
            <Button variant="secondary" disabled={favoriteSaved} onClick={onSaveFavorite} className="w-full whitespace-normal">{favoriteSaved ? t("anatomySavedFavorite") : t("anatomySaveFavorite")}</Button>
            <Button variant="primary" className="w-full whitespace-normal">{t("anatomyAskAI")}</Button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
