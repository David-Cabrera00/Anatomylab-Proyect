import fs from "node:fs";
import { registerHooks } from "node:module";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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
const { classifyNervousHierarchy } = await import(
  "../src/utils/nervous/nervousHierarchy.ts"
);

const modelPath = "public/models/nervous/nervous_overview.glb";
const outputPath = "src/anatomy/metadata/nervousHierarchyLayers.ts";
const buffer = fs.readFileSync(modelPath);
const arrayBuffer = buffer.buffer.slice(
  buffer.byteOffset,
  buffer.byteOffset + buffer.byteLength
);
const gltf = await new GLTFLoader().parseAsync(arrayBuffer, "public/models/nervous/");

gltf.scene.traverse((object) => {
  const loaderName = object.userData.name;
  const nodeIndex = gltf.parser.associations.get(object)?.nodes;
  const associatedName = typeof nodeIndex === "number"
    ? gltf.parser.json.nodes?.[nodeIndex]?.name
    : undefined;
  const originalName = typeof loaderName === "string" && loaderName.trim()
    ? loaderName
    : associatedName;
  if (typeof originalName === "string" && originalName.trim()) {
    object.userData.anatomyOriginalName = originalName;
  }
});

const hierarchy = classifyNervousHierarchy(gltf.scene);
if (
  !hierarchy.markersFound.centralEnd ||
  !hierarchy.markersFound.peripheralEnd ||
  hierarchy.stats.other !== 0
) {
  throw new Error("La jerarquía nerviosa no pudo clasificarse completamente");
}

const selectableNames = new Set(
  nervousModelCatalog
    .filter((entry) => entry.hasSelectableGeometry)
    .map((entry) => entry.originalName)
);
const layerByOriginalName = new Map();

gltf.scene.traverse((object) => {
  if (!(object instanceof THREE.Mesh)) return;
  let sourceObject = object;
  let originalName;
  while (sourceObject && !originalName) {
    originalName = [
      sourceObject.userData.anatomyOriginalName,
      sourceObject.userData.name,
      sourceObject.name,
    ].find((candidate) => typeof candidate === "string" && selectableNames.has(candidate));
    sourceObject = sourceObject.parent;
  }
  const layer = object.userData.anatomyCategory;
  if (!originalName || typeof layer !== "string") return;
  const previous = layerByOriginalName.get(originalName);
  if (previous && previous !== layer) {
    throw new Error(`Capas nerviosas incompatibles para ${originalName}`);
  }
  layerByOriginalName.set(originalName, layer);
});

const missing = [...selectableNames].filter((name) => !layerByOriginalName.has(name));
if (missing.length) {
  throw new Error(`Estructuras nerviosas sin capa jerárquica:\n${missing.join("\n")}`);
}

const lines = nervousModelCatalog
  .filter((entry) => entry.hasSelectableGeometry)
  .map((entry) => `  ${JSON.stringify(entry.originalName)}: ${JSON.stringify(layerByOriginalName.get(entry.originalName))},`);
const source = [
  'import type { AnatomyDivisionId } from "../types";',
  "",
  "/** Capas estáticas generadas desde la jerarquía validada del GLB nervioso. */",
  "export const nervousLayerByOriginalName = {",
  ...lines,
  "} as const satisfies Readonly<Record<string, AnatomyDivisionId>>;",
  "",
].join("\n");

if (process.argv.includes("--write")) {
  fs.writeFileSync(outputPath, source, "utf8");
  console.log(`Escritas ${lines.length} capas nerviosas en ${outputPath}`);
} else {
  console.log(`Se generarían ${lines.length} capas nerviosas en ${outputPath}`);
}
