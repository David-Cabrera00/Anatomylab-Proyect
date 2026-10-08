import type { AnatomyStructureData, EducationalStructureBinding } from "./educationalCollection";
import { createEducationalCollection } from "./educationalCollection";
import { localizeDigestiveRelationship, localizeDigestiveText } from "./digestiveLocalizedText";
import { tractEntries } from "./digestive/tract";
import { accessoryEntries } from "./digestive/accessory";
import { grouped } from "./digestive/binding";

const digestivePilotEntriesRaw = [
  grouped(["Glándula parótida.l", "Glándula parótida.r"], {
    id: "parotid-gland-left", name: "Glándula parótida", type: "Glándula salival",
    description: "Glándula salival mayor.", function: "Produce saliva serosa.", location: "Región parotídea.",
  }),
  grouped(["Estómago"], {
    id: "stomach", name: "Estómago", type: "Órgano del tubo digestivo", description: "Órgano muscular digestivo.",
    function: "Almacena y mezcla el alimento.", location: "Abdomen superior.", relationships: ["Esófago", "Duodeno"],
  }),
] as const;

function spanish(value: string | { es: string }): string {
  return typeof value === "string" ? value : value.es;
}

function localizeDigestiveEntry(entry: EducationalStructureBinding): EducationalStructureBinding {
  const data = entry.data as AnatomyStructureData;
  const localized: AnatomyStructureData = {
    ...data,
    name: localizeDigestiveText(data.id, spanish(data.name), "name"),
    type: localizeDigestiveText(data.id, spanish(data.type), "type"),
    description: localizeDigestiveText(data.id, spanish(data.description), "description"),
    function: localizeDigestiveText(data.id, spanish(data.function!), "function"),
    location: localizeDigestiveText(data.id, spanish(data.location!), "location"),
    ...(data.relationships
      ? { relationships: data.relationships.map((relationship, index) => localizeDigestiveRelationship(data.id, spanish(relationship), index)) }
      : {}),
  };
  return { ...entry, data: localized };
}

const digestivePilotEntries = digestivePilotEntriesRaw.map(localizeDigestiveEntry);
const digestiveEducationalGroupsRaw = { tract: tractEntries, accessory: accessoryEntries } as const;

export { digestivePilotEntries };
export const digestiveEducationalGroups = {
  tract: digestiveEducationalGroupsRaw.tract.map(localizeDigestiveEntry),
  accessory: digestiveEducationalGroupsRaw.accessory.map(localizeDigestiveEntry),
} as const;

export const digestiveStructures = createEducationalCollection([
  ...digestivePilotEntries,
  ...digestiveEducationalGroups.tract,
  ...digestiveEducationalGroups.accessory,
]);
