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
const { digestiveModelCatalog } = await import(
  "../src/anatomy/catalogs/digestiveModelCatalog.ts"
);
const { digestiveEducationalGroups, digestivePilotEntries } = await import("../src/data/digestive.ts");
const { createDigestiveAnatomyEntries } = await import("../src/anatomy/digestiveAdapter.ts");
const { digestiveStableIdByOriginalName } = await import("../src/anatomy/metadata/digestiveStableIds.ts");
const { classifyDigestiveHierarchy } = await import("../src/utils/digestive/digestiveHierarchy.ts");

const entries = anatomyIndex.filter((entry) => entry.system === "digestive");
const catalogByName = new Map(digestiveModelCatalog.map((entry) => [entry.originalName, entry]));
const bindings = entries.flatMap((entry) => entry.modelBindings.map((binding) => ({
  key: `${binding.modelKey}:${binding.originalName}`,
  originalName: binding.originalName,
  anatomyId: entry.id,
})));
const educationalBindings = [...digestivePilotEntries, ...digestiveEducationalGroups.tract, ...digestiveEducationalGroups.accessory]
  .flatMap((entry) => (entry.originalNames ?? [entry.originalName]).map((originalName) => ({
    originalName,
    educationalId: entry.data?.id,
  })));

function duplicates(values) {
  const seen = new Set();
  const duplicateValues = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicateValues.add(value);
    seen.add(value);
  }
  return [...duplicateValues];
}

const nodesWithoutStableAnatomyId = digestiveModelCatalog
  .filter((entry) =>
    !educationalBindings.some((binding) => binding.originalName === entry.originalName) &&
    !digestiveStableIdByOriginalName[entry.originalName]
  )
  .map((entry) => entry.originalName);

const positionDependentIds = entries.map((entry) => entry.id).filter((id) => /\.member-\d+(?:\.|$)/.test(id));

const identitySourceLines = [
  ...fs.readFileSync("src/anatomy/digestiveAdapter.ts", "utf8").split(/\r?\n/),
];
const nodeIndexDependentIds = identitySourceLines
  .filter((line) => /nodeIndex/.test(line) && /(anatomyId|model-node|fallback)/i.test(line))
  .map((line) => line.trim());
const groupIndexDependentIds = identitySourceLines
  .filter((line) => /groupIndex/.test(line) && /(anatomyId|member)/i.test(line))
  .map((line) => line.trim());

const reversedEntries = createDigestiveAnatomyEntries([...digestiveModelCatalog].reverse());
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

const buffer = fs.readFileSync("public/models/digestive/digestive_overview.glb");
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
  "digestive-tract": 0,
  "digestive-accessory": 0,
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

let hierarchyResult = { stats: { tract: 0, accessory: 0, other: 0, total: 0 } };
try {
  const THREE = await import("three");
  const gltfLoader = await import("three/examples/jsm/loaders/GLTFLoader.js");
  const loader = new gltfLoader.GLTFLoader();
  const gltfScene = await loader.parseAsync(buffer, "public/models/digestive/");
  const { classifyDigestiveHierarchy } = await import("../src/utils/digestive/digestiveHierarchy.ts");
  hierarchyResult = classifyDigestiveHierarchy(gltfScene.scene);
} catch (e) {
  console.warn("Could not load GLB for hierarchy classification:", e.message);
}

const mojibakePattern = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const utf8Problems = [
  ...digestiveModelCatalog.map((entry) => entry.originalName),
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
  if (!entry) throw new Error(`Caso digestivo ausente: ${originalName}`);
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
    classifiedStats: hierarchyResult.stats,
  },
  catalogNodes: digestiveModelCatalog.length,
  anatomyEntries: entries.length,
  modelBindings: bindings.length,
  entriesWithEducationalId: entries.filter((entry) => entry.educationalId).length,
  entriesWithoutEducationalId: entries.filter((entry) => !entry.educationalId).length,
  uniqueEducationalIds: new Set(entries.flatMap((entry) => entry.educationalId ?? [])).size,
  entriesWithMultipleBindings: multiBindingEntries.length,
  maximumBindingsPerEntry: Math.max(...entries.map((entry) => entry.modelBindings.length)),
  layers: {
    "digestive-tract": entries.filter((entry) => entry.layer === "digestive-tract").length,
    "digestive-accessory": entries.filter((entry) => entry.layer === "digestive-accessory").length,
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
    explicitlyRegisteredModelNodeIds: Object.keys(digestiveStableIdByOriginalName).length,
    duplicateStableIds: duplicates(Object.values(digestiveStableIdByOriginalName)),
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
  catalogNamesNotIndexed: digestiveModelCatalog
    .filter((entry) => !indexedNames.has(entry.originalName))
    .map((entry) => entry.originalName),
  utf8Problems,
  technicalNodesExcluded,
  examples: {
    tract: example("Esófago"),
    accessoryLeft: example("Glándula parótida.l"),
    accessoryRight: example("Glándula parótida.r"),
    organ: example("Hígado"),
    withoutEducationalId: example("Gingiva"),
  },
}, null, 2));