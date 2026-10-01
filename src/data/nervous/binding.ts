import type { AnatomyStructureData, EducationalStructureBinding } from "../educationalCollection";

/** Agrupa los dos nodos laterales bajo una sola ficha conceptual. */
export function bilateral(
  originalBaseName: string,
  data: AnatomyStructureData
): EducationalStructureBinding {
  return {
    originalNames: [`${originalBaseName}.l`, `${originalBaseName}.r`],
    data,
  };
}
