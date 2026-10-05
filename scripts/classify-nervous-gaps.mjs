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

const [{ anatomyIndex }, classification] = await Promise.all([
  import("../src/anatomy/anatomyIndex.ts"),
  import("../src/anatomy/metadata/nervousEducationalClassification.ts"),
]);

const pending = anatomyIndex.filter(
  (entry) => entry.system === "nervous" && !entry.educationalId
);
const pendingById = new Map(pending.map((entry) => [entry.id, entry]));
const groups = classification.nervousCentralBatch1Candidates;
const candidateIds = groups.flatMap((group) => [...group.anatomyIds]);
const uniqueCandidateIds = new Set(candidateIds);
const errors = [];

if (new Set(groups.map((group) => group.concept)).size !== groups.length) {
  errors.push("El lote contiene conceptos duplicados.");
}
if (uniqueCandidateIds.size !== candidateIds.length) {
  errors.push("El lote contiene Anatomy IDs duplicados.");
}

for (const anatomyId of uniqueCandidateIds) {
  const entry = pendingById.get(anatomyId);
  if (!entry) {
    errors.push(`Candidato inexistente o ya documentado: ${anatomyId}.`);
  } else if (entry.layer !== "nervous-central") {
    errors.push(`${anatomyId} no pertenece a la capa nervous-central.`);
  }
}

for (const group of groups) {
  const entries = group.anatomyIds.map((id) => pendingById.get(id)).filter(Boolean);
  if (entries.length === 2) {
    const sides = new Set(entries.map((entry) => entry.laterality));
    if (!sides.has("left") || !sides.has("right")) {
      errors.push(`${group.concept}: se esperaba un par bilateral completo.`);
    }
  } else if (entries.length === 1 && entries[0].laterality !== "midline") {
    errors.push(`${group.concept}: el candidato único no es una estructura media.`);
  }
}

const actual = {
  entriesWithoutEducationalContent: pending.length,
  centralEntriesWithoutEducationalContent: pending.filter((entry) => entry.layer === "nervous-central").length,
  peripheralEntriesWithoutEducationalContent: pending.filter((entry) => entry.layer === "nervous-peripheral").length,
  senseEntriesWithoutEducationalContent: pending.filter((entry) => entry.layer === "nervous-sense").length,
  reviewedCandidateConcepts: groups.length,
  reviewedCandidateEntries: uniqueCandidateIds.size,
  entriesPendingReview: pending.length - uniqueCandidateIds.size,
};

for (const [key, expected] of Object.entries(
  classification.nervousEducationalClassificationSnapshot
)) {
  if (actual[key] !== expected) {
    errors.push(`${key}: esperado ${expected}, obtenido ${actual[key]}.`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Clasificación nerviosa incremental validada.");
  console.log(`- Lote SNC 1: ${actual.reviewedCandidateConcepts} conceptos / ${actual.reviewedCandidateEntries} entradas.`);
  console.log(`- Pendientes de revisión: ${actual.entriesPendingReview} entradas.`);
}
