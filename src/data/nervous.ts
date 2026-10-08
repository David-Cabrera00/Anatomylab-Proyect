import { createEducationalCollection } from "./educationalCollection";
import { centralEntries } from "./nervous/central";
import { peripheralEntries } from "./nervous/peripheral";
import { senseEntries } from "./nervous/senses";
import type { AnatomyStructureData, EducationalStructureBinding } from "./educationalCollection";
import { localizeNervousText } from "./nervousLocalizedText";

function localizeNervousEntry(entry: EducationalStructureBinding): EducationalStructureBinding {
  const data = entry.data;
  const localized: AnatomyStructureData = {
    ...data,
    name: localizeNervousText(data.id, typeof data.name === "string" ? data.name : data.name.es, "name"),
    type: localizeNervousText(data.id, typeof data.type === "string" ? data.type : data.type.es, "type"),
    description: localizeNervousText(data.id, typeof data.description === "string" ? data.description : data.description.es, "description"),
    ...(data.function ? { function: localizeNervousText(data.id, typeof data.function === "string" ? data.function : data.function.es, "function") } : {}),
    ...(data.location ? { location: localizeNervousText(data.id, typeof data.location === "string" ? data.location : data.location.es, "location") } : {}),
    ...(data.relationships ? {
      relationships: data.relationships.map((relationship) => typeof relationship === "string"
        ? localizeNervousText(data.id, relationship, "relationship")
        : relationship),
    } : {}),
  };
  return { ...entry, data: localized } as EducationalStructureBinding;
}

const nervousEducationalGroupsRaw = {
  central: centralEntries,
  peripheral: peripheralEntries,
  senses: senseEntries,
} as const;

export const nervousEducationalGroups = {
  central: nervousEducationalGroupsRaw.central.map(localizeNervousEntry),
  peripheral: nervousEducationalGroupsRaw.peripheral.map(localizeNervousEntry),
  senses: nervousEducationalGroupsRaw.senses.map(localizeNervousEntry),
} as const;

const collection = createEducationalCollection([
  ...nervousEducationalGroupsRaw.central,
  ...nervousEducationalGroupsRaw.peripheral,
  ...nervousEducationalGroupsRaw.senses,
].map(localizeNervousEntry));

// Los IDs de las dos fichas piloto siguen resolviendo durante la migración.
const legacyIds: Record<string, string> = {
  "glossopharyngeal-nerve-left": "nervous.glossopharyngeal-nerve",
  "pudendal-nerve-left": "nervous.pudendal-nerve",
};

export const nervousStructures = {
  ...collection,
  getById: (id: string) => collection.getById(legacyIds[id] ?? id),
};
