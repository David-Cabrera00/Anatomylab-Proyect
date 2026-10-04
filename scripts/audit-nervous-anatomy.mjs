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
const { nervousModelNodeStableIdByOriginalName } = await import(
  "../src/anatomy/metadata/nervousModelNodeStableIds.ts"
);
const { nervousLayerByOriginalName } = await import(
  "../src/anatomy/metadata/nervousHierarchyLayers.ts"
);
const nervousAnatomyIdByOriginalName = {
  ...nervousStableIdByOriginalName,
  ...nervousModelNodeStableIdByOriginalName,
};
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
    !nervousAnatomyIdByOriginalName[entry.originalName]
  )
  .map((entry) => entry.originalName);

const positionDependentIds = entries.map((entry) => entry.id).filter((id) => /\.member-\d+(?:\.|$)/.test(id));
const stableIdsForIndexedBindingsMissing = bindings
  .filter((binding) => !nervousAnatomyIdByOriginalName[binding.originalName])
  .map((binding) => binding.originalName);
const indexedBindingsWithMismatchedStableId = bindings
  .filter((binding) => nervousAnatomyIdByOriginalName[binding.originalName] !== binding.anatomyId)
  .map((binding) => ({
    originalName: binding.originalName,
    anatomyId: binding.anatomyId,
    registeredId: nervousAnatomyIdByOriginalName[binding.originalName],
  }));
const stableRegistryNamesMissingFromCatalog = Object.keys(nervousAnatomyIdByOriginalName)
  .filter((originalName) => !catalogByName.has(originalName));

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

const technicalNodesExcluded = [];
for (const nodeIndex of activeIndexes) {
  const node = nodes[nodeIndex];
  if (node.mesh === undefined) continue;
  const catalogEntry = catalogByName.get(node.name);
  if (!catalogEntry) {
    technicalNodesExcluded.push(node.name);
  }
}

let hierarchyResult = { stats: { central: 0, peripheral: 0, sense: 0, other: 0, total: 0 }, rootName: "Scene", topLevelObjects: 0, markersFound: { centralEnd: false, peripheralEnd: false } };
let hierarchyError = null;
const hierarchyCategoryByOriginalName = new Map();
const hierarchyCategoryConflicts = [];
try {
  const THREE = await import("three");
  const gltfLoader = await import("three/examples/jsm/loaders/GLTFLoader.js");
  const loader = new gltfLoader.GLTFLoader();
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  const gltfScene = await loader.parseAsync(arrayBuffer, "public/models/nervous/");
  gltfScene.scene.traverse((object) => {
    const loaderName = object.userData.name;
    const nodeIndex = gltfScene.parser.associations.get(object)?.nodes;
    const associatedName = typeof nodeIndex === "number"
      ? gltfScene.parser.json.nodes?.[nodeIndex]?.name
      : undefined;
    const originalName = typeof loaderName === "string" && loaderName.trim()
      ? loaderName
      : associatedName;
    if (typeof originalName === "string" && originalName.trim()) {
      object.userData.anatomyOriginalName = originalName;
    }
  });
  const { classifyNervousHierarchy } = await import("../src/utils/nervous/nervousHierarchy.ts");
  hierarchyResult = classifyNervousHierarchy(gltfScene.scene);
  gltfScene.scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    let sourceObject = object;
    let originalName;
    while (sourceObject && !originalName) {
      const candidates = [
        sourceObject.userData.anatomyOriginalName,
        sourceObject.userData.name,
        sourceObject.name,
      ];
      originalName = candidates.find(
        (candidate) => typeof candidate === "string" && catalogByName.has(candidate)
      );
      sourceObject = sourceObject.parent;
    }
    const category = object.userData.anatomyCategory;
    if (!originalName || typeof category !== "string") return;
    const previous = hierarchyCategoryByOriginalName.get(originalName);
    if (previous && previous !== category) {
      hierarchyCategoryConflicts.push({ originalName, before: previous, after: category });
      return;
    }
    hierarchyCategoryByOriginalName.set(originalName, category);
  });
} catch (e) {
  hierarchyError = e instanceof Error ? e.message : String(e);
}

const mojibakePattern = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const nervousDataSourceFiles = [
  "src/data/nervous/central.ts",
  "src/data/nervous/peripheral.ts",
  "src/data/nervous/senses.ts",
];
const sourceUtf8Problems = nervousDataSourceFiles.flatMap((file) =>
  fs.readFileSync(file, "utf8").split(/\r?\n/).flatMap((line, index) =>
    mojibakePattern.test(line) ? [`${file}:${index + 1}`] : []
  )
);
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
const catalogNamesNotIndexed = nervousModelCatalog
  .filter((entry) => !indexedNames.has(entry.originalName))
  .map((entry) => entry.originalName);
const meshNames = new Set(
  activeIndexes
    .filter((index) => nodes[index].mesh !== undefined)
    .map((index) => nodes[index].name)
);
const nonMeshCatalogNames = nervousModelCatalog
  .filter((entry) => !meshNames.has(entry.originalName))
  .map((entry) => entry.originalName);
const selectableCatalogNames = new Set(
  nervousModelCatalog
    .filter((entry) => entry.hasSelectableGeometry)
    .map((entry) => entry.originalName)
);
const selectableCatalogNamesMissingFromModel = [...selectableCatalogNames]
  .filter((name) => !meshNames.has(name));
const modelMeshNamesMissingFromSelectableCatalog = [...meshNames]
  .filter((name) => !selectableCatalogNames.has(name));
const hierarchyMetadataMismatches = [...meshNames].flatMap((originalName) => {
  const generatedLayer = nervousLayerByOriginalName[originalName];
  const hierarchyLayer = hierarchyCategoryByOriginalName.get(originalName);
  return generatedLayer !== hierarchyLayer
    ? [{ originalName, generatedLayer, hierarchyLayer }]
    : [];
});
const hierarchyMetadataNamesMissingFromModel = Object.keys(nervousLayerByOriginalName)
  .filter((name) => !meshNames.has(name));
const unindexedSelectableNames = catalogNamesNotIndexed.filter((name) => meshNames.has(name));
const unindexedByHierarchy = {
  "nervous-central": unindexedSelectableNames.filter((name) => hierarchyCategoryByOriginalName.get(name) === "nervous-central").length,
  "nervous-peripheral": unindexedSelectableNames.filter((name) => hierarchyCategoryByOriginalName.get(name) === "nervous-peripheral").length,
  "nervous-sense": unindexedSelectableNames.filter((name) => hierarchyCategoryByOriginalName.get(name) === "nervous-sense").length,
  unclassified: unindexedSelectableNames.filter((name) => !hierarchyCategoryByOriginalName.has(name)).length,
};
const registeredCatalogNamesNotIndexed = catalogNamesNotIndexed
  .filter((name) => nervousAnatomyIdByOriginalName[name]);
const entryLayerMismatches = bindings.flatMap((binding) => {
  const entry = byOriginalName.get(binding.originalName);
  const hierarchyLayer = hierarchyCategoryByOriginalName.get(binding.originalName);
  return entry && hierarchyLayer && entry.layer !== hierarchyLayer
    ? [{
        originalName: binding.originalName,
        anatomyId: entry.id,
        entryLayer: entry.layer,
        hierarchyLayer,
      }]
    : [];
});

console.log(JSON.stringify({
  glb: {
    nodes: nodes.length,
    meshNodes: activeIndexes.filter((index) => nodes[index].mesh !== undefined).length,
    primitives: meshes.reduce((total, mesh) => total + (mesh.primitives?.length ?? 0), 0),
  },
  hierarchy: {
    error: hierarchyError,
    rootName: hierarchyResult.rootName,
    topLevelObjects: hierarchyResult.topLevelObjects,
    markersFound: hierarchyResult.markersFound,
    classifiedStats: hierarchyResult.stats,
    classifiedOriginalNames: hierarchyCategoryByOriginalName.size,
    categoryConflicts: hierarchyCategoryConflicts,
  },
  catalogNodes: nervousModelCatalog.length,
  selectableCatalogNodes: selectableCatalogNames.size,
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
    stableIdsForIndexedBindingsMissing,
    indexedBindingsWithMismatchedStableId,
    stableRegistryNamesMissingFromCatalog,
    explicitlyRegisteredIds: Object.keys(nervousAnatomyIdByOriginalName).length,
    supplementalModelNodeIds: Object.keys(nervousModelNodeStableIdByOriginalName).length,
    duplicateStableIds: duplicates(Object.values(nervousAnatomyIdByOriginalName)),
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
  coverage: {
    catalogNamesNotIndexed,
    nonMeshCatalogNames,
    selectableCatalogNamesMissingFromModel,
    modelMeshNamesMissingFromSelectableCatalog,
    hierarchyMetadataMismatches,
    hierarchyMetadataNamesMissingFromModel,
    unindexedSelectableNames: unindexedSelectableNames.length,
    unindexedByHierarchy,
    registeredCatalogNamesNotIndexed,
    entryLayerMismatches,
  },
  utf8Problems,
  sourceUtf8Problems,
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

const failures = [
  positionDependentIds,
  nodeIndexDependentIds,
  groupIndexDependentIds,
  stableIdsForIndexedBindingsMissing,
  indexedBindingsWithMismatchedStableId,
  stableRegistryNamesMissingFromCatalog,
  duplicates(Object.values(nervousAnatomyIdByOriginalName)),
  changedIdsWhenCatalogReversed,
  duplicates(entries.map((entry) => entry.id)),
  duplicates(bindings.map((binding) => binding.key)),
  educationalBindings.filter((binding) => !catalogByName.has(binding.originalName)),
  utf8Problems,
  sourceUtf8Problems,
  hierarchyCategoryConflicts,
  entryLayerMismatches,
  selectableCatalogNamesMissingFromModel,
  modelMeshNamesMissingFromSelectableCatalog,
  hierarchyMetadataMismatches,
  hierarchyMetadataNamesMissingFromModel,
].some((items) => items.length > 0)
  || hierarchyError !== null
  || !hierarchyResult.markersFound.centralEnd
  || !hierarchyResult.markersFound.peripheralEnd
  || hierarchyCategoryByOriginalName.size !== meshNames.size
  || hierarchyResult.stats.other !== 0;

if (failures) process.exitCode = 1;
