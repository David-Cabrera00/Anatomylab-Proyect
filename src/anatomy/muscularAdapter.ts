import type { AnatomyStructureData, EducationalStructureBinding } from "../data/educationalCollection";
import { muscularEducationalGroups, muscularStructures } from "../data/muscular";
import { getSystemStructureName } from "../utils/systemNames";
import { muscularModelCatalog, type MuscularModelCatalogEntry } from "./catalogs/muscularModelCatalog";
import { createAnatomyEntry } from "./createAnatomyEntry";
import {
  muscularEducationalIdentityGroupsByEducationalId,
  muscularStableIdByOriginalName,
  type MuscularEducationalIdentityGroup,
} from "./metadata/muscularStableIds";
import type { AnatomyLaterality, AnatomyStructureIndexEntry } from "./types";
import { getLocalizedText } from "../i18n/localizedText";

type MuscularLayer = MuscularModelCatalogEntry["layer"];
type IdentityAssignment = Readonly<{ anatomyId: string; data?: AnatomyStructureData }>;
type EntryDraft = { anatomyId: string; originalNames: string[]; data?: AnatomyStructureData };

const MOJIBAKE_PATTERN = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const VALID_LAYERS = new Set<MuscularLayer>([
  "muscular-head-neck", "muscular-trunk", "muscular-upper-limb", "muscular-lower-limb",
]);
const TECHNICAL_ORIGINAL_NAMES = new Set(["Sistema muscular.g"]);
const preservedPilotIds: Readonly<Record<string, string>> = {
  "Músculo esternocleidomastoideo.r": "muscular.sternocleidomastoid.right",
};
/** Excepción ya documentada por el normalizador: el GLB omitió el sufijo .l. */
const lateralityOverrideByName: Readonly<Record<string, AnatomyLaterality>> = {
  "Músculo iliocostal del cuello": "left",
};
const regionByLayer: Readonly<Record<MuscularLayer, string>> = {
  "muscular-head-neck": "Cabeza y cuello",
  "muscular-trunk": "Tronco",
  "muscular-upper-limb": "Miembro superior",
  "muscular-lower-limb": "Miembro inferior",
};

function lateralityFor(originalName: string): AnatomyLaterality {
  const override = lateralityOverrideByName[originalName];
  if (override !== undefined) return override;
  if (originalName.endsWith(".l")) return "left";
  if (originalName.endsWith(".r")) return "right";
  return null;
}

function withoutLaterality(originalName: string): string {
  return originalName.replace(/\.(?:l|r)$/i, "");
}

function educationalBindings(): readonly EducationalStructureBinding[] {
  return Object.values(muscularEducationalGroups).flat() as readonly EducationalStructureBinding[];
}

function identityGroupsFor(
  binding: EducationalStructureBinding,
  baseNames: readonly string[]
): readonly MuscularEducationalIdentityGroup[] {
  if (baseNames.length === 1) {
    return [{ stableKey: "educational-concept", anatomyIdBase: binding.data.id, originalBaseNames: baseNames }];
  }
  const groups = muscularEducationalIdentityGroupsByEducationalId[
    binding.data.id as keyof typeof muscularEducationalIdentityGroupsByEducationalId
  ];
  if (!groups?.length) throw new Error(`Grupo muscular sin stableKey: ${binding.data.id}`);

  const expected = new Set(baseNames);
  const claimed = new Set<string>();
  for (const group of groups) {
    if (!group.stableKey.trim() || !group.anatomyIdBase.trim() || !group.originalBaseNames.length) {
      throw new Error(`Grupo muscular sin stableKey: ${binding.data.id}`);
    }
    for (const baseName of group.originalBaseNames) {
      if (!expected.has(baseName) || claimed.has(baseName)) {
        throw new Error(`Agrupación muscular declarativa inválida: ${binding.data.id}:${baseName}`);
      }
      claimed.add(baseName);
    }
  }
  if (claimed.size !== expected.size) {
    const missing = baseNames.find((baseName) => !claimed.has(baseName));
    throw new Error(`Grupo muscular sin stableKey: ${binding.data.id}:${missing ?? "desconocido"}`);
  }
  return groups;
}

function createEducationalAssignments(
  catalogEntries: readonly MuscularModelCatalogEntry[]
): Map<string, IdentityAssignment> {
  const assignments = new Map<string, IdentityAssignment>();
  const catalogNames = new Set(catalogEntries.map((entry) => entry.originalName));
  for (const binding of educationalBindings()) {
    const originalNames = binding.originalNames ?? [binding.originalName];
    const baseNames = [...new Set(originalNames.map(withoutLaterality))];
    for (const identityGroup of identityGroupsFor(binding, baseNames)) {
      const groupNames = new Set(identityGroup.originalBaseNames);
      const namesByLaterality = new Map<AnatomyLaterality, string[]>();
      for (const originalName of originalNames) {
        if (!groupNames.has(withoutLaterality(originalName))) continue;
        if (!catalogNames.has(originalName)) {
          throw new Error(`OriginalName muscular ausente del catálogo: ${originalName}`);
        }
        const side = lateralityFor(originalName);
        const names = namesByLaterality.get(side) ?? [];
        names.push(originalName);
        namesByLaterality.set(side, names);
      }
      for (const [side, names] of namesByLaterality) {
        const naturalId = `${identityGroup.anatomyIdBase}${side ? `.${side}` : ""}`;
        const anatomyId = names.map((name) => preservedPilotIds[name]).find(Boolean) ?? naturalId;
        for (const originalName of names) {
          if (assignments.has(originalName)) {
            throw new Error(`Binding educativo muscular duplicado: overview:${originalName}`);
          }
          assignments.set(originalName, { anatomyId, data: binding.data });
        }
      }
    }
  }
  return assignments;
}

function createEntryDrafts(catalogEntries: readonly MuscularModelCatalogEntry[]): EntryDraft[] {
  const educationalByName = createEducationalAssignments(catalogEntries);
  const draftsById = new Map<string, EntryDraft>();
  for (const catalogEntry of catalogEntries) {
    const educational = educationalByName.get(catalogEntry.originalName);
    const anatomyId = educational?.anatomyId ?? muscularStableIdByOriginalName[
      catalogEntry.originalName as keyof typeof muscularStableIdByOriginalName
    ];
    if (!anatomyId) throw new Error(`Stable Anatomy ID muscular ausente: ${catalogEntry.originalName}`);
    const existing = draftsById.get(anatomyId);
    if (existing) {
      if (existing.data?.id !== educational?.data?.id) throw new Error(`Identidad muscular conflictiva: ${anatomyId}`);
      existing.originalNames.push(catalogEntry.originalName);
    } else {
      draftsById.set(anatomyId, { anatomyId, originalNames: [catalogEntry.originalName], data: educational?.data });
    }
  }
  return [...draftsById.values()];
}

function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
}

function uniqueKeywords(values: readonly (string | undefined)[]): string[] {
  const result: string[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    if (!value?.trim()) continue;
    const key = normalizeKeyword(value);
    if (!seen.has(key)) { seen.add(key); result.push(value.trim()); }
  }
  return result;
}

function displayNameFor(draft: EntryDraft, side: AnatomyLaterality): string {
  if (draft.originalNames.length === 1 || !draft.data) {
    return getSystemStructureName("muscular", draft.originalNames[0]);
  }
  const sideSuffix = side === "left" ? ".l" : side === "right" ? ".r" : "";
  return getSystemStructureName("muscular", `${getLocalizedText(draft.data.name, "es")}${sideSuffix}`);
}

export function createMuscularAnatomyEntries(
  catalogEntries: readonly MuscularModelCatalogEntry[] = muscularModelCatalog
): readonly AnatomyStructureIndexEntry[] {
  const catalogByName = new Map<string, MuscularModelCatalogEntry>(
    catalogEntries.map((entry) => [entry.originalName, entry])
  );
  return createEntryDrafts(catalogEntries).map((draft) => {
    const catalogMatches = draft.originalNames.map((originalName) => {
      const catalogEntry = catalogByName.get(originalName);
      if (!catalogEntry) throw new Error(`OriginalName muscular ausente del catálogo: ${originalName}`);
      return catalogEntry;
    });
    const layers = new Set(catalogMatches.map((entry) => entry.layer));
    if (layers.size !== 1) throw new Error(`Agrupación muscular mezcla layers: ${draft.anatomyId}`);
    const sides = new Set(draft.originalNames.map(lateralityFor));
    if (sides.size !== 1) throw new Error(`Agrupación muscular mezcla lateralidades: ${draft.anatomyId}`);
    const layer = catalogMatches[0].layer;
    const side = lateralityFor(draft.originalNames[0]);
    const region = regionByLayer[layer];
    const displayName = displayNameFor(draft, side);
    return createAnatomyEntry({
      id: draft.anatomyId,
      system: "muscular",
      modelBindings: catalogMatches.map((entry) => ({ modelKey: entry.modelKey, originalName: entry.originalName })),
      displayName,
      layer,
      region,
      subregion: draft.data ? getLocalizedText(draft.data.location ?? "", "es") : undefined,
      laterality: side,
      structureType: draft.data ? getLocalizedText(draft.data.type, "es") : "Estructura musculoesquelética",
      keywords: uniqueKeywords([
        displayName, draft.data ? getLocalizedText(draft.data.name, "es") : undefined, region,
        draft.data ? getLocalizedText(draft.data.location ?? "", "es") : undefined,
        ...draft.originalNames.map(withoutLaterality), ...(draft.data?.relationships ?? []).map((value) => getLocalizedText(value, "es")),
      ]),
      educationalId: draft.data?.id,
    });
  });
}

export function validateMuscularAnatomyEntries(entries: readonly AnatomyStructureIndexEntry[]): void {
  if (!entries.length) throw new Error("Entradas musculares vacías");
  const expectedDrafts = createEntryDrafts(muscularModelCatalog);
  const expectedBindingsById = new Map(expectedDrafts.map((draft) => [draft.anatomyId, new Set(draft.originalNames)]));
  const catalogByName = new Map<string, MuscularModelCatalogEntry>(
    muscularModelCatalog.map((entry) => [entry.originalName, entry])
  );
  const ids = new Set<string>();
  const bindings = new Set<string>();
  const representedNames = new Set<string>();
  for (const entry of entries) {
    if (!entry.id.startsWith("muscular.")) throw new Error(`Prefijo de ID muscular inválido: ${entry.id}`);
    if (/\.member-\d+(?:\.|$)/.test(entry.id)) throw new Error(`ID muscular dependiente de posición: ${entry.id}`);
    if (ids.has(entry.id)) throw new Error(`ID muscular duplicado: ${entry.id}`);
    ids.add(entry.id);
    if (!entry.modelBindings.length) throw new Error(`Entrada muscular sin modelBindings: ${entry.id}`);
    if (!entry.layer || !VALID_LAYERS.has(entry.layer as MuscularLayer)) throw new Error(`Layer muscular inválida: ${entry.id}`);
    if (entry.educationalId !== undefined && !muscularStructures.getById(entry.educationalId)) {
      throw new Error(`EducationalId muscular inexistente: ${entry.educationalId}`);
    }
    const entrySides = new Set<AnatomyLaterality>();
    const actualNames = new Set<string>();
    for (const binding of entry.modelBindings) {
      const key = `${binding.modelKey}:${binding.originalName}`;
      if (bindings.has(key)) throw new Error(`Binding muscular duplicado: ${key}`);
      bindings.add(key);
      actualNames.add(binding.originalName);
      const catalogEntry = catalogByName.get(binding.originalName);
      if (!catalogEntry || binding.modelKey !== catalogEntry.modelKey) throw new Error(`OriginalName muscular ausente del catálogo: ${binding.originalName}`);
      if (!catalogEntry.hasSelectableGeometry) throw new Error(`Geometría muscular no seleccionable: ${binding.originalName}`);
      if (TECHNICAL_ORIGINAL_NAMES.has(binding.originalName)) throw new Error(`Objeto técnico muscular indexado: ${binding.originalName}`);
      if (MOJIBAKE_PATTERN.test(binding.originalName)) throw new Error(`Mojibake en originalName muscular: ${binding.originalName}`);
      if (entry.layer !== catalogEntry.layer) throw new Error(`Layer muscular inválida: ${entry.id}`);
      entrySides.add(lateralityFor(binding.originalName));
      representedNames.add(binding.originalName);
    }
    if (entrySides.size !== 1) throw new Error(`Agrupación muscular mezcla lateralidades: ${entry.id}`);
    if (entry.laterality !== [...entrySides][0]) throw new Error(`Lateralidad muscular inválida: ${entry.id}`);
    const expectedNames = expectedBindingsById.get(entry.id);
    if (!expectedNames || expectedNames.size !== actualNames.size || [...actualNames].some((name) => !expectedNames.has(name))) {
      throw new Error(`Agrupación muscular incoherente: ${entry.id}`);
    }
  }
  for (const catalogEntry of muscularModelCatalog) {
    if (!representedNames.has(catalogEntry.originalName)) throw new Error(`Nodo muscular del catálogo sin AnatomyEntry: ${catalogEntry.originalName}`);
  }
  for (const [originalName, anatomyId] of Object.entries(preservedPilotIds)) {
    const entry = entries.find((candidate) => candidate.modelBindings.some((binding) => binding.originalName === originalName));
    if (entry?.id !== anatomyId) throw new Error(`Piloto muscular no preservado: ${originalName}`);
  }
}
