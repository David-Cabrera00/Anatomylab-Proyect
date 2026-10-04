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

const { nervousModelCatalog } = await import(
  "../src/anatomy/catalogs/nervousModelCatalog.ts"
);
const { nervousStableIdByOriginalName } = await import(
  "../src/anatomy/metadata/nervousStableIds.ts"
);

const outputPath = "src/anatomy/metadata/nervousModelNodeStableIds.ts";
let existing = {};
if (fs.existsSync(outputPath)) {
  ({ nervousModelNodeStableIdByOriginalName: existing } = await import(
    `../${outputPath}?updated=${Date.now()}`
  ));
}

const selectableNames = nervousModelCatalog
  .filter((entry) => entry.hasSelectableGeometry)
  .map((entry) => entry.originalName);
const selectableNameSet = new Set(selectableNames);
const staleNames = Object.keys(existing).filter((name) => !selectableNameSet.has(name));
if (staleNames.length) {
  throw new Error(`IDs nerviosos sin geometría seleccionable:\n${staleNames.join("\n")}`);
}

const combinedIds = new Set([
  ...Object.values(nervousStableIdByOriginalName),
  ...Object.values(existing),
]);
if (combinedIds.size !== Object.keys(nervousStableIdByOriginalName).length + Object.keys(existing).length) {
  throw new Error("El registro nervioso contiene IDs duplicados");
}

let nextNumber = Math.max(
  0,
  ...Object.values(existing).map((id) => {
    const match = id.match(/^nervous\.model-node-(\d+)$/);
    return match ? Number(match[1]) : 0;
  })
) + 1;
const generated = { ...existing };
const missingNames = selectableNames
  .filter((name) => !(name in nervousStableIdByOriginalName) && !(name in generated))
  .sort();

for (const originalName of missingNames) {
  let id;
  do {
    id = `nervous.model-node-${String(nextNumber).padStart(4, "0")}`;
    nextNumber += 1;
  } while (combinedIds.has(id));
  generated[originalName] = id;
  combinedIds.add(id);
}

const lines = Object.entries(generated)
  .sort(([, leftId], [, rightId]) => leftId.localeCompare(rightId))
  .map(([originalName, id]) => `  ${JSON.stringify(originalName)}: ${JSON.stringify(id)},`);
const source = [
  "/** IDs persistentes explícitos para mallas nerviosas sin identidad educativa. */",
  "export const nervousModelNodeStableIdByOriginalName = {",
  ...lines,
  "} as const satisfies Readonly<Record<string, string>>;",
  "",
].join("\n");

if (process.argv.includes("--write")) {
  fs.writeFileSync(outputPath, source, "utf8");
  console.log(`Escritos ${lines.length} IDs nerviosos en ${outputPath}`);
} else {
  console.log(`Se conservarían ${Object.keys(existing).length} IDs y se añadirían ${missingNames.length}`);
}
