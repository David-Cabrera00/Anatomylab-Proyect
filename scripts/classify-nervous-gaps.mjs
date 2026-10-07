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
const nervousById = new Map(
  anatomyIndex.filter((entry) => entry.system === "nervous").map((entry) => [entry.id, entry])
);
const groups = [
  ...classification.nervousCentralBatch1Candidates.map((group) => ({ ...group, layer: "nervous-central" })),
  ...classification.nervousCentralBatch2Candidates.map((group) => ({ ...group, layer: "nervous-central" })),
  ...classification.nervousPeripheralBatch1Candidates.map((group) => ({ ...group, layer: "nervous-peripheral" })),
  ...classification.nervousPeripheralBatch2Candidates.map((group) => ({ ...group, layer: "nervous-peripheral" })),
];
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
  const entry = nervousById.get(anatomyId);
  if (!entry) {
    errors.push(`Candidato inexistente: ${anatomyId}.`);
  } else {
    const expectedLayer = groups.find((group) => group.anatomyIds.includes(anatomyId))?.layer;
    if (entry.layer !== expectedLayer) {
      errors.push(`${anatomyId} no pertenece a la capa ${expectedLayer}.`);
    }
  }
}

for (const group of groups) {
  const entries = group.anatomyIds.map((id) => nervousById.get(id)).filter(Boolean);
  for (const entry of entries) {
    if (entry.educationalId !== group.educationalId) {
      errors.push(`${entry.id}: ficha educativa incorrecta o ausente.`);
    }
  }
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
  completedConcepts: groups.length,
  completedEntries: uniqueCandidateIds.size,
  entriesPendingReview: pending.length,
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
  console.log(`- Lotes SNC completados: ${actual.completedConcepts} conceptos / ${actual.completedEntries} entradas con ficha.`);
  console.log(`- Pendientes de revisión: ${actual.entriesPendingReview} entradas.`);
}
