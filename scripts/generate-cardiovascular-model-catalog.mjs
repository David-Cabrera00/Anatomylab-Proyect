import fs from "node:fs";
import { registerHooks } from "node:module";

const MODELS = [
  { modelKey: "overview", path: "public/models/cardiovascular/cardiovascular_overview_v2.glb" },
  { modelKey: "heart-detail", path: "public/models/cardiovascular/cardiovascular_bodyparts.glb" },
];
const CATALOG_PATH = "src/anatomy/catalogs/cardiovascularModelCatalog.ts";
const IDS_PATH = "src/anatomy/metadata/cardiovascularStableIds.ts";
const MOJIBAKE_PATTERN = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
      const url = new URL(`${specifier}.ts`, context.parentURL);
      if (fs.existsSync(url)) return { url: url.href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});

const { getStructureCategory, isInvalidStructureName } = await import(
  "../src/utils/cardiovascular/cardiovascularNames.ts"
);
const { cardiovascularStableIdByOriginalName } = await import(
  "../src/anatomy/metadata/cardiovascularStableIds.ts"
);
const { cardiovascularData } = await import("../src/data/cardiovascular.ts");

function readGlbJson(path) {
  const buffer = fs.readFileSync(path);
  if (buffer.toString("ascii", 0, 4) !== "glTF") throw new Error(`GLB cardiovascular inválido: ${path}`);
  const jsonLength = buffer.readUInt32LE(12);
  if (buffer.toString("ascii", 16, 20) !== "JSON") throw new Error(`Primer chunk GLB inesperado: ${path}`);
  return JSON.parse(buffer.toString("utf8", 20, 20 + jsonLength));
}

function activeNodeIndexes(gltf) {
  const nodes = gltf.nodes ?? [];
  const scene = (gltf.scenes ?? [])[gltf.scene ?? 0];
  if (!scene) throw new Error("El GLB cardiovascular no tiene una escena activa");
  const result = [];
  const visit = (index) => {
    result.push(index);
    for (const child of nodes[index].children ?? []) visit(child);
  };
  for (const root of scene.nodes ?? []) visit(root);
  return result;
}

const layerByCategory = { heart: "heart", artery: "arteries", vein: "veins" };
const catalog = [];
const geometryByModel = {};
const ignoredByModel = {};
for (const model of MODELS) {
  const gltf = readGlbJson(model.path);
  const nodes = gltf.nodes ?? [];
  const active = activeNodeIndexes(gltf);
  const meshNodes = active.filter((index) => nodes[index].mesh !== undefined);
  geometryByModel[model.modelKey] = meshNodes.length;
  ignoredByModel[model.modelKey] = [];
  for (const nodeIndex of meshNodes) {
    const originalName = nodes[nodeIndex].name;
    if (!originalName?.trim()) throw new Error(`Nodo cardiovascular sin originalName: ${model.modelKey}:${nodeIndex}`);
    if (MOJIBAKE_PATTERN.test(originalName)) throw new Error(`Mojibake cardiovascular: ${originalName}`);
    if (isInvalidStructureName(originalName)) {
      ignoredByModel[model.modelKey].push(originalName);
      continue;
    }
    const category = getStructureCategory(originalName);
    const layer = layerByCategory[category];
    if (!layer) throw new Error(`Nodo cardiovascular sin layer: ${model.modelKey}:${originalName}`);
    catalog.push({ modelKey: model.modelKey, originalName, hasSelectableGeometry: true, layer });
  }
}

const bindingKeys = new Set();
for (const entry of catalog) {
  const key = `${entry.modelKey}:${entry.originalName}`;
  if (bindingKeys.has(key)) throw new Error(`Binding cardiovascular duplicado: ${key}`);
  bindingKeys.add(key);
}

const educationalNames = new Set(Object.keys(cardiovascularData).map((id) => id.replace(/_/g, " ")));
const modelNames = [...new Set(catalog.map((entry) => entry.originalName))];
const existingIds = { ...cardiovascularStableIdByOriginalName };
const usedIds = new Set(Object.values(existingIds));
let nextNumber = Math.max(0, ...[...usedIds].map((id) => Number(id.match(/model-node-(\d+)$/)?.[1] ?? 0))) + 1;
for (const originalName of modelNames) {
  if (educationalNames.has(originalName) || existingIds[originalName]) continue;
  if (!process.argv.includes("--write")) throw new Error(`Nueva estructura cardiovascular sin stable Anatomy ID: ${originalName}`);
  let anatomyId;
  do anatomyId = `cardiovascular.model-node-${String(nextNumber++).padStart(4, "0")}`;
  while (usedIds.has(anatomyId));
  existingIds[originalName] = anatomyId;
  usedIds.add(anatomyId);
}
for (const originalName of Object.keys(existingIds)) {
  if (!modelNames.includes(originalName)) throw new Error(`Stable Anatomy ID cardiovascular sin nodo: ${originalName}`);
}

const catalogSource = `import type { AnatomyDivisionId, AnatomyModelBinding } from "../types";

export type CardiovascularModelCatalogEntry = AnatomyModelBinding & {
  hasSelectableGeometry: true;
  layer: Extract<AnatomyDivisionId, "heart" | "arteries" | "veins">;
};

/** Catálogo estático generado desde los GLB cardiovasculares activos. */
export const cardiovascularModelCatalog = ${JSON.stringify(catalog, null, 2)} as const satisfies readonly CardiovascularModelCatalogEntry[];
`;
const idsSource = `/** Identidades persistentes para nodos cardiovasculares sin ficha educativa. */
export const cardiovascularStableIdByOriginalName = ${JSON.stringify(existingIds, null, 2)} as const;
`;

if (process.argv.includes("--write")) {
  fs.writeFileSync(CATALOG_PATH, catalogSource, "utf8");
  fs.writeFileSync(IDS_PATH, idsSource, "utf8");
  console.log(`Catálogo cardiovascular escrito: ${catalog.length} bindings`);
  console.log(`Identidades cardiovasculares persistentes: ${Object.keys(existingIds).length}`);
} else {
  if (!fs.existsSync(CATALOG_PATH) || fs.readFileSync(CATALOG_PATH, "utf8") !== catalogSource) {
    throw new Error("El catálogo cardiovascular está desactualizado");
  }
  if (fs.readFileSync(IDS_PATH, "utf8") !== idsSource) {
    throw new Error("Las identidades cardiovasculares están desactualizadas");
  }
  console.log(`Catálogo cardiovascular verificado: ${catalog.length} bindings`);
}
console.log("Geometrías por modelo:", geometryByModel);
console.log("Nodos técnicos excluidos:", ignoredByModel);
