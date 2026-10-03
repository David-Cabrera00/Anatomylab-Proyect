import fs from "node:fs";
import { registerHooks } from "node:module";
import * as THREE from "three";

const MODEL_PATH = "public/models/muscular/muscular_overview.glb";
const OUTPUT_PATH = "src/anatomy/catalogs/muscularModelCatalog.ts";
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

const { classifyMuscularHierarchy } = await import(
  "../src/utils/muscular/muscularHierarchy.ts"
);
const { muscularStableIdByOriginalName } = await import(
  "../src/anatomy/metadata/muscularStableIds.ts"
);
const { muscularEducationalGroups } = await import("../src/data/muscular.ts");

const educationalNames = new Set(
  Object.values(muscularEducationalGroups).flat().flatMap((binding) =>
    binding.originalNames ?? [binding.originalName]
  )
);

function readGlbJson(path) {
  const buffer = fs.readFileSync(path);
  if (buffer.toString("ascii", 0, 4) !== "glTF") {
    throw new Error(`GLB muscular inválido: ${path}`);
  }
  const jsonLength = buffer.readUInt32LE(12);
  if (buffer.toString("ascii", 16, 20) !== "JSON") {
    throw new Error("El primer chunk del GLB muscular no es JSON");
  }
  return JSON.parse(buffer.toString("utf8", 20, 20 + jsonLength));
}

function buildHierarchy(gltf) {
  const nodes = gltf.nodes ?? [];
  const objects = nodes.map((node) => {
    const object = node.mesh === undefined ? new THREE.Object3D() : new THREE.Mesh();
    object.name = node.name ?? "";
    return object;
  });
  nodes.forEach((node, index) => {
    for (const childIndex of node.children ?? []) objects[index].add(objects[childIndex]);
  });

  const sceneDefinition = (gltf.scenes ?? [])[gltf.scene ?? 0];
  if (!sceneDefinition) throw new Error("El GLB muscular no tiene una escena activa");
  const scene = new THREE.Scene();
  for (const rootIndex of sceneDefinition.nodes ?? []) scene.add(objects[rootIndex]);
  return { nodes, objects, scene, sceneDefinition };
}

function collectActiveNodeIndexes(nodes, sceneDefinition) {
  const indexes = [];
  const visit = (index) => {
    indexes.push(index);
    for (const childIndex of nodes[index].children ?? []) visit(childIndex);
  };
  for (const rootIndex of sceneDefinition.nodes ?? []) visit(rootIndex);
  return indexes;
}

const gltf = readGlbJson(MODEL_PATH);
const { nodes, objects, scene, sceneDefinition } = buildHierarchy(gltf);
const hierarchy = classifyMuscularHierarchy(scene);
if (!Object.values(hierarchy.markersFound).every(Boolean)) {
  throw new Error("La jerarquía muscular no encontró todos sus marcadores");
}

const activeNodeIndexes = collectActiveNodeIndexes(nodes, sceneDefinition);
const ignoredNodeNames = activeNodeIndexes.flatMap((nodeIndex) =>
  nodes[nodeIndex].mesh !== undefined && objects[nodeIndex].userData.anatomyIgnore === true
    ? [nodes[nodeIndex].name]
    : []
);
if (ignoredNodeNames.length !== 1 || ignoredNodeNames[0] !== "Sistema muscular.g") {
  throw new Error(`Raíces técnicas musculares inesperadas: ${ignoredNodeNames.join(", ")}`);
}

const catalog = activeNodeIndexes.flatMap((nodeIndex) => {
  const node = nodes[nodeIndex];
  if (node.mesh === undefined || objects[nodeIndex].userData.anatomyIgnore === true) return [];
  const originalName = node.name;
  if (!originalName?.trim()) throw new Error(`Nodo muscular sin originalName: ${nodeIndex}`);
  if (MOJIBAKE_PATTERN.test(originalName)) {
    throw new Error(`Mojibake en originalName muscular: ${originalName}`);
  }

  const layer = objects[nodeIndex].userData.anatomyCategory;
  if (![
    "muscular-head-neck",
    "muscular-trunk",
    "muscular-upper-limb",
    "muscular-lower-limb",
  ].includes(layer)) {
    throw new Error(`Nodo muscular sin layer: ${originalName}`);
  }

  return [{
    modelKey: "overview",
    originalName,
    hasSelectableGeometry: true,
    layer,
  }];
});

const names = new Set();
for (const entry of catalog) {
  if (names.has(entry.originalName)) {
    throw new Error(`OriginalName muscular duplicado: ${entry.originalName}`);
  }
  names.add(entry.originalName);
  if (!educationalNames.has(entry.originalName) && !muscularStableIdByOriginalName[entry.originalName]) {
    throw new Error(`Nueva estructura muscular sin stable Anatomy ID: ${entry.originalName}`);
  }
}

const stableIds = new Set();
for (const [originalName, anatomyId] of Object.entries(muscularStableIdByOriginalName)) {
  if (!names.has(originalName)) {
    throw new Error(`Stable Anatomy ID muscular sin nodo de catálogo: ${originalName}`);
  }
  if (stableIds.has(anatomyId)) {
    throw new Error(`Stable Anatomy ID muscular duplicado: ${anatomyId}`);
  }
  stableIds.add(anatomyId);
}

const primitiveStats = activeNodeIndexes.reduce((stats, nodeIndex) => {
  const meshIndex = nodes[nodeIndex].mesh;
  if (meshIndex === undefined) return stats;
  const count = gltf.meshes?.[meshIndex]?.primitives?.length ?? 0;
  stats.total += count;
  if (objects[nodeIndex].userData.anatomyIgnore === true) {
    stats.ignored += count;
    return stats;
  }
  const layer = objects[nodeIndex].userData.anatomyCategory;
  if (layer === "muscular-head-neck") stats.headNeck += count;
  if (layer === "muscular-trunk") stats.trunk += count;
  if (layer === "muscular-upper-limb") stats.upperLimb += count;
  if (layer === "muscular-lower-limb") stats.lowerLimb += count;
  return stats;
}, { headNeck: 0, trunk: 0, upperLimb: 0, lowerLimb: 0, ignored: 0, total: 0 });

const source = `import type { AnatomyDivisionId, AnatomyModelBinding } from "../types";

export type MuscularModelCatalogEntry = AnatomyModelBinding & {
  hasSelectableGeometry: true;
  layer: Extract<
    AnatomyDivisionId,
    | "muscular-head-neck"
    | "muscular-trunk"
    | "muscular-upper-limb"
    | "muscular-lower-limb"
  >;
};

/** Catálogo estático generado desde muscular_overview.glb. */
export const muscularModelCatalog = ${JSON.stringify(catalog, null, 2)} as const satisfies readonly MuscularModelCatalogEntry[];
`;

if (process.argv.includes("--write")) {
  fs.writeFileSync(OUTPUT_PATH, source, "utf8");
  console.log(`Catálogo muscular escrito: ${catalog.length} nodos`);
} else {
  const current = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, "utf8") : "";
  if (current !== source) throw new Error("El catálogo muscular está desactualizado");
  console.log(`Catálogo muscular verificado: ${catalog.length} nodos`);
}
console.log("Primitivas musculares clasificadas:", primitiveStats);
console.log("Nodos técnicos excluidos:", ignoredNodeNames);
