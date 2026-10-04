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
const { cardiovascularModelCatalog } = await import(
  "../src/anatomy/catalogs/cardiovascularModelCatalog.ts"
);
const { createCardiovascularAnatomyEntries } = await import(
  "../src/anatomy/cardiovascularAdapter.ts"
);
const { cardiovascularStableIdByOriginalName } = await import(
  "../src/anatomy/metadata/cardiovascularStableIds.ts"
);
const { cardiovascularData } = await import("../src/data/cardiovascular.ts");
const { getUnknownAnatomyWords, isInvalidStructureName } = await import(
  "../src/utils/cardiovascular/cardiovascularNames.ts"
);

const MODELS = [
  { modelKey: "overview", path: "public/models/cardiovascular/cardiovascular_overview_v2.glb" },
  { modelKey: "heart-detail", path: "public/models/cardiovascular/cardiovascular_bodyparts.glb" },
];

function readGlbJson(path) {
  const buffer = fs.readFileSync(path);
  const jsonLength = buffer.readUInt32LE(12);
  return JSON.parse(buffer.toString("utf8", 20, 20 + jsonLength));
}

function activeNodeIndexes(gltf) {
  const nodes = gltf.nodes ?? [];
  const scene = (gltf.scenes ?? [])[gltf.scene ?? 0];
  const result = [];
  const visit = (index) => {
    result.push(index);
    for (const child of nodes[index].children ?? []) visit(child);
  };
  for (const root of scene?.nodes ?? []) visit(root);
  return result;
}

function duplicates(values) {
  const seen = new Set();
  const result = new Set();
  for (const value of values) {
    if (seen.has(value)) result.add(value);
    seen.add(value);
  }
  return [...result];
}

const modelBindings = [];
const geometry = {};
const ignoredTechnicalNodes = [];
for (const model of MODELS) {
  const gltf = readGlbJson(model.path);
  const nodes = gltf.nodes ?? [];
  const meshNodes = activeNodeIndexes(gltf).filter((index) => nodes[index].mesh !== undefined);
  geometry[model.modelKey] = meshNodes.length;
  for (const nodeIndex of meshNodes) {
    const originalName = nodes[nodeIndex].name;
    if (isInvalidStructureName(originalName)) {
      ignoredTechnicalNodes.push(`${model.modelKey}:${originalName}`);
    } else {
      modelBindings.push(`${model.modelKey}:${originalName}`);
    }
  }
}

const entries = anatomyIndex.filter((entry) => entry.system === "cardiovascular");
const indexBindings = entries.flatMap((entry) =>
  entry.modelBindings.map((binding) => `${binding.modelKey}:${binding.originalName}`)
);
const catalogBindings = cardiovascularModelCatalog.map((entry) => `${entry.modelKey}:${entry.originalName}`);
const unknownWords = new Set();
for (const entry of cardiovascularModelCatalog) {
  for (const word of getUnknownAnatomyWords(entry.originalName)) unknownWords.add(word);
}
const reversedEntries = createCardiovascularAnatomyEntries([...cardiovascularModelCatalog].reverse());
const idByBinding = new Map(entries.flatMap((entry) =>
  entry.modelBindings.map((binding) => [`${binding.modelKey}:${binding.originalName}`, entry.id])
));
const reversedIdByBinding = new Map(reversedEntries.flatMap((entry) =>
  entry.modelBindings.map((binding) => [`${binding.modelKey}:${binding.originalName}`, entry.id])
));
const changedIdsAfterReorder = [...idByBinding].flatMap(([key, id]) =>
  reversedIdByBinding.get(key) === id ? [] : [{ binding: key, before: id, after: reversedIdByBinding.get(key) }]
);
const educationalIds = new Set(Object.keys(cardiovascularData));
const stableIds = Object.values(cardiovascularStableIdByOriginalName);
const mojibakePattern = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const csvText = fs.readFileSync(
  "public/data/csv/cardiovascular_missing_educational_filled.csv",
  "utf8"
);
const csvRows = csvText.trim().split(/\r?\n/).slice(1);
const csvStableIds = new Set();
const invalidCsvRows = [];
const csvNamesMissingStableId = [];
for (const [index, row] of csvRows.entries()) {
  const match = row.match(/^"([^"]+)","([^"]+)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"$/);
  if (!match) {
    invalidCsvRows.push(index + 2);
    continue;
  }
  const [, originalName, , description, func, location] = match;
  const stableId = cardiovascularStableIdByOriginalName[originalName];
  if (!stableId) {
    csvNamesMissingStableId.push(originalName);
    continue;
  }
  if (![description, func, location].every((value) => value.trim())) {
    invalidCsvRows.push(index + 2);
    continue;
  }
  csvStableIds.add(stableId);
}
const entriesWithoutEducationalContent = entries
  .filter((entry) => !entry.educationalId && !csvStableIds.has(entry.id))
  .map((entry) => entry.id);

const report = {
  glb: { geometry, totalMeshNodes: Object.values(geometry).reduce((sum, count) => sum + count, 0) },
  catalogBindings: catalogBindings.length,
  anatomyEntries: entries.length,
  indexBindings: indexBindings.length,
  entriesWithEducationalId: entries.filter((entry) => entry.educationalId).length,
  educationalCoverage: {
    csvRows: csvRows.length,
    csvStableIds: csvStableIds.size,
    coveredEntries: entries.length - entriesWithoutEducationalContent.length,
    entriesWithoutEducationalContent,
    invalidCsvRows,
    csvNamesMissingStableId,
  },
  entriesWithMultipleBindings: entries.filter((entry) => entry.modelBindings.length > 1).length,
  layers: {
    heart: entries.filter((entry) => entry.layer === "heart").length,
    arteries: entries.filter((entry) => entry.layer === "arteries").length,
    veins: entries.filter((entry) => entry.layer === "veins").length,
  },
  laterality: {
    left: entries.filter((entry) => entry.laterality === "left").length,
    right: entries.filter((entry) => entry.laterality === "right").length,
    none: entries.filter((entry) => entry.laterality === null).length,
  },
  stability: {
    explicitModelNodeIds: stableIds.length,
    duplicateStableIds: duplicates(stableIds),
    changedIdsAfterReorder,
  },
  duplicateIds: duplicates(entries.map((entry) => entry.id)),
  duplicateCatalogBindings: duplicates(catalogBindings),
  duplicateIndexBindings: duplicates(indexBindings),
  modelBindingsMissingFromCatalog: modelBindings.filter((key) => !catalogBindings.includes(key)),
  catalogBindingsMissingFromModel: catalogBindings.filter((key) => !modelBindings.includes(key)),
  catalogBindingsMissingFromIndex: catalogBindings.filter((key) => !indexBindings.includes(key)),
  invalidEducationalIds: entries.flatMap((entry) =>
    entry.educationalId && !educationalIds.has(entry.educationalId) ? [entry.educationalId] : []
  ),
  unknownTranslationWords: [...unknownWords].sort(),
  invalidDisplayNames: entries.map((entry) => entry.displayName).filter((name) => name === "Estructura sin identificar"),
  utf8Problems: [
    ...cardiovascularModelCatalog.map((entry) => entry.originalName),
    ...entries.flatMap((entry) => [entry.id, entry.displayName, entry.region, entry.subregion, entry.structureType]),
  ].filter((value) => typeof value === "string" && mojibakePattern.test(value)),
  ignoredTechnicalNodes,
  preservedPilot: idByBinding.get("overview:Inferior vena cava (thoracic part)"),
};

console.log(JSON.stringify(report, null, 2));
const failures = [
  report.stability.duplicateStableIds,
  report.stability.changedIdsAfterReorder,
  report.duplicateIds,
  report.duplicateCatalogBindings,
  report.duplicateIndexBindings,
  report.modelBindingsMissingFromCatalog,
  report.catalogBindingsMissingFromModel,
  report.catalogBindingsMissingFromIndex,
  report.invalidEducationalIds,
  report.educationalCoverage.entriesWithoutEducationalContent,
  report.educationalCoverage.invalidCsvRows,
  report.educationalCoverage.csvNamesMissingStableId,
  report.unknownTranslationWords,
  report.invalidDisplayNames,
  report.utf8Problems,
].some((items) => items.length > 0)
  || report.catalogBindings !== modelBindings.length
  || report.indexBindings !== report.catalogBindings
  || report.preservedPilot !== "cardiovascular.inferior-vena-cava.thoracic";
if (failures) process.exitCode = 1;
