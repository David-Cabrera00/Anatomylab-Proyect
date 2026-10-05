import fs from "node:fs";
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
      const url = new URL(`${specifier}.ts`, context.parentURL);
      if (fs.existsSync(url)) return { url: url.href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});

const [{ createMuscularAnatomyEntries }, classification] = await Promise.all([
  import("../src/anatomy/muscularAdapter.ts"),
  import("../src/anatomy/metadata/muscularEducationalClassification.ts"),
]);

const entriesWithoutCard = createMuscularAnatomyEntries().filter((entry) => !entry.educationalId);
const entryById = new Map(entriesWithoutCard.map((entry) => [entry.id, entry]));
const candidateIds = new Set(classification.muscularEducationalCandidateIds);
const snapshot = classification.muscularEducationalClassificationSnapshot;
const errors = [];

if (candidateIds.size !== classification.muscularEducationalCandidateIds.length) {
  errors.push("La lista de candidatos contiene Anatomy IDs duplicados.");
}

for (const anatomyId of candidateIds) {
  if (!entryById.has(anatomyId)) errors.push(`Candidato inexistente o ya documentado: ${anatomyId}.`);
}

const educationalCandidates = entriesWithoutCard.filter((entry) => candidateIds.has(entry.id));
const technicalGeometry = entriesWithoutCard.filter((entry) => !candidateIds.has(entry.id));
const conceptKey = (entry) => entry.displayName.replace(/\s+(izquierd[oa]s?|derech[oa]s?)$/i, "");
const candidateConcepts = new Set(educationalCandidates.map(conceptKey));
const entriesByConcept = Map.groupBy(educationalCandidates, conceptKey);

for (const [concept, entries] of entriesByConcept) {
  const sides = new Set(entries.map((entry) => entry.laterality));
  if (entries.length !== 2 || !sides.has("left") || !sides.has("right")) {
    errors.push(`${concept}: se esperaba un par bilateral completo.`);
  }
}

const actual = {
  entriesWithoutEducationalContent: entriesWithoutCard.length,
  educationalCandidateEntries: educationalCandidates.length,
  educationalCandidateConcepts: candidateConcepts.size,
  technicalGeometryEntries: technicalGeometry.length,
};

for (const [key, expected] of Object.entries(snapshot)) {
  if (actual[key] !== expected) errors.push(`${key}: esperado ${expected}, obtenido ${actual[key]}.`);
}

if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Clasificación muscular validada.");
  console.log(`- ${actual.educationalCandidateConcepts} conceptos / ${actual.educationalCandidateEntries} entradas requieren ficha.`);
  console.log(`- ${actual.technicalGeometryEntries} entradas corresponden a geometría técnica o de apoyo.`);
  console.log("\nConceptos candidatos:");
  for (const name of [...candidateConcepts].sort((a, b) => a.localeCompare(b, "es"))) {
    console.log(`- ${name}`);
  }
}
