import { anatomyIndex } from "../anatomy/anatomyIndex";
import { anatomySystems, type AnatomySystemId } from "../config/anatomySystems";

export interface SearchEntry {
  anatomyId: string;
  displayName: string;
  system: AnatomySystemId;
  layer: string;
  laterality: "left" | "right" | "midline" | null;
  region: string;
  subregion: string | null;
  structureType: string;
  keywords: string[];
  educationalId: string | undefined;
  hasEducationalCard: boolean;
}

function ensureString(value: string | undefined): string {
  return value ?? "";
}

function normalize(value: string | undefined): string {
  return (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function buildSearchIndex(): SearchEntry[] {
  return anatomyIndex.map((entry) => {
    const system = anatomySystems[entry.system];
    const layerLabel = system.layers.find((layer) => layer.id === entry.layer)?.label;
    const lateralityKeywords = entry.laterality === "left"
      ? ["left", "izquierda", "izquierdo"]
      : entry.laterality === "right"
        ? ["right", "derecha", "derecho"]
        : entry.laterality === "midline"
          ? ["midline", "línea media"]
          : [];
    const baseKeywords = [
      entry.displayName,
      entry.id,
      entry.system,
      system.label,
      system.fullName,
      entry.layer,
      layerLabel,
      entry.region,
      entry.subregion,
      entry.structureType,
      ...lateralityKeywords,
      ...entry.keywords,
    ];

    if (entry.educationalId) baseKeywords.push(entry.educationalId);
    if (entry.subregion) baseKeywords.push(entry.subregion);

    const uniqueKeywords = Array.from(new Set(baseKeywords.map(normalize).filter(Boolean)));

    return {
      anatomyId: entry.id,
      displayName: entry.displayName,
      system: entry.system,
      layer: ensureString(entry.layer),
      laterality: entry.laterality ?? null,
      region: ensureString(entry.region),
      subregion: entry.subregion ?? null,
      structureType: ensureString(entry.structureType),
      keywords: uniqueKeywords,
      educationalId: entry.educationalId,
      hasEducationalCard: entry.system === "cardiovascular" || !!entry.educationalId,
    };
  });
}

export const anatomySearchIndex: SearchEntry[] = buildSearchIndex();

export function searchAnatomy(
  query: string,
  options: {
    system?: AnatomySystemId;
    layer?: string;
    laterality?: "left" | "right" | "midline";
    limit?: number;
  } = {}
): SearchEntry[] {
  const { system, layer, laterality, limit = 50 } = options;
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const scored = anatomySearchIndex
    .filter((entry) => {
      if (system && entry.system !== system) return false;
      if (layer && entry.layer !== layer) return false;
      if (laterality && entry.laterality !== laterality) return false;
      return true;
    })
    .map((entry) => {
      let score = 0;

      // 1. anatomyId exacto
      if (normalize(entry.anatomyId) === normalizedQuery) score += 1000;

      // 2. displayName empieza por query
      if (normalize(entry.displayName).startsWith(normalizedQuery)) score += 500;

      // 3. displayName incluye query
      if (normalize(entry.displayName).includes(normalizedQuery)) score += 200;

      // 4. educationalId exacto
      if (entry.educationalId && normalize(entry.educationalId) === normalizedQuery) score += 400;

      // 5. keyword exacta
      if (entry.keywords.includes(normalizedQuery)) score += 300;

      // 6. keyword empieza por query
      if (entry.keywords.some((k) => k.startsWith(normalizedQuery))) score += 150;

      // 7. keyword incluye query
      if (entry.keywords.some((k) => k.includes(normalizedQuery))) score += 50;

      // Penalizar entradas sin ficha educativa ligeramente
      if (!entry.hasEducationalCard) score -= 10;

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);

  return scored;
}

export function getSearchEntryById(anatomyId: string): SearchEntry | undefined {
  return anatomySearchIndex.find((e) => e.anatomyId === anatomyId);
}

export function getSearchEntriesBySystem(system: AnatomySystemId): SearchEntry[] {
  return anatomySearchIndex.filter((e) => e.system === system);
}
