import { createEducationalCollection } from "./educationalCollection";
import { headNeckEntries } from "./muscular/headNeck";
import { trunkEntries } from "./muscular/trunk";
import { upperLimbEntries } from "./muscular/upperLimb";
import { lowerLimbEntries } from "./muscular/lowerLimb";
import { headNeckAdditionalEntries } from "./muscular/headNeckAdditional";
import { trunkAdditionalEntries } from "./muscular/trunkAdditional";
import { upperLimbAdditionalEntries } from "./muscular/upperLimbAdditional";
import { lowerLimbAdditionalEntries } from "./muscular/lowerLimbAdditional";
import { localizeMuscularText } from "./muscularLocalizedText";
import type { AnatomyStructureData, EducationalStructureBinding } from "./educationalCollection";

function localizeMuscularEntry(entry: EducationalStructureBinding): EducationalStructureBinding {
  const data = entry.data;
  const localized: AnatomyStructureData = {
    ...data,
    name: localizeMuscularText(data.id, typeof data.name === "string" ? data.name : data.name.es, "name"),
    type: localizeMuscularText(data.id, typeof data.type === "string" ? data.type : data.type.es, "type"),
    description: localizeMuscularText(data.id, typeof data.description === "string" ? data.description : data.description.es, "description"),
    ...(data.function ? { function: localizeMuscularText(data.id, typeof data.function === "string" ? data.function : data.function.es, "function") } : {}),
    ...(data.location ? { location: localizeMuscularText(data.id, typeof data.location === "string" ? data.location : data.location.es, "location") } : {}),
    ...(data.relationships ? {
      relationships: data.relationships.map((relationship) => typeof relationship === "string"
        ? localizeMuscularText(data.id, relationship, "relationship")
        : relationship),
    } : {}),
  };
  return { ...entry, data: localized } as EducationalStructureBinding;
}

const muscularEducationalGroupsRaw = {
  headNeck: [...headNeckEntries, ...headNeckAdditionalEntries],
  trunk: [...trunkEntries, ...trunkAdditionalEntries],
  upperLimb: [...upperLimbEntries, ...upperLimbAdditionalEntries],
  lowerLimb: [...lowerLimbEntries, ...lowerLimbAdditionalEntries],
} as const;

export const muscularEducationalGroups = {
  headNeck: muscularEducationalGroupsRaw.headNeck.map(localizeMuscularEntry),
  trunk: muscularEducationalGroupsRaw.trunk.map(localizeMuscularEntry),
  upperLimb: muscularEducationalGroupsRaw.upperLimb.map(localizeMuscularEntry),
  lowerLimb: muscularEducationalGroupsRaw.lowerLimb.map(localizeMuscularEntry),
} as const;

const collection = createEducationalCollection([
  ...[
    ...muscularEducationalGroupsRaw.headNeck,
    ...muscularEducationalGroupsRaw.trunk,
    ...muscularEducationalGroupsRaw.upperLimb,
    ...muscularEducationalGroupsRaw.lowerLimb,
  ].map(localizeMuscularEntry),
]);

// Los IDs de las fichas piloto siguen resolviendo durante la migración para compatibilidad.
const legacyIds: Record<string, string> = {
  "sternocleidomastoid-right": "muscular.sternocleidomastoid",
  "rectus-abdominis-left": "muscular.rectus-abdominis",
};

export const muscularStructures = {
  ...collection,
  getById: (id: string) => collection.getById(legacyIds[id] ?? id),
};
