/** Contenido académico; independiente de los IDs del índice y de Three.js. */
export type AnatomyStructureData = {
  id: string;
  name: string;
  type: string;
  description: string;
  function?: string;
  location?: string;
  relationships?: readonly string[];
};

export type EducationalStructureBinding = {
  data: AnatomyStructureData;
} & (
  | { originalName: string; originalNames?: never }
  | { originalNames: readonly string[]; originalName?: never }
);

export function createEducationalCollection(entries: readonly EducationalStructureBinding[]) {
  const byId = new Map<string, AnatomyStructureData>();
  const byOriginalName = new Map<string, AnatomyStructureData>();

  for (const entry of entries) {
    const { data } = entry;
    const originalNames = entry.originalNames ?? [entry.originalName];
    if (!originalNames.length || originalNames.some((name) => !name.trim()) ||
        !data.id.trim() || !data.name.trim() || !data.description.trim()) {
      throw new Error("Ficha educativa incompleta");
    }
    if (byId.has(data.id) || originalNames.some((name) => byOriginalName.has(name)) ||
        new Set(originalNames).size !== originalNames.length) {
      throw new Error(`Ficha educativa duplicada: ${data.id}`);
    }
    byId.set(data.id, data);
    for (const name of originalNames) byOriginalName.set(name, data);
  }

  return {
    getById: (id: string) => byId.get(id) ?? null,
    getByOriginalName: (name: string) => byOriginalName.get(name) ?? null,
  };
}
