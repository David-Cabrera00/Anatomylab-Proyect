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

const muscular = anatomyIndex.filter(e => e.system === "muscular" && !e.educationalId);

console.log("=== ANÁLISIS DE MÚSCULOS SIN FICHA ===\n");

const mainMuscles = [];
const technicalGeometry = [];

for (const e of muscular) {
  const name = e.displayName;
  const binding = e.modelBindings[0]?.originalName || "";
  
  // Patrones de geometría técnica
  const isTechnical = 
    name.includes("Porción ") ||
    name.includes("Cabeza ") ||
    name.includes("Vientre ") ||
    name.includes("Tendón ") ||
    name.includes("Bolsa ") ||
    name.includes("Vaina ") ||
    name.includes("Retináculo ") ||
    name.includes("Arco tendinoso") ||
    name.includes("Ligamento ") ||
    name.includes("Aponeurosis ") ||
    name.includes("Tarso ") ||
    name.includes("Tróclea ") ||
    name.includes("Anillo tendinoso") ||
    name.includes("Partes dorsales") ||
    name.includes("Partes ventrales") ||
    name.includes("Cruciform") ||
    name.includes("Subfacial") ||
    name.includes("Trochanteric bursa") ||
    binding.includes("Subfacial") ||
    binding.includes("Trochanteric");
  
  if (isTechnical) {
    technicalGeometry.push({ id: e.id, name, binding });
  } else {
    mainMuscles.push({ id: e.id, name, binding, layer: e.layer, laterality: e.laterality });
  }
}

console.log(`MÚSCULOS PRINCIPALES SIN FICHA (${mainMuscles.length}):`);
for (const m of mainMuscles) {
  console.log(`  - ${m.id} | ${m.name} | ${m.layer} | ${m.laterality} | ${m.binding}`);
}

console.log(`\nGEOMETRÍA TÉCNICA (${technicalGeometry.length}):`);
for (const t of technicalGeometry.slice(0, 20)) {
  console.log(`  - ${t.id} | ${t.name} | ${t.binding}`);
}
if (technicalGeometry.length > 20) console.log(`  ... y ${technicalGeometry.length - 20} más`);

console.log(`\nTOTAL: ${mainMuscles.length} principales + ${technicalGeometry.length} técnicos = ${muscular.length}`);