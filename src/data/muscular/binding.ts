import type {
  AnatomyStructureData,
  EducationalStructureBinding,
} from "../educationalCollection";

/** Vincula los nodos izquierdo y derecho a una sola ficha conceptual. */
export function bilateral(
  originalBaseName: string,
  data: AnatomyStructureData
): EducationalStructureBinding {
  return {
    originalNames: [`${originalBaseName}.l`, `${originalBaseName}.r`],
    data,
  };
}

/** Vincula varias estructuras exactas del GLB a una ficha compartida. */
export function grouped(
  originalNames: readonly string[],
  data: AnatomyStructureData
): EducationalStructureBinding {
  return { originalNames, data };
}

/** Expande conceptos bilaterales sin inferir nombres distintos de .l y .r. */
export function bilateralGroup(
  originalBaseNames: readonly string[],
  data: AnatomyStructureData
): EducationalStructureBinding {
  return grouped(
    originalBaseNames.flatMap((name) => [`${name}.l`, `${name}.r`]),
    data
  );
}
