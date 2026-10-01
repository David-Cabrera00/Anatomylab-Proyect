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
  originalName: string;
  data: AnatomyStructureData;
};

export function createEducationalCollection(entries: readonly EducationalStructureBinding[]) {
  const byId = new Map<string, AnatomyStructureData>();
  const byOriginalName = new Map<string, AnatomyStructureData>();

  for (const { originalName, data } of entries) {
    if (!originalName.trim() || !data.id.trim() || !data.name.trim() || !data.description.trim()) {
      throw new Error("Ficha educativa incompleta");
    }
    if (byId.has(data.id) || byOriginalName.has(originalName)) {
      throw new Error(`Ficha educativa duplicada: ${data.id} / ${originalName}`);
    }
    byId.set(data.id, data);
    byOriginalName.set(originalName, data);
  }

  return {
    getById: (id: string) => byId.get(id) ?? null,
    getByOriginalName: (name: string) => byOriginalName.get(name) ?? null,
  };
}
