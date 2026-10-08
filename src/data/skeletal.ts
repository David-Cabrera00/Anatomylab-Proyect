import type { AnatomyStructureData, EducationalStructureBinding } from "./educationalCollection";
import { createEducationalCollection } from "./educationalCollection";
import { appendicularEntries } from "./skeletal/appendicular";
import { axialEntries } from "./skeletal/axial";
import { localizeSkeletalText } from "./skeletalLocalizedText";

function toSpanish(value: string | { es: string }): string {
  return typeof value === "string" ? value : value.es;
}

function localizeSkeletalEntry(entry: EducationalStructureBinding): EducationalStructureBinding {
  const data = entry.data as AnatomyStructureData;
  const localized: AnatomyStructureData = {
    ...data,
    name: localizeSkeletalText(data.id, toSpanish(data.name), "name"),
    type: localizeSkeletalText(data.id, toSpanish(data.type), "type"),
    description: localizeSkeletalText(data.id, toSpanish(data.description), "description"),
    ...(data.function
      ? { function: localizeSkeletalText(data.id, toSpanish(data.function), "function") }
      : {}),
    ...(data.location
      ? { location: localizeSkeletalText(data.id, toSpanish(data.location), "location") }
      : {}),
    ...(data.relationships
      ? {
          relationships: data.relationships.map((relationship) =>
            localizeSkeletalText(data.id, toSpanish(relationship), "relationship"),
          ),
        }
      : {}),
  };

  return { ...entry, data: localized };
}

const skeletalEducationalGroupsRaw = {
  axial: axialEntries,
  appendicular: appendicularEntries,
} as const;

export const skeletalEducationalGroups = {
  axial: skeletalEducationalGroupsRaw.axial.map(localizeSkeletalEntry),
  appendicular: skeletalEducationalGroupsRaw.appendicular.map(localizeSkeletalEntry),
} as const;

const collection = createEducationalCollection([
  ...skeletalEducationalGroupsRaw.axial.map(localizeSkeletalEntry),
  ...skeletalEducationalGroupsRaw.appendicular.map(localizeSkeletalEntry),
]);

// Los IDs de las dos fichas piloto siguen resolviendo durante la migración.
const legacyIds: Record<string, string> = {
  "hip-bone-right": "skeletal.hip-bone",
  "scapula-left": "skeletal.scapula",
};

export const skeletalStructures = {
  ...collection,
  getById: (id: string) => collection.getById(legacyIds[id] ?? id),
};
