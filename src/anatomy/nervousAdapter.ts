import type { AnatomyStructureIndexEntry } from "./types";
import type { AnatomyStructureData } from "../data/educationalCollection";
import { nervousEducationalGroups, nervousStructures } from "../data/nervous";
import { getSystemStructureName } from "../utils/systemNames";
import { createAnatomyEntry } from "./createAnatomyEntry";
import { nervousModelCatalog } from "./catalogs/nervousModelCatalog";
import { nervousStableIdByOriginalName } from "./metadata/nervousStableIds";

const catalogByName = new Map(nervousModelCatalog.map((item) => [item.originalName, item]));
const regionByName: Record<string, string> = { "Plexo coroideo.l": "Encéfalo", "Plexo coroideo.r": "Encéfalo" };

function side(n: string): "left" | "right" | "midline" {
  return n.endsWith(".l") ? "left" : n.endsWith(".r") ? "right" : "midline";
}

function layer(n: string): "nervous-central" | "nervous-peripheral" | "nervous-sense" {
  return /ojo|retina|córnea|cornea|iris|esclera|oído|oreja|olfatorio/i.test(n)
    ? "nervous-sense"
    : /nervio|plexo|ganglio|raíz|raiz|fascículo|fasciculo|tronco/i.test(n)
      ? "nervous-peripheral"
      : "nervous-central";
}

export function createNervousAnatomyEntries(
  catalogEntries: readonly (typeof nervousModelCatalog)[number][] = nervousModelCatalog
): readonly AnatomyStructureIndexEntry[] {
  const catalogEntriesByName = new Map(
    catalogEntries.map((item) => [item.originalName, item])
  );
  const bindings: Array<{ originalName: string; data: AnatomyStructureData | undefined }> = [
    ...Object.values(nervousEducationalGroups).flat(),
    { originalNames: ["Plexo coroideo.l", "Plexo coroideo.r"], data: undefined } as any,
  ].flatMap((e: any) =>
    (e.originalNames ?? [e.originalName]).map((originalName: string) => ({
      originalName,
      data: e.data,
    }))
  );

  const byOriginalName = new Map<string, { originalName: string; data: AnatomyStructureData | undefined }>();
  for (const binding of bindings) {
    const previous = byOriginalName.get(binding.originalName);
    if (previous && previous.data?.id !== binding.data?.id) {
      throw new Error(`Conflicto educativo nervioso para ${binding.originalName}`);
    }
    if (!previous) byOriginalName.set(binding.originalName, binding);
  }

  return [...byOriginalName.values()].map(({ originalName, data }) => {
    const modelBinding = catalogEntriesByName.get(originalName);
    if (!modelBinding) {
      throw new Error(`OriginalName nervioso ausente del catálogo: ${originalName}`);
    }
    const resolvedBinding = modelBinding;
    const s = side(originalName);

    const stableId = (nervousStableIdByOriginalName as Record<string, string | undefined>)[originalName];
    if (!stableId) {
      throw new Error(`ID persistente nervioso no encontrado para: ${originalName}`);
    }

    return createAnatomyEntry({
      id: stableId,
      system: "nervous",
      modelBindings: [resolvedBinding],
      displayName: getSystemStructureName("nervous", originalName),
      layer: layer(originalName),
      region: regionByName[originalName] ?? (layer(originalName) === "nervous-central" ? "Encéfalo" : "Sistema nervioso periférico"),
      laterality: s,
      structureType: data?.type ?? "Estructura anatómica",
      keywords: [data?.name ?? originalName],
      educationalId: data?.id,
    });
  });
}

export function validateNervousAnatomyEntries(entries: readonly AnatomyStructureIndexEntry[]): void {
  const ids = new Set<string>();
  const bs = new Set<string>();
  for (const e of entries) {
    if (ids.has(e.id) || !e.id.startsWith("nervous.")) {
      throw new Error(`ID nervioso inválido: ${e.id}`);
    }
    ids.add(e.id);
    for (const b of e.modelBindings) {
      const k = b.modelKey + ":" + b.originalName;
      if (bs.has(k) || !catalogByName.has(b.originalName)) {
        throw new Error(`Binding nervioso inválido: ${k}`);
      }
      const registeredId = (
        nervousStableIdByOriginalName as Record<string, string | undefined>
      )[b.originalName];
      if (registeredId !== e.id) {
        throw new Error(`ID persistente nervioso incoherente: ${b.originalName}`);
      }
      bs.add(k);
      if (b.originalName.endsWith(".l") && e.laterality !== "left" || b.originalName.endsWith(".r") && e.laterality !== "right") {
        throw new Error(`Lateralidad nerviosa inválida: ${e.id}`);
      }
    }
    if (e.educationalId && !nervousStructures.getById(e.educationalId)) {
      throw new Error(`Ficha nerviosa inexistente: ${e.educationalId}`);
    }
  }
}


