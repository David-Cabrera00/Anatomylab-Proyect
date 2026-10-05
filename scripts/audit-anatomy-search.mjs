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

const { anatomyIndex } = await import("../src/anatomy/anatomyIndex.ts");
const { anatomySearchIndex, searchAnatomy } = await import(
  "../src/search/anatomySearchIndex.ts"
);

const duplicateIds = anatomySearchIndex
  .map((entry) => entry.anatomyId)
  .filter((id, index, ids) => ids.indexOf(id) !== index);
const anatomyIds = new Set(anatomyIndex.map((entry) => entry.id));
const orphanSearchEntries = anatomySearchIndex
  .filter((entry) => !anatomyIds.has(entry.anatomyId))
  .map((entry) => entry.anatomyId);

const expectations = [
  ["digestive.liver", "digestive.liver"],
  ["pancreas", "digestive.pancreas"],
  ["esquelético", "skeletal.scapula.left"],
  ["izquierda", "skeletal.scapula.left"],
  ["abdomen", "digestive.liver"],
  ["pulmones", "respiratory.lower-lobe.left"],
];
const missingExpectedResults = expectations.flatMap(([query, anatomyId]) =>
  searchAnatomy(query, { limit: anatomySearchIndex.length })
    .some((entry) => entry.anatomyId === anatomyId)
    ? []
    : [{ query, anatomyId }]
);
const wrongSystemFilterResults = searchAnatomy("sistema", { system: "digestive", limit: anatomySearchIndex.length })
  .filter((entry) => entry.system !== "digestive")
  .map((entry) => entry.anatomyId);
const wrongLateralityFilterResults = searchAnatomy("izquierda", { laterality: "left", limit: anatomySearchIndex.length })
  .filter((entry) => entry.laterality !== "left")
  .map((entry) => entry.anatomyId);

const report = {
  anatomyEntries: anatomyIndex.length,
  searchEntries: anatomySearchIndex.length,
  duplicateIds,
  orphanSearchEntries,
  missingExpectedResults,
  wrongSystemFilterResults,
  wrongLateralityFilterResults,
};

console.log(JSON.stringify(report, null, 2));

if (
  report.anatomyEntries !== report.searchEntries
  || duplicateIds.length
  || orphanSearchEntries.length
  || missingExpectedResults.length
  || wrongSystemFilterResults.length
  || wrongLateralityFilterResults.length
) process.exitCode = 1;
