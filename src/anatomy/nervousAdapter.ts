import type { AnatomyStructureIndexEntry } from "./types";
import type { AnatomyStructureData } from "../data/educationalCollection";
import { nervousEducationalGroups, nervousStructures } from "../data/nervous";
import { getSystemStructureName } from "../utils/systemNames";
import { createAnatomyEntry } from "./createAnatomyEntry";
import { nervousModelCatalog } from "./catalogs/nervousModelCatalog";
import { nervousStableIdByOriginalName } from "./metadata/nervousStableIds";
import { nervousModelNodeStableIdByOriginalName } from "./metadata/nervousModelNodeStableIds";
import { nervousLayerByOriginalName } from "./metadata/nervousHierarchyLayers";
import { getLocalizedText } from "../i18n/localizedText";

const catalogByName = new Map(nervousModelCatalog.map((item) => [item.originalName, item]));
const regionByName: Record<string, string> = { "Plexo coroideo.l": "Encéfalo", "Plexo coroideo.r": "Encéfalo" };
const nervousAnatomyIdByOriginalName: Readonly<Record<string, string>> = Object.freeze({
  ...nervousStableIdByOriginalName,
  ...nervousModelNodeStableIdByOriginalName,
});

function side(n: string): "left" | "right" | "midline" {
  return n.endsWith(".l") ? "left" : n.endsWith(".r") ? "right" : "midline";
}

export function createNervousAnatomyEntries(
  catalogEntries: readonly (typeof nervousModelCatalog)[number][] = nervousModelCatalog
): readonly AnatomyStructureIndexEntry[] {
  const catalogEntriesByName = new Map(
    catalogEntries.map((item) => [item.originalName, item])
  );
  const educationalByOriginalName = new Map<string, AnatomyStructureData>();
  for (const educationalBinding of Object.values(nervousEducationalGroups).flat()) {
    for (const originalName of educationalBinding.originalNames ?? [educationalBinding.originalName]) {
      const previous = educationalByOriginalName.get(originalName);
      if (previous && previous.id !== educationalBinding.data.id) {
        throw new Error(`Conflicto educativo nervioso para ${originalName}`);
      }
      educationalByOriginalName.set(originalName, educationalBinding.data);
    }
  }

  for (const originalName of educationalByOriginalName.keys()) {
    if (!(originalName in nervousAnatomyIdByOriginalName)) {
      throw new Error(`Ficha nerviosa sin ID persistente: ${originalName}`);
    }
  }

  return Object.entries(nervousAnatomyIdByOriginalName).map(([originalName, stableId]) => {
    const data = educationalByOriginalName.get(originalName);
    const modelBinding = catalogEntriesByName.get(originalName);
    if (!modelBinding?.hasSelectableGeometry) {
      throw new Error(`OriginalName nervioso ausente del catálogo: ${originalName}`);
    }
    const resolvedBinding = modelBinding;
    const s = side(originalName);
    const hierarchyLayer = (
      nervousLayerByOriginalName as Readonly<Record<string, typeof nervousLayerByOriginalName[keyof typeof nervousLayerByOriginalName] | undefined>>
    )[originalName];
    if (!hierarchyLayer) {
      throw new Error(`Capa jerárquica nerviosa ausente: ${originalName}`);
    }

    return createAnatomyEntry({
      id: stableId,
      system: "nervous",
      modelBindings: [resolvedBinding],
      displayName: getSystemStructureName("nervous", originalName),
      layer: hierarchyLayer,
      region: regionByName[originalName] ?? (hierarchyLayer === "nervous-central" ? "Encéfalo" : hierarchyLayer === "nervous-sense" ? "Órganos de los sentidos" : "Sistema nervioso periférico"),
      laterality: s,
      structureType: data ? getLocalizedText(data.type, "es") : "Estructura anatómica",
      keywords: [data ? getLocalizedText(data.name, "es") : originalName],
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
      const catalogEntry = catalogByName.get(b.originalName);
      if (bs.has(k) || !catalogEntry?.hasSelectableGeometry) {
        throw new Error(`Binding nervioso inválido: ${k}`);
      }
      const registeredId = (
        nervousAnatomyIdByOriginalName as Record<string, string | undefined>
      )[b.originalName];
      if (registeredId !== e.id) {
        throw new Error(`ID persistente nervioso incoherente: ${b.originalName}`);
      }
      const expectedLayer = (
        nervousLayerByOriginalName as Readonly<Record<string, AnatomyStructureIndexEntry["layer"]>>
      )[b.originalName];
      if (!expectedLayer || e.layer !== expectedLayer) {
        throw new Error(`Capa jerárquica nerviosa incoherente: ${b.originalName}`);
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


