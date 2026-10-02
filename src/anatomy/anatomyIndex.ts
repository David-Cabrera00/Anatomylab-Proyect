import type { AnatomySystemId } from "../config/anatomySystems";
import { createDigestiveAnatomyEntries, validateDigestiveAnatomyEntries } from "./digestiveAdapter";
import { createNervousAnatomyEntries, validateNervousAnatomyEntries } from "./nervousAdapter";
import { createSkeletalAnatomyEntries, validateSkeletalAnatomyEntries } from "./skeletalAdapter";
import { createAnatomyEntry } from "./createAnatomyEntry";
import type {
  AnatomyDivisionId,
  AnatomyModelKey,
  AnatomyStructureIndexEntry,
} from "./types";

// Muestra inicial comprobada contra los GLB actuales. Los IDs son deliberados:
// no se generan a partir de object.name, del nombre original ni del visible.
const entries: readonly AnatomyStructureIndexEntry[] = [
  createAnatomyEntry({
    id: "cardiovascular.inferior-vena-cava.thoracic",
    system: "cardiovascular",
    modelBindings: [
      { modelKey: "overview", originalName: "Inferior vena cava (thoracic part)" },
    ],
    displayName: "Vena cava inferior (porción torácica)",
    layer: "veins",
    region: "Tórax",
    subregion: "Mediastino",
    laterality: null,
    structureType: "vena",
    keywords: ["vena cava", "retorno venoso"],
    educationalId: "Inferior_vena_cava_(thoracic_part)",
  }),
  createAnatomyEntry({
    id: "respiratory.middle-lobar-bronchus.right",
    system: "respiratory",
    modelBindings: [
      { modelKey: "overview", originalName: "Bronquio lobar medio.r" },
    ],
    layer: "airways",
    region: "Tórax",
    subregion: "Pulmón derecho",
    laterality: "right",
    structureType: "bronquio",
    keywords: ["bronquio lobar", "lóbulo medio"],
  }),

  createAnatomyEntry({
    id: "muscular.sternocleidomastoid.right",
    system: "muscular",
    modelBindings: [
      { modelKey: "overview", originalName: "Músculo esternocleidomastoideo.r" },
    ],
    layer: "muscular-head-neck",
    region: "Cuello",
    laterality: "right",
    structureType: "músculo",
    keywords: ["esternocleidomastoideo", "cuello"],
    educationalId: "sternocleidomastoid-right",
  }),

  ...createDigestiveAnatomyEntries(),
  ...createNervousAnatomyEntries(),
  ...createSkeletalAnatomyEntries(),
];

validateDigestiveAnatomyEntries(entries.filter((entry) => entry.system === "digestive"));
validateNervousAnatomyEntries(entries.filter((entry) => entry.system === "nervous"));
validateSkeletalAnatomyEntries(entries.filter((entry) => entry.system === "skeletal"));

const entriesById = new Map<string, AnatomyStructureIndexEntry>();
const entriesByModelNode = new Map<string, AnatomyStructureIndexEntry>();
const entriesByOriginalName = new Map<string, Set<AnatomyStructureIndexEntry>>();

function modelNodeKey(
  system: AnatomySystemId,
  modelKey: AnatomyModelKey,
  originalName: string
): string {
  return JSON.stringify([system, modelKey, originalName]);
}

for (const entry of entries) {
  if (entriesById.has(entry.id)) {
    throw new Error(`ID anatómico duplicado: ${entry.id}`);
  }
  entriesById.set(entry.id, entry);

  for (const binding of entry.modelBindings) {
    const key = modelNodeKey(entry.system, binding.modelKey, binding.originalName);
    if (entriesByModelNode.has(key)) {
      throw new Error(
        `Nodo anatómico duplicado: ${entry.system} / ${binding.modelKey} / ${binding.originalName}`
      );
    }
    entriesByModelNode.set(key, entry);

    const matches = entriesByOriginalName.get(binding.originalName) ?? new Set();
    matches.add(entry);
    entriesByOriginalName.set(binding.originalName, matches);
  }
}

export const anatomyIndex: readonly AnatomyStructureIndexEntry[] =
  Object.freeze([...entries]);

export function getAnatomyEntryById(
  id: string
): AnatomyStructureIndexEntry | null {
  return entriesById.get(id) ?? null;
}

/** Sin modelKey, una coincidencia ambigua exige especificar la variante. */
export function getAnatomyEntryByOriginalName(
  system: AnatomySystemId,
  originalName: string,
  modelKey?: AnatomyModelKey
): AnatomyStructureIndexEntry | null {
  if (modelKey) {
    return entriesByModelNode.get(modelNodeKey(system, modelKey, originalName)) ?? null;
  }

  const matches = findAnatomyStructuresByOriginalName(originalName, { system });
  if (matches.length > 1) {
    throw new Error(
      `Nombre original ambiguo en ${system}: ${originalName}; indica modelKey`
    );
  }
  return matches[0] ?? null;
}

/** Consulta secundaria global; admite nombres repetidos entre sistemas o modelos. */
export function findAnatomyStructuresByOriginalName(
  originalName: string,
  options: { system?: AnatomySystemId; modelKey?: AnatomyModelKey } = {}
): readonly AnatomyStructureIndexEntry[] {
  return [...(entriesByOriginalName.get(originalName) ?? [])].filter(
    (entry) =>
      (!options.system || entry.system === options.system) &&
      (!options.modelKey ||
        entry.modelBindings.some(
          (binding) =>
            binding.modelKey === options.modelKey &&
            binding.originalName === originalName
        ))
  );
}

export function getAnatomyEntriesBySystem(
  system: AnatomySystemId
): readonly AnatomyStructureIndexEntry[] {
  return anatomyIndex.filter((entry) => entry.system === system);
}

export function getAnatomyEntriesByLayer(
  system: AnatomySystemId,
  layer: AnatomyDivisionId
): readonly AnatomyStructureIndexEntry[] {
  return anatomyIndex.filter(
    (entry) => entry.system === system && entry.layer === layer
  );
}

// Nombres anteriores conservados para consumidores que ya usen el módulo.
export const getAnatomyStructureById = getAnatomyEntryById;
export const getAnatomyStructuresBySystem = getAnatomyEntriesBySystem;
