import fs from "node:fs";
import { registerHooks } from "node:module";
import * as THREE from "three";

const MODEL_PATH = "public/models/skeletal/skeletal_overview.glb";
const OUTPUT_PATH = "src/anatomy/catalogs/skeletalModelCatalog.ts";
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

const { classifySkeletalHierarchy } = await import(
  "../src/utils/skeletal/skeletalHierarchy.ts"
);

function readGlbJson(path) {
  const buffer = fs.readFileSync(path);
  if (buffer.toString("ascii", 0, 4) !== "glTF") {
    throw new Error(`GLB esquelético inválido: ${path}`);
  }
  const jsonLength = buffer.readUInt32LE(12);
  const jsonType = buffer.toString("ascii", 16, 20);
  if (jsonType !== "JSON") {
    throw new Error(`Primer chunk GLB inesperado: ${jsonType}`);
  }
  return JSON.parse(buffer.toString("utf8", 20, 20 + jsonLength));
}

function hasSelectableGeometry(nodes, nodeIndex) {
  const node = nodes[nodeIndex];
  return node.mesh !== undefined ||
    (node.children ?? []).some((childIndex) =>
      hasSelectableGeometry(nodes, childIndex)
    );
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

  const scene = new THREE.Scene();
  const sceneDefinition = (gltf.scenes ?? [])[gltf.scene ?? 0];
  if (!sceneDefinition) throw new Error("El GLB esquelético no tiene una escena activa");
  for (const rootIndex of sceneDefinition.nodes ?? []) scene.add(objects[rootIndex]);

  return { nodes, objects, scene };
}

function collectActiveNodeIndexes(gltf) {
  const nodes = gltf.nodes ?? [];
  const sceneDefinition = (gltf.scenes ?? [])[gltf.scene ?? 0];
  const indexes = [];
  const visit = (index) => {
    indexes.push(index);
    for (const childIndex of nodes[index].children ?? []) visit(childIndex);
  };
  for (const rootIndex of sceneDefinition?.nodes ?? []) visit(rootIndex);
  return indexes;
}

const gltf = readGlbJson(MODEL_PATH);
const { nodes, objects, scene } = buildHierarchy(gltf);
const hierarchy = classifySkeletalHierarchy(scene);
if (!Object.values(hierarchy.markersFound).every(Boolean) || hierarchy.stats.other) {
  throw new Error("La jerarquía esquelética no pudo clasificar toda la geometría");
}

const activeNodeIndexes = collectActiveNodeIndexes(gltf);
const catalog = activeNodeIndexes.flatMap((nodeIndex) => {
  const originalName = nodes[nodeIndex]?.name;
  if (!originalName || !hasSelectableGeometry(nodes, nodeIndex)) return [];
  if (MOJIBAKE_PATTERN.test(originalName)) {
    throw new Error(`Mojibake en originalName esquelético: ${originalName}`);
  }
  const mesh = objects[nodeIndex];
  const layer = mesh.userData.anatomyCategory;
  if (layer !== "skeletal-axial" && layer !== "skeletal-appendicular") {
    throw new Error(`Nodo esquelético sin capa: ${originalName}`);
  }
  return [{ modelKey: "overview", originalName, hasSelectableGeometry: true, layer }];
});

const geometryStats = activeNodeIndexes.reduce((stats, nodeIndex) => {
  const meshIndex = nodes[nodeIndex]?.mesh;
  if (meshIndex === undefined) return stats;
  const primitiveCount = gltf.meshes?.[meshIndex]?.primitives?.length ?? 0;
  const layer = objects[nodeIndex].userData.anatomyCategory;
  stats.total += primitiveCount;
  if (layer === "skeletal-axial") stats.axial += primitiveCount;
  if (layer === "skeletal-appendicular") stats.appendicular += primitiveCount;
  return stats;
}, { axial: 0, appendicular: 0, total: 0 });

const names = new Set();
for (const entry of catalog) {
  if (names.has(entry.originalName)) {
    throw new Error(`OriginalName esquelético duplicado: ${entry.originalName}`);
  }
  names.add(entry.originalName);
}

const source = `import type { SkeletalHierarchyCategory } from "../../utils/skeletal/skeletalHierarchy";
import type { AnatomyModelBinding } from "../types";

/** Catálogo estático generado desde skeletal_overview.glb. */
export type SkeletalModelCatalogEntry = AnatomyModelBinding & {
  hasSelectableGeometry: true;
  layer: SkeletalHierarchyCategory;
};

export const skeletalModelCatalog = ${JSON.stringify(catalog, null, 2)} as const satisfies readonly SkeletalModelCatalogEntry[];
`;

if (process.argv.includes("--write")) {
  fs.writeFileSync(OUTPUT_PATH, source, "utf8");
  console.log(`Catálogo esquelético escrito: ${catalog.length} nodos`);
} else {
  const current = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, "utf8") : "";
  if (current !== source) throw new Error("El catálogo esquelético está desactualizado");
  console.log(`Catálogo esquelético verificado: ${catalog.length} nodos`);
}
console.log("Primitivas geométricas clasificadas:", geometryStats);
