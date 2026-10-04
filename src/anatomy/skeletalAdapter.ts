import type {
  AnatomyStructureData,
  EducationalStructureBinding,
} from "../data/educationalCollection";
import {
  skeletalEducationalGroups,
  skeletalStructures,
} from "../data/skeletal";
import { getSystemStructureName } from "../utils/systemNames";
import { skeletalModelCatalog } from "./catalogs/skeletalModelCatalog";
import { createAnatomyEntry } from "./createAnatomyEntry";
import { skeletalStableIdByOriginalName } from "./metadata/skeletalStableIds";
import type {
  AnatomyLaterality,
  AnatomyStructureIndexEntry,
} from "./types";

type EducationalMetadata = Readonly<{
  data: AnatomyStructureData;
}>;

type UnmappedMetadata = Readonly<{
  region: string;
  structureType: string;
}>;

const MOJIBAKE_PATTERN = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const catalogByName = new Map<string, (typeof skeletalModelCatalog)[number]>(
  skeletalModelCatalog.map((entry) => [entry.originalName, entry])
);

/** Identidades explícitas para estructuras reales que todavía no tienen ficha. */
const unmappedMetadataByName: Readonly<Record<string, UnmappedMetadata>> = {
  "Cartílago aritenoides.l": { region: "Laringe", structureType: "Cartílago" },
  "Cartílago aritenoides.r": { region: "Laringe", structureType: "Cartílago" },
  "Cartílago corniculado.l": { region: "Laringe", structureType: "Cartílago" },
  "Cartílago corniculado.r": { region: "Laringe", structureType: "Cartílago" },
  "Cartílago cricoides": { region: "Laringe", structureType: "Cartílago" },
  "Cartílago tiroideo": { region: "Laringe", structureType: "Cartílago" },
  "Cartílago alar mayor.l": { region: "Nariz", structureType: "Cartílago" },
  "Cartílago alar mayor.r": { region: "Nariz", structureType: "Cartílago" },
  "Cartílago del septo nasal": { region: "Nariz", structureType: "Cartílago" },
  "Proceso lateral del cartílago septal nasal.l": { region: "Nariz", structureType: "Cartílago" },
  "Proceso lateral del cartílago septal nasal.r": { region: "Nariz", structureType: "Cartílago" },
  "Seno del hueso esfenoidal": { region: "Cráneo", structureType: "Seno paranasal" },
  "Células óseas etmoidales etmoidales anteriores.l": { region: "Cráneo", structureType: "Celdillas etmoidales" },
  "Células óseas etmoidales etmoidales anteriores.r": { region: "Cráneo", structureType: "Celdillas etmoidales" },
  "Células óseas etmoidales etmoidales medias.l": { region: "Cráneo", structureType: "Celdillas etmoidales" },
  "Células óseas etmoidales etmoidales medias.r": { region: "Cráneo", structureType: "Celdillas etmoidales" },
  "Células óseas etmoidales etmoidales posteriores.l": { region: "Cráneo", structureType: "Celdillas etmoidales" },
  "Células óseas etmoidales etmoidales posteriores.r": { region: "Cráneo", structureType: "Celdillas etmoidales" },
  "Seno del hueso frontal": { region: "Cráneo", structureType: "Seno paranasal" },
};

function lateralityFor(originalName: string): AnatomyLaterality {
  if (originalName.endsWith(".l")) return "left";
  if (originalName.endsWith(".r")) return "right";
  return null;
}

function withoutLaterality(originalName: string): string {
  return originalName.replace(/\.(?:l|r)$/i, "");
}

/**
 * Construye metadata educativa usando IDs persistentes de skeletalStableIds.ts
 * en lugar de generarlos desde el orden declarativo.
 */
function createEducationalMetadata(
  catalogEntries: readonly (typeof skeletalModelCatalog)[number][]
): Map<string, EducationalMetadata> {
  const result = new Map<string, EducationalMetadata>();
  const catalogEntriesByName = new Map<string, (typeof skeletalModelCatalog)[number]>(
    catalogEntries.map((entry) => [entry.originalName, entry])
  );
  const groups = Object.values(skeletalEducationalGroups).flat() as readonly EducationalStructureBinding[];

  for (const binding of groups) {
    const originalNames = binding.originalNames ?? [binding.originalName];

    for (const originalName of originalNames) {
      if (!catalogEntriesByName.has(originalName)) {
        throw new Error(`OriginalName esquelético ausente del catálogo: ${originalName}`);
      }
      if (result.has(originalName)) {
        throw new Error(`Binding educativo esquelético duplicado: overview:${originalName}`);
      }

      if (!(originalName in skeletalStableIdByOriginalName)) {
        throw new Error(`ID persistente esquelético no encontrado para: ${originalName}`);
      }

      result.set(originalName, {
        data: binding.data,
      });
    }
  }

  return result;
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
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value.trim());
    }
  }
  return result;
}

export function createSkeletalAnatomyEntries(
  catalogEntries: readonly (typeof skeletalModelCatalog)[number][] = skeletalModelCatalog
): readonly AnatomyStructureIndexEntry[] {
  const educationalByName = createEducationalMetadata(catalogEntries);

  return catalogEntries.map((catalogEntry) => {
    const educational = educationalByName.get(catalogEntry.originalName);
    const unmapped = unmappedMetadataByName[catalogEntry.originalName];
    if (!educational && !unmapped) {
      throw new Error(`Metadata esquelética ausente: ${catalogEntry.originalName}`);
    }
    const stableId = (
      skeletalStableIdByOriginalName as Record<string, string | undefined>
    )[catalogEntry.originalName];
    if (!stableId) {
      throw new Error(`ID persistente esquelético no encontrado para: ${catalogEntry.originalName}`);
    }

    const displayName = getSystemStructureName("skeletal", catalogEntry.originalName);
    return createAnatomyEntry({
      id: stableId,
      system: "skeletal",
      modelBindings: [{
        modelKey: catalogEntry.modelKey,
        originalName: catalogEntry.originalName,
      }],
      displayName,
      layer: catalogEntry.layer,
      region: educational?.data.location ?? unmapped.region,
      laterality: lateralityFor(catalogEntry.originalName),
      structureType: educational?.data.type ?? unmapped.structureType,
      keywords: uniqueKeywords([
        displayName,
        educational?.data.name,
        withoutLaterality(catalogEntry.originalName),
        ...(educational?.data.relationships ?? []),
      ]),
      educationalId: educational?.data.id,
    });
  });
}

export function validateSkeletalAnatomyEntries(
  entries: readonly AnatomyStructureIndexEntry[]
): void {
  if (!entries.length) throw new Error("Entradas esqueléticas vacías");

  const ids = new Set<string>();
  const bindings = new Set<string>();
  const representedCatalogNames = new Set<string>();

  for (const entry of entries) {
    if (!entry.id.startsWith("skeletal.")) {
      throw new Error(`Prefijo de ID esquelético inválido: ${entry.id}`);
    }
    if (ids.has(entry.id)) throw new Error(`ID esquelético duplicado: ${entry.id}`);
    ids.add(entry.id);

    if (!entry.modelBindings.length) {
      throw new Error(`Entrada esquelética sin bindings: ${entry.id}`);
    }
    if (entry.layer !== "skeletal-axial" && entry.layer !== "skeletal-appendicular") {
      throw new Error(`Layer esquelética inválida: ${entry.id}`);
    }
    if (entry.educationalId !== undefined && !skeletalStructures.getById(entry.educationalId)) {
      throw new Error(`EducationalId esquelético inexistente: ${entry.educationalId}`);
    }

    for (const binding of entry.modelBindings) {
      const key = `${binding.modelKey}:${binding.originalName}`;
      if (bindings.has(key)) throw new Error(`Binding esquelético duplicado: ${key}`);
      bindings.add(key);

      const catalogEntry = catalogByName.get(binding.originalName);
      if (!catalogEntry || binding.modelKey !== catalogEntry.modelKey) {
        throw new Error(`OriginalName esquelético ausente del catálogo: ${binding.originalName}`);
      }
      if (!catalogEntry.hasSelectableGeometry) {
        throw new Error(`Geometría esquelética no seleccionable: ${binding.originalName}`);
      }
      const registeredId = (
        skeletalStableIdByOriginalName as Record<string, string | undefined>
      )[binding.originalName];
      if (registeredId !== entry.id) {
        throw new Error(`ID persistente esquelético incoherente: ${binding.originalName}`);
      }
      if (entry.layer !== catalogEntry.layer) {
        throw new Error(`Layer esquelética incoherente: ${binding.originalName}`);
      }
      if (MOJIBAKE_PATTERN.test(binding.originalName)) {
        throw new Error(`Mojibake en originalName esquelético: ${binding.originalName}`);
      }

      const expectedLaterality = lateralityFor(binding.originalName);
      if (entry.laterality !== expectedLaterality) {
        throw new Error(`Lateralidad esquelética inválida: ${entry.id}`);
      }
      representedCatalogNames.add(binding.originalName);
    }
  }

  for (const catalogEntry of skeletalModelCatalog) {
    if (!representedCatalogNames.has(catalogEntry.originalName)) {
      throw new Error(`Nodo esquelético del catálogo sin AnatomyEntry: ${catalogEntry.originalName}`);
    }
  }

  const pilotChecks: Readonly<Record<string, string>> = {
    "Escápula.l": "skeletal.scapula.left",
    "Hueso coxal.r": "skeletal.hip-bone.right",
  };

  for (const [originalName, anatomyId] of Object.entries(pilotChecks)) {
    const entry = entries.find((candidate) =>
      candidate.modelBindings.some((binding) => binding.originalName === originalName)
    );
    if (entry?.id !== anatomyId) {
      throw new Error(`Piloto esquelético no preservado: ${originalName}`);
    }
  }
}
