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
const { nervousModelCatalog } = await import(
  "../src/anatomy/catalogs/nervousModelCatalog.ts"
);
const { nervousEducationalGroups } = await import("../src/data/nervous.ts");
const { createNervousAnatomyEntries } = await import("../src/anatomy/nervousAdapter.ts");
const { nervousStableIdByOriginalName } = await import("../src/anatomy/metadata/nervousStableIds.ts");
const { classifyNervousHierarchy } = await import("../src/utils/nervous/nervousHierarchy.ts");

const entries = anatomyIndex.filter((entry) => entry.system === "nervous");
const catalogByName = new Map(nervousModelCatalog.map((entry) => [entry.originalName, entry]));
const bindings = entries.flatMap((entry) => entry.modelBindings.map((binding) => ({
  key: `${binding.modelKey}:${binding.originalName}`,
  originalName: binding.originalName,
  anatomyId: entry.id,
})));
const educationalBindings = Object.values(nervousEducationalGroups).flat().flatMap((entry) =>
  (entry.originalNames ?? [entry.originalName]).map((originalName) => ({
    originalName,
    educationalId: entry.data.id,
  }))
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

const withoutLaterality = (originalName) => originalName.replace(/\.(?:l|r)$/i, "");

const nodesWithoutStableAnatomyId = nervousModelCatalog
  .filter((entry) =>
    !educationalBindings.some((binding) => binding.originalName === entry.originalName) &&
    !nervousStableIdByOriginalName[entry.originalName]
  )
  .map((entry) => entry.originalName);

const positionDependentIds = entries.map((entry) => entry.id).filter((id) => /\.member-\d+(?:\.|$)/.test(id));

const identitySourceLines = [
  ...fs.readFileSync("src/anatomy/nervousAdapter.ts", "utf8").split(/\r?\n/),
];
const nodeIndexDependentIds = identitySourceLines
  .filter((line) => /nodeIndex/.test(line) && /(anatomyId|model-node|fallback)/i.test(line))
  .map((line) => line.trim());
const groupIndexDependentIds = identitySourceLines
  .filter((line) => /groupIndex/.test(line) && /(anatomyId|member)/i.test(line))
  .map((line) => line.trim());

const reversedEntries = createNervousAnatomyEntries([...nervousModelCatalog].reverse());
const reversedIdByOriginalName = new Map(reversedEntries.flatMap((entry) =>
  entry.modelBindings.map((binding) => [binding.originalName, entry.id])
));
const changedIdsWhenCatalogReversed = bindings
  .filter((binding) => reversedIdByOriginalName.get(binding.originalName) !== binding.anatomyId)
  .map((binding) => ({
    originalName: binding.originalName,
    before: binding.anatomyId,
    after: reversedIdByOriginalName.get(binding.originalName),
  }));

const buffer = fs.readFileSync("public/models/nervous/nervous_overview.glb");
const jsonLength = buffer.readUInt32LE(12);
const gltf = JSON.parse(buffer.toString("utf8", 20, 20 + jsonLength));
const nodes = gltf.nodes ?? [];
const meshes = gltf.meshes ?? [];
const sceneDefinition = (gltf.scenes ?? [])[gltf.scene ?? 0];
const activeIndexes = [];
const visit = (index) => {
  activeIndexes.push(index);
  for (const childIndex of nodes[index].children ?? []) visit(childIndex);
};
for (const rootIndex of sceneDefinition?.nodes ?? []) visit(rootIndex);

const primitiveStats = {
  "nervous-central": 0,
  "nervous-peripheral": 0,
  "nervous-sense": 0,
  ignored: 0,
  total: 0,
};
const technicalNodesExcluded = [];
for (const nodeIndex of activeIndexes) {
  const node = nodes[nodeIndex];
  if (node.mesh === undefined) continue;
  const primitiveCount = meshes[node.mesh]?.primitives?.length ?? 0;
  primitiveStats.total += primitiveCount;
  const catalogEntry = catalogByName.get(node.name);
  if (!catalogEntry) {
    primitiveStats.ignored += primitiveCount;
    technicalNodesExcluded.push(node.name);
    continue;
  }
  primitiveStats[catalogEntry.layer] += primitiveCount;
}

let hierarchyResult = { stats: { central: 0, peripheral: 0, sense: 0, other: 0, total: 0 }, rootName: "Scene", topLevelObjects: 0, markersFound: { centralEnd: false, peripheralEnd: false } };
try {
  const THREE = await import("three");
  const gltfLoader = await import("three/examples/jsm/loaders/GLTFLoader.js");
  const loader = new gltfLoader.GLTFLoader();
  const gltfScene = await loader.parseAsync(buffer, "public/models/nervous/");
  const { classifyNervousHierarchy } = await import("../src/utils/nervous/nervousHierarchy.ts");
  hierarchyResult = classifyNervousHierarchy(gltfScene.scene);
} catch (e) {
  console.warn("Could not load GLB for hierarchy classification:", e.message);
}

const mojibakePattern = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const utf8Problems = [
  ...nervousModelCatalog.map((entry) => entry.originalName),
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

const byOriginalName = new Map(entries.flatMap((entry) =>
  entry.modelBindings.map((binding) => [binding.originalName, entry])
));
function example(originalName) {
  const entry = byOriginalName.get(originalName);
  if (!entry) throw new Error(`Caso nervioso ausente: ${originalName}`);
  return {
    requestedBy: originalName,
    modelBindings: entry.modelBindings.map((binding) => binding.originalName),
    anatomyId: entry.id,
    displayName: entry.displayName,
    layer: entry.layer,
    region: entry.region,
    subregion: entry.subregion ?? null,
    laterality: entry.laterality,
    educationalId: entry.educationalId ?? null,
  };
}

const indexedNames = new Set(bindings.map((binding) => binding.originalName));
const multiBindingEntries = entries.filter((entry) => entry.modelBindings.length > 1);

console.log(JSON.stringify({
  glb: {
    nodes: nodes.length,
    meshNodes: activeIndexes.filter((index) => nodes[index].mesh !== undefined).length,
    primitives: primitiveStats,
  },
  hierarchy: {
    rootName: hierarchyResult.rootName,
    topLevelObjects: hierarchyResult.topLevelObjects,
    markersFound: hierarchyResult.markersFound,
    classifiedStats: hierarchyResult.stats,
  },
  catalogNodes: nervousModelCatalog.length,
  anatomyEntries: entries.length,
  modelBindings: bindings.length,
  entriesWithEducationalId: entries.filter((entry) => entry.educationalId).length,
  entriesWithoutEducationalId: entries.filter((entry) => !entry.educationalId).length,
  uniqueEducationalIds: new Set(entries.flatMap((entry) => entry.educationalId ?? [])).size,
  entriesWithMultipleBindings: multiBindingEntries.length,
  maximumBindingsPerEntry: Math.max(...entries.map((entry) => entry.modelBindings.length)),
  layers: {
    "nervous-central": entries.filter((entry) => entry.layer === "nervous-central").length,
    "nervous-peripheral": entries.filter((entry) => entry.layer === "nervous-peripheral").length,
    "nervous-sense": entries.filter((entry) => entry.layer === "nervous-sense").length,
  },
  laterality: {
    left: entries.filter((entry) => entry.laterality === "left").length,
    right: entries.filter((entry) => entry.laterality === "right").length,
    none: entries.filter((entry) => entry.laterality === null).length,
  },
  stability: {
    positionDependentIds,
    nodeIndexDependentIds,
    groupIndexDependentIds,
    nodesWithoutStableAnatomyId,
    explicitlyRegisteredModelNodeIds: Object.keys(nervousStableIdByOriginalName).length,
    duplicateStableIds: duplicates(Object.values(nervousStableIdByOriginalName)),
    reversedCatalog: {
      changedIdCount: changedIdsWhenCatalogReversed.length,
      changedIds: changedIdsWhenCatalogReversed,
    },
  },
  duplicateIds: duplicates(entries.map((entry) => entry.id)),
  duplicateBindings: duplicates(bindings.map((binding) => binding.key)),
  educationalBindingsMissingFromCatalog: educationalBindings
    .filter((binding) => !catalogByName.has(binding.originalName))
    .map((binding) => binding.originalName),
  catalogNamesNotIndexed: nervousModelCatalog
    .filter((entry) => !indexedNames.has(entry.originalName))
    .map((entry) => entry.originalName),
  utf8Problems,
  technicalNodesExcluded,
  examples: {
    centralLeft: example("Tálamo.l"),
    centralRight: example("Tálamo.r"),
    peripheralLeft: example("Nervio mediano.l"),
    peripheralRight: example("Nervio ciático.r"),
    senseLeft: example("Córnea.l"),
    senseRight: example("Cóclea.r"),
    midline: example("Cuerpo calloso"),
    withoutEducationalId: example("Plexo coroideo.l"),
  },
}, null, 2));