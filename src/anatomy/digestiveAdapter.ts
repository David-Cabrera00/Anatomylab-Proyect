import { getSystemStructureName } from "../utils/systemNames";
import { digestiveEducationalGroups, digestivePilotEntries } from "../data/digestive";
import { digestiveStructures } from "../data/digestive";
import { createAnatomyEntry } from "./createAnatomyEntry";
import type { AnatomyStructureIndexEntry } from "./types";
import type { AnatomyStructureData } from "../data/educationalCollection";
import { digestiveModelCatalog } from "./catalogs/digestiveModelCatalog";
import { digestiveStableIdByOriginalName } from "./metadata/digestiveStableIds";

const catalogNames = new Set(digestiveModelCatalog.map((item) => item.originalName));

const regionByName: Record<string, string> = {
  "Glándula parótida.l": "Cabeza", "Glándula parótida.r": "Cabeza",
  "Glándula submandibular.l": "Cabeza", "Glándula submandibular.r": "Cabeza",
  "Glándula sublingual.l": "Cabeza", "Glándula sublingual.r": "Cabeza", Lengua: "Cabeza",
  Hígado: "Abdomen", "Vesícula biliar": "Abdomen", Páncreas: "Abdomen", Gingiva: "Cabeza",
};

function laterality(originalName: string): "left" | "right" | "midline" {
  return originalName.endsWith(".l") ? "left" : originalName.endsWith(".r") ? "right" : "midline";
}
function layerFor(originalName: string): "digestive-tract" | "digestive-accessory" {
  return /^(Glándula|Hígado|Vesícula|Páncreas|Conducto|Lengua|Gingiva)/.test(originalName) ? "digestive-accessory" : "digestive-tract";
}

export function createDigestiveAnatomyEntries(
  catalogEntries: readonly (typeof digestiveModelCatalog)[number][] = digestiveModelCatalog
): readonly AnatomyStructureIndexEntry[] {
  const catalogEntriesByName = new Map<string, (typeof digestiveModelCatalog)[number]>(
    catalogEntries.map((item) => [item.originalName, item])
  );
  const bindings: Array<{ originalName: string; data: AnatomyStructureData | undefined }> = [...digestivePilotEntries, ...digestiveEducationalGroups.tract, ...digestiveEducationalGroups.accessory].flatMap((entry) => {
    const names = entry.originalNames ?? [entry.originalName];
    return names.map((originalName) => ({ originalName, data: entry.data }));
  });
  bindings.push({ originalName: "Gingiva", data: undefined });
  return bindings.map(({ originalName, data }) => {
    const catalog = catalogEntriesByName.get(originalName);
    if (!catalog) throw new Error(`Nombre digestivo ausente del catálogo: ${originalName}`);
    const side = laterality(originalName);
    const displayName = originalName === "Colon sigmoideo"
      ? "Colon sigmoide"
      : getSystemStructureName("digestive", originalName);

    const stableId = (digestiveStableIdByOriginalName as Record<string, string | undefined>)[originalName];
    if (!stableId) {
      throw new Error(`ID persistente digestivo no encontrado para: ${originalName}`);
    }

    return createAnatomyEntry({
      id: stableId,
      system: "digestive", modelBindings: [catalog],
      displayName,
      layer: layerFor(originalName), region: regionByName[originalName] ?? "Abdomen",
      laterality: side, structureType: data?.type ?? "Estructura anatómica",
      keywords: [...new Set([data?.name ?? originalName, originalName.replace(/\.(l|r)$/i, "")])],
      educationalId: data?.id,
    });
  });
}

export function validateDigestiveAnatomyEntries(entries: readonly AnatomyStructureIndexEntry[]): void {
  const ids = new Set<string>(); const bindings = new Set<string>();
  for (const entry of entries) {
    if (ids.has(entry.id) || !entry.id.startsWith("digestive.")) throw new Error(`ID digestivo duplicado o inválido: ${entry.id}`); ids.add(entry.id);
    for (const binding of entry.modelBindings) {
      const key = `${binding.modelKey}:${binding.originalName}`;
      if (bindings.has(key) || !catalogNames.has(binding.originalName)) throw new Error(`Binding digestivo inválido: ${key}`); bindings.add(key);
      const registeredId = (digestiveStableIdByOriginalName as Record<string, string | undefined>)[binding.originalName];
      if (registeredId !== entry.id) throw new Error(`ID persistente digestivo incoherente: ${binding.originalName}`);
      if (entry.layer !== layerFor(binding.originalName)) throw new Error(`Layer digestiva incoherente: ${binding.originalName}`);
      if (binding.originalName.endsWith(".l") && entry.laterality !== "left") throw new Error(`Lateralidad inválida: ${entry.id}`);
      if (binding.originalName.endsWith(".r") && entry.laterality !== "right") throw new Error(`Lateralidad inválida: ${entry.id}`);
    }
    if (entry.educationalId !== undefined && !digestiveStructures.getById(entry.educationalId)) {
      throw new Error(`Ficha educativa digestiva inexistente: ${entry.educationalId}`);
    }
  }
}


