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
const { skeletalModelCatalog } = await import(
  "../src/anatomy/catalogs/skeletalModelCatalog.ts"
);
const { skeletalEducationalGroups } = await import("../src/data/skeletal.ts");

const entries = anatomyIndex.filter((entry) => entry.system === "skeletal");
const catalogNames = new Set(skeletalModelCatalog.map((entry) => entry.originalName));
const educationalBindings = Object.values(skeletalEducationalGroups).flat().flatMap((binding) =>
  (binding.originalNames ?? [binding.originalName]).map((originalName) => ({
    originalName,
    educationalId: binding.data.id,
  }))
);
const bindingKeys = entries.flatMap((entry) =>
  entry.modelBindings.map((binding) => `${binding.modelKey}:${binding.originalName}`)
);

function duplicates(values) {
  const seen = new Set();
  const duplicateValues = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicateValues.add(value);
    seen.add(value);
  }
  return [...duplicateValues];
}

const mojibakePattern = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const utf8Problems = [
  ...skeletalModelCatalog.map((entry) => entry.originalName),
  ...entries.flatMap((entry) => [
    entry.id,
    entry.displayName,
    entry.region,
    entry.subregion,
    entry.structureType,
    entry.educationalId,
    ...entry.keywords,
  ]),
].filter((value) => typeof value === "string" && mojibakePattern.test(value));

const requestedCases = [
  "Escápula.l",
  "Escápula.r",
  "Hueso coxal.l",
  "Hueso coxal.r",
  "Primera costilla.l",
  "Primera costilla.r",
  "Hueso Fémur.l",
  "Hueso Fémur.r",
  "Cartílago cricoides",
];
const byOriginalName = new Map(entries.flatMap((entry) =>
  entry.modelBindings.map((binding) => [binding.originalName, entry])
));

const examples = requestedCases.map((originalName) => {
  const entry = byOriginalName.get(originalName);
  if (!entry) throw new Error(`Caso esquelético ausente: ${originalName}`);
  return {
    originalName,
    anatomyId: entry.id,
    displayName: entry.displayName,
    layer: entry.layer,
    laterality: entry.laterality,
    educationalId: entry.educationalId ?? null,
  };
});

console.log(JSON.stringify({
  catalogNodes: skeletalModelCatalog.length,
  anatomyEntries: entries.length,
  modelBindings: bindingKeys.length,
  entriesWithEducationalId: entries.filter((entry) => entry.educationalId).length,
  entriesWithoutEducationalId: entries.filter((entry) => !entry.educationalId).length,
  uniqueEducationalIds: new Set(entries.flatMap((entry) => entry.educationalId ?? [])).size,
  layers: {
    "skeletal-axial": entries.filter((entry) => entry.layer === "skeletal-axial").length,
    "skeletal-appendicular": entries.filter((entry) => entry.layer === "skeletal-appendicular").length,
  },
  laterality: {
    left: entries.filter((entry) => entry.laterality === "left").length,
    right: entries.filter((entry) => entry.laterality === "right").length,
    none: entries.filter((entry) => entry.laterality === null).length,
  },
  duplicateIds: duplicates(entries.map((entry) => entry.id)),
  duplicateBindings: duplicates(bindingKeys),
  educationalBindingsMissingFromCatalog: educationalBindings
    .filter((binding) => !catalogNames.has(binding.originalName))
    .map((binding) => binding.originalName),
  utf8Problems,
  preservedPilots: {
    "Escápula.l": byOriginalName.get("Escápula.l")?.id,
    "Hueso coxal.r": byOriginalName.get("Hueso coxal.r")?.id,
  },
  requestedNameCorrections: {
    "Fémur.l": "Hueso Fémur.l",
    "Fémur.r": "Hueso Fémur.r",
  },
  examples,
}, null, 2));
