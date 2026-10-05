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
const { cardiovascularStableIdByOriginalName } = await import("../src/anatomy/metadata/cardiovascularStableIds.ts");

const cardiovascularCsvIds = new Set(
  fs.readFileSync("public/data/csv/cardiovascular_missing_educational_filled.csv", "utf8")
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .flatMap((row) => {
      const match = row.match(/^"([^"]+)",/);
      const stableId = match ? cardiovascularStableIdByOriginalName[match[1]] : undefined;
      return stableId ? [stableId] : [];
    })
);

const hasEducationalContent = (entry) => Boolean(
  entry.educationalId || (entry.system === "cardiovascular" && cardiovascularCsvIds.has(entry.id))
);

const systems = [
  "cardiovascular",
  "respiratory",
  "nervous",
  "skeletal",
  "muscular",
  "digestive"
];

const results = {};

for (const system of systems) {
  const entries = anatomyIndex.filter(e => e.system === system);
  const total = entries.length;
  const withEducational = entries.filter(hasEducationalContent).length;
  const withoutEducational = total - withEducational;
  const coverage = ((withEducational / total) * 100).toFixed(1);

  results[system] = {
    total,
    withEducational,
    withoutEducational,
    coverage: `${coverage}%`
  };

  console.log(`${system}: ${withEducational}/${total} (${coverage}%) - ${withoutEducational} sin ficha`);
}

console.log("\n--- RESUMEN ---");
const grandTotal = Object.values(results).reduce((sum, r) => sum + r.total, 0);
const grandWith = Object.values(results).reduce((sum, r) => sum + r.withEducational, 0);
const grandWithout = grandTotal - grandWith;
console.log(`Total: ${grandWith}/${grandTotal} (${((grandWith/grandTotal)*100).toFixed(1)}%) - ${grandWithout} sin ficha`);

// Detalle de estructuras sin ficha por sistema
console.log("\n--- ESTRUCTURAS SIN FICHA (por sistema) ---");
for (const system of systems) {
  const entries = anatomyIndex.filter(e => e.system === system && !hasEducationalContent(e));
  if (entries.length > 0) {
    console.log(`\n${system.toUpperCase()} (${entries.length}):`);
    for (const e of entries) {
      console.log(`  - ${e.id} | ${e.displayName} | layer:${e.layer} | lat:${e.laterality} | bindings:${e.modelBindings.map(b=>b.originalName).join(",")}`);
    }
  }
}
