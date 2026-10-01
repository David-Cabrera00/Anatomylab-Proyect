import { createEducationalCollection } from "./educationalCollection";
import { centralEntries } from "./nervous/central";
import { peripheralEntries } from "./nervous/peripheral";
import { senseEntries } from "./nervous/senses";

export const nervousEducationalGroups = {
  central: centralEntries,
  peripheral: peripheralEntries,
  senses: senseEntries,
} as const;

const collection = createEducationalCollection([
  ...centralEntries,
  ...peripheralEntries,
  ...senseEntries,
]);

// Los IDs de las dos fichas piloto siguen resolviendo durante la migración.
const legacyIds: Record<string, string> = {
  "glossopharyngeal-nerve-left": "nervous.glossopharyngeal-nerve",
  "pudendal-nerve-left": "nervous.pudendal-nerve",
};

export const nervousStructures = {
  ...collection,
  getById: (id: string) => collection.getById(legacyIds[id] ?? id),
};
