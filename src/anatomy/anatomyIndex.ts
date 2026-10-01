import { anatomySystems } from "../config/anatomySystems";
import type { AnatomySystemId } from "../config/anatomySystems";
import { createAnatomyEntry } from "./createAnatomyEntry";
import type { AnatomyStructureIndexEntry } from "./types";

// Muestra inicial comprobada contra los GLB actuales. Los IDs son deliberados:
// no se generan a partir de object.name, del nombre original ni del visible.
const entries: readonly AnatomyStructureIndexEntry[] = [
  createAnatomyEntry({
    id: "cardiovascular.inferior-vena-cava.thoracic",
    system: "cardiovascular",
    modelPath: anatomySystems.cardiovascular.modelPath,
    originalName: "Inferior vena cava (thoracic part)",
    displayName: "Vena cava inferior",
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
    modelPath: anatomySystems.respiratory.modelPath,
    originalName: "Bronquio lobar medio.r",
    layer: "airways",
    region: "Tórax",
    subregion: "Pulmón derecho",
    laterality: "right",
    structureType: "bronquio",
    keywords: ["bronquio lobar", "lóbulo medio"],
  }),
  createAnatomyEntry({
    id: "nervous.central-lobule-wing.left",
    system: "nervous",
    modelPath: anatomySystems.nervous.modelPath,
    originalName: "Ala del lóbulo central.l",
    layer: "nervous-central",
    region: "Encéfalo",
    subregion: "Cerebelo",
    laterality: "left",
    structureType: "estructura cerebelosa",
    keywords: ["ala", "lóbulo central", "cerebelo"],
  }),
  createAnatomyEntry({
    id: "skeletal.hip-bone.right",
    system: "skeletal",
    modelPath: anatomySystems.skeletal.modelPath,
    originalName: "Hueso coxal.r",
    layer: "skeletal-appendicular",
    region: "Pelvis",
    subregion: "Cintura pélvica",
    laterality: "right",
    structureType: "hueso",
    keywords: ["coxal", "pelvis", "cadera"],
  }),
  createAnatomyEntry({
    id: "muscular.sternocleidomastoid.right",
    system: "muscular",
    modelPath: anatomySystems.muscular.modelPath,
    originalName: "Músculo esternocleidomastoideo.r",
    layer: "muscular-head-neck",
    region: "Cuello",
    laterality: "right",
    structureType: "músculo",
    keywords: ["esternocleidomastoideo", "cuello"],
  }),
  createAnatomyEntry({
    id: "digestive.parotid-gland.left",
    system: "digestive",
    modelPath: anatomySystems.digestive.modelPath,
    originalName: "Glándula parótida.l",
    layer: "digestive-accessory",
    region: "Cabeza",
    subregion: "Región parotídea",
    laterality: "left",
    structureType: "glándula salival",
    keywords: ["parótida", "saliva", "glándula salival"],
  }),
];

const entriesById = new Map<string, AnatomyStructureIndexEntry>();
const entriesByOriginalName = new Map<string, AnatomyStructureIndexEntry[]>();

for (const entry of entries) {
  if (entriesById.has(entry.id)) {
    throw new Error(`ID anatómico duplicado: ${entry.id}`);
  }
  entriesById.set(entry.id, entry);

  const matches = entriesByOriginalName.get(entry.originalName) ?? [];
  matches.push(entry);
  entriesByOriginalName.set(entry.originalName, matches);
}

export const anatomyIndex: readonly AnatomyStructureIndexEntry[] =
  Object.freeze([...entries]);

export function getAnatomyStructureById(
  id: string
): AnatomyStructureIndexEntry | null {
  return entriesById.get(id) ?? null;
}

/** Coincidencia exacta; devuelve varias entradas si distintos modelos reutilizan el nombre. */
export function findAnatomyStructuresByOriginalName(
  originalName: string,
  options: { system?: AnatomySystemId; modelPath?: string } = {}
): readonly AnatomyStructureIndexEntry[] {
  return (entriesByOriginalName.get(originalName) ?? []).filter(
    (entry) =>
      (!options.system || entry.system === options.system) &&
      (!options.modelPath || entry.modelPath === options.modelPath)
  );
}

export function getAnatomyStructuresBySystem(
  system: AnatomySystemId
): readonly AnatomyStructureIndexEntry[] {
  return anatomyIndex.filter((entry) => entry.system === system);
}
