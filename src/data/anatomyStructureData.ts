import type { AnatomySystemId } from "../config/anatomySystems";
import { getAnatomyEntryById, getAnatomyEntryByOriginalName } from "../anatomy";
import type { AnatomyModelKey } from "../anatomy";
import { cardiovascularData, getCardiovascularStructure } from "./cardiovascular";
import { getRespiratoryStructure } from "./respiratory";
import { nervousStructures } from "./nervous";
import { skeletalStructures } from "./skeletal";
import { muscularStructures } from "./muscular";
import { digestiveStructures } from "./digestive";
import type { AnatomyStructureData } from "./educationalCollection";
export type { AnatomyStructureData } from "./educationalCollection";
const cardiovascularIdByOriginalName = new Map(
  Object.values(cardiovascularData).map(({ id }) => [id.replace(/_/g, " "), id])
);
const collections: Partial<Record<AnatomySystemId, typeof nervousStructures>> = {
  nervous: nervousStructures,
  skeletal: skeletalStructures,
  muscular: muscularStructures,
  digestive: digestiveStructures,
};
/** Consulta común: id del índice (anatomyId), nombre original exacto o id educativo existente. */
export function getAnatomyStructureData(
  system: AnatomySystemId,
  structureIdentifier: string,
  modelKey: AnatomyModelKey = "overview"
): AnatomyStructureData | null {
  // Primero intentar buscar por anatomyId (estable)
  const indexEntryById = getAnatomyEntryById(structureIdentifier);
  const indexEntry = (indexEntryById?.system === system ? indexEntryById : null)
    ?? getAnatomyEntryByOriginalName(system, structureIdentifier, modelKey)
    ?? getAnatomyEntryById(structureIdentifier);
  const educationalId = indexEntry?.system === system ? indexEntry.educationalId : undefined;
  const originalName = indexEntry?.system === system
    ? indexEntry.modelBindings.find((binding) => binding.modelKey === modelKey)?.originalName
    : structureIdentifier;
  if (system === "cardiovascular") {
    const id = educationalId
      ?? cardiovascularIdByOriginalName.get(originalName ?? "")
      ?? structureIdentifier;
    return getCardiovascularStructure(id);
  }
  if (system === "respiratory") {
    return (educationalId && getRespiratoryStructure(educationalId))
      || getRespiratoryStructure(originalName ?? structureIdentifier);
  }
  const collection = collections[system];
  if (!collection) return null;
  return (educationalId && collection.getById(educationalId))
    || (originalName && collection.getByOriginalName(originalName))
    || collection.getById(structureIdentifier);
}