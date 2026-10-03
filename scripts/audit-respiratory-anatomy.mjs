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
const { respiratoryModelCatalog } = await import(
  "../src/anatomy/catalogs/respiratoryModelCatalog.ts"
);
const { getRespiratoryStructure } = await import("../src/data/respiratory.ts");
const { getRespiratoryStructureName, isSuspiciousRespiratoryName } = await import(
  "../src/utils/respiratory/respiratoryNames.ts"
);

function readGlbJson(path) {
  const buffer = fs.readFileSync(path);
  if (buffer.toString("ascii", 0, 4) !== "glTF") throw new Error(`GLB respiratorio inválido: ${path}`);
  const jsonLength = buffer.readUInt32LE(12);
  if (buffer.toString("ascii", 16, 20) !== "JSON") throw new Error("Primer chunk GLB respiratorio no es JSON");
  return JSON.parse(buffer.toString("utf8", 20, 20 + jsonLength));
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

const gltf = readGlbJson("public/models/respiratory/respiratory_overview.glb");
const modelNames = (gltf.nodes ?? [])
  .filter((node) => node.mesh !== undefined)
  .map((node) => node.name)
  .filter(Boolean);
const catalogNames = respiratoryModelCatalog.map((entry) => entry.originalName);
const entries = anatomyIndex.filter((entry) => entry.system === "respiratory");
const bindingNames = entries.flatMap((entry) => entry.modelBindings.map((binding) => binding.originalName));
const bindingKeys = entries.flatMap((entry) =>
  entry.modelBindings.map((binding) => `${binding.modelKey}:${binding.originalName}`)
);
const byOriginalName = new Map(entries.flatMap((entry) =>
  entry.modelBindings.map((binding) => [binding.originalName, entry])
));
const mojibakePattern = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const suspiciousNames = modelNames.flatMap((originalName) => {
  const displayName = getRespiratoryStructureName(originalName);
  return isSuspiciousRespiratoryName(originalName) ? [{ originalName, displayName }] : [];
});
const displayNameProblems = entries
  .map((entry) => entry.displayName)
  .filter((displayName) => /\bsegm\.|\b(?:anterior|superior|inferior)\.|segmentario bronquio/i.test(displayName));
const missingEducationalData = modelNames.filter((originalName) => !getRespiratoryStructure(originalName));
const report = {
  modelGeometryNodes: modelNames.length,
  catalogNodes: respiratoryModelCatalog.length,
  anatomyEntries: entries.length,
  modelBindings: bindingNames.length,
  entriesWithEducationalId: entries.filter((entry) => entry.educationalId).length,
  layers: {
    lungs: entries.filter((entry) => entry.layer === "lungs").length,
    airways: entries.filter((entry) => entry.layer === "airways").length,
    "upper-airway": entries.filter((entry) => entry.layer === "upper-airway").length,
  },
  laterality: {
    left: entries.filter((entry) => entry.laterality === "left").length,
    right: entries.filter((entry) => entry.laterality === "right").length,
    none: entries.filter((entry) => entry.laterality === null).length,
  },
  duplicateIds: duplicates(entries.map((entry) => entry.id)),
  duplicateBindings: duplicates(bindingKeys),
  duplicateModelNames: duplicates(modelNames),
  modelNodesMissingFromCatalog: modelNames.filter((name) => !catalogNames.includes(name)),
  catalogNodesMissingFromModel: catalogNames.filter((name) => !modelNames.includes(name)),
  catalogNodesMissingFromIndex: catalogNames.filter((name) => !bindingNames.includes(name)),
  suspiciousNames,
  displayNameProblems,
  missingEducationalData,
  utf8Problems: [
    ...catalogNames,
    ...entries.flatMap((entry) => [entry.id, entry.displayName, entry.region, entry.subregion, entry.structureType]),
  ].filter((value) => typeof value === "string" && mojibakePattern.test(value)),
  preservedPilot: byOriginalName.get("Bronquio lobar medio.r")?.id,
};

const failures = [
  report.duplicateIds,
  report.duplicateBindings,
  report.duplicateModelNames,
  report.modelNodesMissingFromCatalog,
  report.catalogNodesMissingFromModel,
  report.catalogNodesMissingFromIndex,
  report.suspiciousNames,
  report.displayNameProblems,
  report.utf8Problems,
].some((items) => items.length > 0)
  || report.modelGeometryNodes !== report.catalogNodes
  || report.catalogNodes !== report.modelBindings
  || report.preservedPilot !== "respiratory.middle-lobar-bronchus.right";

console.log(JSON.stringify(report, null, 2));
if (failures) process.exitCode = 1;
