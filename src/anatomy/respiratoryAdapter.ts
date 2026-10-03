import { getRespiratoryStructure } from "../data/respiratory";
import { getSystemStructureName } from "../utils/systemNames";
import {
  respiratoryModelCatalog,
  type RespiratoryModelCatalogEntry,
} from "./catalogs/respiratoryModelCatalog";
import { createAnatomyEntry } from "./createAnatomyEntry";
import type { AnatomyLaterality, AnatomyStructureIndexEntry } from "./types";

type RespiratoryMetadata = Readonly<{
  anatomyId: string;
  educationalId?: string;
  region: string;
  subregion?: string;
  structureType: string;
}>;

const MOJIBAKE_PATTERN = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const VALID_LAYERS = new Set(["lungs", "airways", "upper-airway"]);

/** Identidades declarativas: no dependen de transformar object.name en un slug. */
const metadataByOriginalName: Readonly<Record<string, RespiratoryMetadata>> = {
  "Epiglotis": { anatomyId: "respiratory.epiglottis", educationalId: "epiglottis", region: "Cuello", subregion: "Laringe", structureType: "Vía aérea superior" },
  "Capa mucosa de la cavidad nasal": { anatomyId: "respiratory.nasal-cavity-mucosa", educationalId: "nasal-cavity-mucosa", region: "Cabeza", subregion: "Cavidad nasal", structureType: "Mucosa respiratoria" },
  "Lóbulo inferior del pulmón izquierdo": { anatomyId: "respiratory.lower-lobe.left", educationalId: "left-lower-lobe", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Lóbulo" },
  "Lóbulo superior del pulmón izquierdo": { anatomyId: "respiratory.upper-lobe.left", educationalId: "left-upper-lobe", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Lóbulo" },
  "Lóbulo inferior del pulmón derecho": { anatomyId: "respiratory.lower-lobe.right", educationalId: "right-lower-lobe", region: "Tórax", subregion: "Pulmón derecho", structureType: "Lóbulo" },
  "Lóbulo medio del pulmón derecho": { anatomyId: "respiratory.middle-lobe.right", educationalId: "right-middle-lobe", region: "Tórax", subregion: "Pulmón derecho", structureType: "Lóbulo" },
  "Lóbulo superior del pulmón derecho": { anatomyId: "respiratory.upper-lobe.right", educationalId: "right-upper-lobe", region: "Tórax", subregion: "Pulmón derecho", structureType: "Lóbulo" },
  "Bronquio segmentario basal ant. del pulmón derecho (BVIII)": { anatomyId: "respiratory.segmental-bronchus.b8-basal-anterior.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio segmentario basal lateral del pulmón derecho (BIX)": { anatomyId: "respiratory.segmental-bronchus.b9-basal-lateral.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio segmentario basal posterior del pulmón derecho (BX)": { anatomyId: "respiratory.segmental-bronchus.b10-basal-posterior.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio segmentario superior del pulmón derecho (BVI)": { anatomyId: "respiratory.segmental-bronchus.b6-superior.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Medial basal segmental bronchus of right lung (BVII)": { anatomyId: "respiratory.segmental-bronchus.b7-basal-medial.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio lobar inferior derecho": { anatomyId: "respiratory.lower-lobar-bronchus.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio lobar" },
  "Bronquio segmentario lateral del pulmón derecho (BIV)": { anatomyId: "respiratory.segmental-bronchus.b4-lateral.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio segmentario medial del pulmón derecho (BV)": { anatomyId: "respiratory.segmental-bronchus.b5-medial.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio lobar medio.r": { anatomyId: "respiratory.middle-lobar-bronchus.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio lobar" },
  "Bronquio intermedio.r": { anatomyId: "respiratory.intermediate-bronchus.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio" },
  "Bronquio segmentario anterior del pulmón derecho (BIII)": { anatomyId: "respiratory.segmental-bronchus.b3-anterior.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio segmentario apical del pulmón derecho (BI)": { anatomyId: "respiratory.segmental-bronchus.b1-apical.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio segmentario posterior del pulmón derecho (BII)": { anatomyId: "respiratory.segmental-bronchus.b2-posterior.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio segmentario" },
  "Bronquio lobar superior derecho": { anatomyId: "respiratory.upper-lobar-bronchus.right", region: "Tórax", subregion: "Pulmón derecho", structureType: "Bronquio lobar" },
  "Bronquio principal derecho": { anatomyId: "respiratory.main-bronchus.right", educationalId: "right-main-bronchus", region: "Tórax", subregion: "Hilio pulmonar derecho", structureType: "Bronquio principal" },
  "(Bronquio segmentario basal anteromedial-pulmón izquierdo)": { anatomyId: "respiratory.segmental-bronchus.basal-anteromedial.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio segmentario basal anterior-pulmón izquierdo (BVIII)": { anatomyId: "respiratory.segmental-bronchus.b8-basal-anterior.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio segmentario basal medial del pulmón izquierdo (BVII)": { anatomyId: "respiratory.segmental-bronchus.b7-basal-medial.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio segmentario basal posterior-pulmón izquierdo (BX)": { anatomyId: "respiratory.segmental-bronchus.b10-basal-posterior.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio segmentario superior del pulmón izquierdo (BVI)": { anatomyId: "respiratory.segmental-bronchus.b6-superior.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Lateral basal segmental bronchus of left lung (BIX)": { anatomyId: "respiratory.segmental-bronchus.b9-basal-lateral.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio lobar inferior izquierdo": { anatomyId: "respiratory.lower-lobar-bronchus.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio lobar" },
  "Bronquio segm. apicoposterior-pulmón izquierdo (BI + BII)": { anatomyId: "respiratory.segmental-bronchus.b1-b2-apicoposterior.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio segm. lingular sup. del pulmón izquierdo (BIV)": { anatomyId: "respiratory.segmental-bronchus.b4-lingular-superior.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio segmentario anterior del pulmón izquierdo (BIII)": { anatomyId: "respiratory.segmental-bronchus.b3-anterior.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio segmentario lingular inf. del pulmón izquierdo (BV)": { anatomyId: "respiratory.segmental-bronchus.b5-lingular-inferior.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio segmentario" },
  "Bronquio lobar superior izquierdo": { anatomyId: "respiratory.upper-lobar-bronchus.left", region: "Tórax", subregion: "Pulmón izquierdo", structureType: "Bronquio lobar" },
  "Bronquio principal izquierdo": { anatomyId: "respiratory.main-bronchus.left", educationalId: "left-main-bronchus", region: "Tórax", subregion: "Hilio pulmonar izquierdo", structureType: "Bronquio principal" },
  "Tráquea": { anatomyId: "respiratory.trachea", educationalId: "trachea", region: "Cuello y tórax", structureType: "Vía respiratoria" },
};

function lateralityFor(originalName: string): AnatomyLaterality {
  if (/\.l$|izquierd|left/i.test(originalName)) return "left";
  if (/\.r$|derech|right/i.test(originalName)) return "right";
  return null;
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

export function createRespiratoryAnatomyEntries(
  catalogEntries: readonly RespiratoryModelCatalogEntry[] = respiratoryModelCatalog
): readonly AnatomyStructureIndexEntry[] {
  return catalogEntries.map((catalogEntry) => {
    const metadata = metadataByOriginalName[catalogEntry.originalName];
    if (!metadata) throw new Error(`Metadata respiratoria ausente: ${catalogEntry.originalName}`);
    const displayName = getSystemStructureName("respiratory", catalogEntry.originalName);
    const educationalData = metadata.educationalId
      ? getRespiratoryStructure(metadata.educationalId)
      : getRespiratoryStructure(catalogEntry.originalName);

    return createAnatomyEntry({
      id: metadata.anatomyId,
      system: "respiratory",
      modelBindings: [{ modelKey: catalogEntry.modelKey, originalName: catalogEntry.originalName }],
      displayName,
      layer: catalogEntry.layer,
      region: metadata.region,
      subregion: metadata.subregion,
      laterality: lateralityFor(catalogEntry.originalName),
      structureType: educationalData?.type ?? metadata.structureType,
      keywords: uniqueKeywords([
        displayName,
        educationalData?.name,
        metadata.region,
        metadata.subregion,
        metadata.structureType,
      ]),
      educationalId: metadata.educationalId,
    });
  });
}

export function validateRespiratoryAnatomyEntries(
  entries: readonly AnatomyStructureIndexEntry[]
): void {
  if (!entries.length) throw new Error("Entradas respiratorias vacías");
  const catalogByName = new Map<string, RespiratoryModelCatalogEntry>(
    respiratoryModelCatalog.map((entry) => [entry.originalName, entry])
  );
  const ids = new Set<string>();
  const bindings = new Set<string>();
  const representedNames = new Set<string>();

  for (const entry of entries) {
    if (!entry.id.startsWith("respiratory.")) throw new Error(`Prefijo respiratorio inválido: ${entry.id}`);
    if (ids.has(entry.id)) throw new Error(`ID respiratorio duplicado: ${entry.id}`);
    ids.add(entry.id);
    if (!entry.layer || !VALID_LAYERS.has(entry.layer)) throw new Error(`Layer respiratoria inválida: ${entry.id}`);
    if (entry.educationalId && !getRespiratoryStructure(entry.educationalId)) {
      throw new Error(`EducationalId respiratorio inexistente: ${entry.educationalId}`);
    }

    for (const binding of entry.modelBindings) {
      const key = `${binding.modelKey}:${binding.originalName}`;
      if (bindings.has(key)) throw new Error(`Binding respiratorio duplicado: ${key}`);
      bindings.add(key);
      const catalogEntry = catalogByName.get(binding.originalName);
      if (!catalogEntry || binding.modelKey !== catalogEntry.modelKey) {
        throw new Error(`OriginalName respiratorio ausente del catálogo: ${binding.originalName}`);
      }
      if (!catalogEntry.hasSelectableGeometry) throw new Error(`Geometría respiratoria no seleccionable: ${binding.originalName}`);
      if (entry.layer !== catalogEntry.layer) throw new Error(`Layer respiratoria incoherente: ${entry.id}`);
      if (entry.laterality !== lateralityFor(binding.originalName)) throw new Error(`Lateralidad respiratoria inválida: ${entry.id}`);
      if (MOJIBAKE_PATTERN.test(binding.originalName)) throw new Error(`Mojibake respiratorio: ${binding.originalName}`);
      representedNames.add(binding.originalName);
    }
  }

  for (const catalogEntry of respiratoryModelCatalog) {
    if (!representedNames.has(catalogEntry.originalName)) {
      throw new Error(`Nodo respiratorio del catálogo sin AnatomyEntry: ${catalogEntry.originalName}`);
    }
  }

  const pilot = entries.find((entry) =>
    entry.modelBindings.some((binding) => binding.originalName === "Bronquio lobar medio.r")
  );
  if (pilot?.id !== "respiratory.middle-lobar-bronchus.right") {
    throw new Error("Piloto respiratorio no preservado: Bronquio lobar medio.r");
  }
}
