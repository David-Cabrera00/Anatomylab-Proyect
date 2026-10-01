import { createEducationalCollection } from "./educationalCollection";
import { headNeckEntries } from "./muscular/headNeck";
import { trunkEntries } from "./muscular/trunk";
import { upperLimbEntries } from "./muscular/upperLimb";
import { lowerLimbEntries } from "./muscular/lowerLimb";
import { headNeckAdditionalEntries } from "./muscular/headNeckAdditional";
import { trunkAdditionalEntries } from "./muscular/trunkAdditional";
import { upperLimbAdditionalEntries } from "./muscular/upperLimbAdditional";
import { lowerLimbAdditionalEntries } from "./muscular/lowerLimbAdditional";

export const muscularEducationalGroups = {
  headNeck: [...headNeckEntries, ...headNeckAdditionalEntries],
  trunk: [...trunkEntries, ...trunkAdditionalEntries],
  upperLimb: [...upperLimbEntries, ...upperLimbAdditionalEntries],
  lowerLimb: [...lowerLimbEntries, ...lowerLimbAdditionalEntries],
} as const;

const collection = createEducationalCollection([
  ...headNeckEntries,
  ...headNeckAdditionalEntries,
  ...trunkEntries,
  ...trunkAdditionalEntries,
  ...upperLimbEntries,
  ...upperLimbAdditionalEntries,
  ...lowerLimbEntries,
  ...lowerLimbAdditionalEntries,
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
