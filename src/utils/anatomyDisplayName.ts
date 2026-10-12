import { getAnatomyEntryById } from "../anatomy";
import { anatomyLocalizedDisplayNames } from "../data/anatomyLocalizedDisplayNames";
import { getLocalizedText, type Language } from "../i18n";

/** Returns the user-facing anatomical name while keeping stable IDs internal. */
export function getAnatomyDisplayName(anatomyId: string, language: Language): string {
  const localized = anatomyLocalizedDisplayNames[anatomyId];
  if (localized) return getLocalizedText(localized, language);

  const entry = getAnatomyEntryById(anatomyId);
  if (entry) return entry.displayName;

  return anatomyId;
}
