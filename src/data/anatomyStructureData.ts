import type { AnatomySystemId } from "../config/anatomySystems";
import { getAnatomyEntryById, getAnatomyEntryByOriginalName } from "../anatomy";
import type { AnatomyModelKey } from "../anatomy";
import { getRespiratoryStructure } from "./respiratory";
import { nervousStructures } from "./nervous";
import { skeletalStructures } from "./skeletal";
import { muscularStructures } from "./muscular";
import { digestiveStructures } from "./digestive";
import { CSVEducationalLoader } from "./csvLoader";
import type { AnatomyStructureData } from "./educationalCollection";
export type { AnatomyStructureData } from "./educationalCollection";

const collections: Partial<Record<AnatomySystemId, typeof nervousStructures>> = {
  nervous: nervousStructures,
  skeletal: skeletalStructures,
  muscular: muscularStructures,
  digestive: digestiveStructures,
};

/** Consulta común: id del índice (anatomyId), nombre original exacto o id educativo existente. */
export async function getAnatomyStructureData(
  system: AnatomySystemId,
  structureIdentifier: string,
  modelKey: AnatomyModelKey = "overview"
): Promise<AnatomyStructureData | null> {
  // Para cardiovascular, usar el loader CSV que tiene 668+ estructuras
  if (system === "cardiovascular") {
    return CSVEducationalLoader.getStructureData(structureIdentifier);
  }

  // Primero intentar buscar por anatomyId (estable)
  const indexEntryById = getAnatomyEntryById(structureIdentifier);
  const indexEntry = (indexEntryById?.system === system ? indexEntryById : null)
    ?? getAnatomyEntryByOriginalName(system, structureIdentifier, modelKey)
    ?? getAnatomyEntryById(structureIdentifier);
  const educationalId = indexEntry?.system === system ? indexEntry.educationalId : undefined;
  const originalName = indexEntry?.system === system
    ? indexEntry.modelBindings.find((binding) => binding.modelKey === modelKey)?.originalName
    : structureIdentifier;

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