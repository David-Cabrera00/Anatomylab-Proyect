import { cardiovascularData, getCardiovascularStructure } from "../data/cardiovascular";
import { getSystemStructureName } from "../utils/systemNames";
import {
  cardiovascularModelCatalog,
  type CardiovascularModelCatalogEntry,
} from "./catalogs/cardiovascularModelCatalog";
import { createAnatomyEntry } from "./createAnatomyEntry";
import { cardiovascularStableIdByOriginalName } from "./metadata/cardiovascularStableIds";
import type { AnatomyLaterality, AnatomyStructureIndexEntry } from "./types";

type EntryDraft = Readonly<{
  originalName: string;
  catalogEntries: readonly CardiovascularModelCatalogEntry[];
}>;

const MOJIBAKE_PATTERN = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const VALID_LAYERS = new Set(["heart", "arteries", "veins"]);

const anatomyIdByEducationalId: Readonly<Record<string, string>> = {
  Right_atrium: "cardiovascular.right-atrium",
  Left_atrium: "cardiovascular.left-atrium",
  Right_ventricle: "cardiovascular.right-ventricle",
  Left_ventricle: "cardiovascular.left-ventricle",
  Ascending_aorta: "cardiovascular.ascending-aorta",
  Aortic_arch: "cardiovascular.aortic-arch",
  Thoracic_aorta: "cardiovascular.thoracic-aorta",
  Pulmonary_trunk: "cardiovascular.pulmonary-trunk",
  Right_pulmonary_artery: "cardiovascular.pulmonary-artery.right",
  Left_pulmonary_artery: "cardiovascular.pulmonary-artery.left",
  Right_superior_pulmonary_vein: "cardiovascular.superior-pulmonary-vein.right",
  Right_inferior_pulmonary_vein: "cardiovascular.inferior-pulmonary-vein.right",
  Left_superior_pulmonary_vein: "cardiovascular.superior-pulmonary-vein.left",
  Left_inferior_pulmonary_vein: "cardiovascular.inferior-pulmonary-vein.left",
  Superior_vena_cava: "cardiovascular.superior-vena-cava",
  "Inferior_vena_cava_(thoracic_part)": "cardiovascular.inferior-vena-cava.thoracic",
  Brachiocephalic_trunk: "cardiovascular.brachiocephalic-trunk",
  Coeliac_trunk: "cardiovascular.coeliac-trunk",
};

const educationalByOriginalName = new Map(
  Object.values(cardiovascularData).map((data) => [data.id.replace(/_/g, " "), data])
);

function createDrafts(
  catalogEntries: readonly CardiovascularModelCatalogEntry[]
): readonly EntryDraft[] {
  const byName = new Map<string, CardiovascularModelCatalogEntry[]>();
  for (const catalogEntry of catalogEntries) {
    const matches = byName.get(catalogEntry.originalName) ?? [];
    matches.push(catalogEntry);
    byName.set(catalogEntry.originalName, matches);
  }
  return [...byName].map(([originalName, matches]) => ({ originalName, catalogEntries: matches }));
}

function lateralityFor(originalName: string): AnatomyLaterality {
  const displayName = getSystemStructureName("cardiovascular", originalName);
  if (/\bizquierd[oa]s?\b/i.test(displayName)) return "left";
  if (/\bderech[oa]s?\b/i.test(displayName)) return "right";
  return null;
}

function regionFor(displayName: string, layer: CardiovascularModelCatalogEntry["layer"]): string {
  if (layer === "heart") return "Tórax";
  if (/cerebr|crane|carótid|yugular|oftálm|menínge|temporal|occipital|ciliar|facial|lingual/i.test(displayName)) {
    return "Cabeza y cuello";
  }
  if (/axilar|braquial|radial|cubital|ulnar|palmar|metacarp|digital.*mano/i.test(displayName)) {
    return "Miembro superior";
  }
  if (/femoral|poplíte|tibial|fibular|perone|plantar|metatars|digital.*pie|safena/i.test(displayName)) {
    return "Miembro inferior";
  }
  if (/renal|hepát|mesentér|gástr|esplén|celíac|ilíac|gonadal|suprarrenal|lumbar|rectal|sigmoid/i.test(displayName)) {
    return "Abdomen y pelvis";
  }
  return "Tórax";
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
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(value.trim());
  }
  return result;
}

export function createCardiovascularAnatomyEntries(
  catalogEntries: readonly CardiovascularModelCatalogEntry[] = cardiovascularModelCatalog
): readonly AnatomyStructureIndexEntry[] {
  return createDrafts(catalogEntries).map((draft) => {
    const educational = educationalByOriginalName.get(draft.originalName);
    const anatomyId = educational
      ? anatomyIdByEducationalId[educational.id]
      : cardiovascularStableIdByOriginalName[
          draft.originalName as keyof typeof cardiovascularStableIdByOriginalName
        ];
    if (!anatomyId) throw new Error(`Stable Anatomy ID cardiovascular ausente: ${draft.originalName}`);
    const layers = new Set(draft.catalogEntries.map((entry) => entry.layer));
    if (layers.size !== 1) throw new Error(`Estructura cardiovascular mezcla layers: ${draft.originalName}`);
    const layer = draft.catalogEntries[0].layer;
    const displayName = getSystemStructureName("cardiovascular", draft.originalName);
    const region = regionFor(displayName, layer);

    return createAnatomyEntry({
      id: anatomyId,
      system: "cardiovascular",
      modelBindings: draft.catalogEntries.map((entry) => ({
        modelKey: entry.modelKey,
        originalName: entry.originalName,
      })),
      displayName,
      layer,
      region,
      subregion: educational?.location,
      laterality: lateralityFor(draft.originalName),
      structureType: educational?.type ?? (layer === "heart" ? "Estructura cardíaca" : layer === "arteries" ? "Arteria" : "Vena"),
      keywords: uniqueKeywords([
        displayName,
        educational?.name,
        region,
        educational?.location,
        ...educational?.relationships ?? [],
      ]),
      educationalId: educational?.id,
    });
  });
}

export function validateCardiovascularAnatomyEntries(
  entries: readonly AnatomyStructureIndexEntry[]
): void {
  if (!entries.length) throw new Error("Entradas cardiovasculares vacías");
  const catalogByBinding = new Map<string, CardiovascularModelCatalogEntry>(
    cardiovascularModelCatalog.map((entry) => [`${entry.modelKey}:${entry.originalName}`, entry])
  );
  const expectedById = new Map(
    createCardiovascularAnatomyEntries(cardiovascularModelCatalog).map((entry) => [entry.id, entry])
  );
  const ids = new Set<string>();
  const representedBindings = new Set<string>();

  for (const entry of entries) {
    if (!entry.id.startsWith("cardiovascular.")) throw new Error(`Prefijo cardiovascular inválido: ${entry.id}`);
    if (ids.has(entry.id)) throw new Error(`ID cardiovascular duplicado: ${entry.id}`);
    ids.add(entry.id);
    if (!entry.layer || !VALID_LAYERS.has(entry.layer)) throw new Error(`Layer cardiovascular inválida: ${entry.id}`);
    if (entry.educationalId && !getCardiovascularStructure(entry.educationalId)) {
      throw new Error(`EducationalId cardiovascular inexistente: ${entry.educationalId}`);
    }
    const expected = expectedById.get(entry.id);
    if (!expected) throw new Error(`Identidad cardiovascular inesperada: ${entry.id}`);
    const expectedKeys = new Set(expected.modelBindings.map((binding) => `${binding.modelKey}:${binding.originalName}`));
    const actualKeys = new Set(entry.modelBindings.map((binding) => `${binding.modelKey}:${binding.originalName}`));
    if (expectedKeys.size !== actualKeys.size || [...actualKeys].some((key) => !expectedKeys.has(key))) {
      throw new Error(`Agrupación cardiovascular incoherente: ${entry.id}`);
    }

    for (const binding of entry.modelBindings) {
      const key = `${binding.modelKey}:${binding.originalName}`;
      if (representedBindings.has(key)) throw new Error(`Binding cardiovascular duplicado: ${key}`);
      representedBindings.add(key);
      const catalogEntry = catalogByBinding.get(key);
      if (!catalogEntry?.hasSelectableGeometry) throw new Error(`Binding cardiovascular ausente del catálogo: ${key}`);
      if (entry.layer !== catalogEntry.layer) throw new Error(`Layer cardiovascular incoherente: ${entry.id}`);
      if (entry.laterality !== lateralityFor(binding.originalName)) throw new Error(`Lateralidad cardiovascular inválida: ${entry.id}`);
      if (MOJIBAKE_PATTERN.test(binding.originalName)) throw new Error(`Mojibake cardiovascular: ${binding.originalName}`);
    }
  }

  for (const key of catalogByBinding.keys()) {
    if (!representedBindings.has(key)) throw new Error(`Nodo cardiovascular sin AnatomyEntry: ${key}`);
  }
  const pilot = entries.find((entry) => entry.id === "cardiovascular.inferior-vena-cava.thoracic");
  if (!pilot?.modelBindings.some((binding) => binding.originalName === "Inferior vena cava (thoracic part)")) {
    throw new Error("Piloto cardiovascular no preservado");
  }
}
