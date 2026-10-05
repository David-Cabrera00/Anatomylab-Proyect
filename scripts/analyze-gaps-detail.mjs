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

// Skeletal: 19 sin ficha
const skeletal = anatomyIndex.filter(e => e.system === "skeletal" && !e.educationalId);
console.log("=== SKELETAL (19 sin ficha) ===");
for (const e of skeletal) {
  console.log(`  - ${e.id} | ${e.displayName} | layer:${e.layer} | lat:${e.laterality} | bindings:${e.modelBindings.map(b=>b.originalName).join(",")}`);
}

// Nervous: 2 sin ficha
const nervous = anatomyIndex.filter(e => e.system === "nervous" && !e.educationalId);
console.log("\n=== NERVOUS (2 sin ficha) ===");
for (const e of nervous) {
  console.log(`  - ${e.id} | ${e.displayName} | layer:${e.layer} | lat:${e.laterality} | bindings:${e.modelBindings.map(b=>b.originalName).join(",")}`);
}

// Muscular: analizar patrones
const muscular = anatomyIndex.filter(e => e.system === "muscular" && !e.educationalId);
console.log("\n=== MUSCULAR - ANÁLISIS DE PATRONES ===");
const byLayer = {};
for (const e of muscular) {
  const layer = e.layer || "sin-layer";
  if (!byLayer[layer]) byLayer[layer] = [];
  byLayer[layer].push(e);
}
for (const [layer, entries] of Object.entries(byLayer)) {
  console.log(`\n${layer} (${entries.length}):`);
  // Agrupar por nombre base (sin sufijo .l/.r)
  const groups = {};
  for (const e of entries) {
    const base = e.displayName.replace(/\s+(izquierd[oa]|derech[oa])$/, "").replace(/\s+\(.*\)$/, "");
    if (!groups[base]) groups[base] = [];
    groups[base].push(e);
  }
  for (const [base, items] of Object.entries(groups)) {
    console.log(`  ${base} (${items.length} entradas)`);
    if (items.length <= 4) {
      for (const i of items) console.log(`    - ${i.id} | lat:${i.laterality} | binding:${i.modelBindings[0]?.originalName}`);
    }
  }
}

// Respiratory: analizar patrones
const respiratory = anatomyIndex.filter(e => e.system === "respiratory" && !e.educationalId);
console.log("\n=== RESPIRATORY (26 sin ficha) ===");
for (const e of respiratory) {
  console.log(`  - ${e.id} | ${e.displayName} | layer:${e.layer} | lat:${e.laterality} | bindings:${e.modelBindings.map(b=>b.originalName).join(",")}`);
}