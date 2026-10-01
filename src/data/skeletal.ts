import { createEducationalCollection } from "./educationalCollection";
import { appendicularEntries } from "./skeletal/appendicular";
import { axialEntries } from "./skeletal/axial";

export const skeletalEducationalGroups = {
  axial: axialEntries,
  appendicular: appendicularEntries,
} as const;

const collection = createEducationalCollection([
  ...axialEntries,
  ...appendicularEntries,
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
