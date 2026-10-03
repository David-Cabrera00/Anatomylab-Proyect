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
const { muscularModelCatalog } = await import(
  "../src/anatomy/catalogs/muscularModelCatalog.ts"
);
const { muscularEducationalGroups } = await import("../src/data/muscular.ts");
const { createMuscularAnatomyEntries } = await import("../src/anatomy/muscularAdapter.ts");
const {
  muscularEducationalIdentityGroupsByEducationalId,
  muscularStableIdByOriginalName,
} = await import("../src/anatomy/metadata/muscularStableIds.ts");

const entries = anatomyIndex.filter((entry) => entry.system === "muscular");
const catalogByName = new Map(muscularModelCatalog.map((entry) => [entry.originalName, entry]));
const bindings = entries.flatMap((entry) => entry.modelBindings.map((binding) => ({
  key: `${binding.modelKey}:${binding.originalName}`,
  originalName: binding.originalName,
  anatomyId: entry.id,
})));
const educationalBindings = Object.values(muscularEducationalGroups).flat().flatMap((entry) =>
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
const groupsWithoutStableKey = [];
for (const binding of Object.values(muscularEducationalGroups).flat()) {
  const originalNames = binding.originalNames ?? [binding.originalName];
  const baseNames = [...new Set(originalNames.map(withoutLaterality))];
  if (baseNames.length < 2) continue;
  const groups = muscularEducationalIdentityGroupsByEducationalId[binding.data.id];
  const declared = new Set((groups ?? []).flatMap((group) => group.originalBaseNames));
  if (
    !groups?.length ||
    groups.some((group) => !group.stableKey?.trim() || !group.anatomyIdBase?.trim()) ||
    baseNames.some((baseName) => !declared.has(baseName)) ||
    declared.size !== baseNames.length
  ) {
    groupsWithoutStableKey.push(binding.data.id);
  }
}

const nodesWithoutStableAnatomyId = muscularModelCatalog
  .filter((entry) =>
    !educationalBindings.some((binding) => binding.originalName === entry.originalName) &&
    !muscularStableIdByOriginalName[entry.originalName]
  )
  .map((entry) => entry.originalName);
const positionDependentIds = entries.map((entry) => entry.id).filter((id) => /\.member-\d+(?:\.|$)/.test(id));
const identitySourceLines = [
  ...fs.readFileSync("src/anatomy/muscularAdapter.ts", "utf8").split(/\r?\n/),
  ...fs.readFileSync("scripts/generate-muscular-model-catalog.mjs", "utf8").split(/\r?\n/),
];
const nodeIndexDependentIds = identitySourceLines
  .filter((line) => /nodeIndex/.test(line) && /(anatomyId|model-node|fallback)/i.test(line))
  .map((line) => line.trim());
const groupIndexDependentIds = identitySourceLines
  .filter((line) => /groupIndex/.test(line) && /(anatomyId|member)/i.test(line))
  .map((line) => line.trim());

const reversedEntries = createMuscularAnatomyEntries([...muscularModelCatalog].reverse());
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

const buffer = fs.readFileSync("public/models/muscular/muscular_overview.glb");
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
  "muscular-head-neck": 0,
  "muscular-trunk": 0,
  "muscular-upper-limb": 0,
  "muscular-lower-limb": 0,
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

const mojibakePattern = /\u00c3|\u00c2|\ufffd|\u00ef\u00bf\u00bd/;
const utf8Problems = [
  ...muscularModelCatalog.map((entry) => entry.originalName),
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
  if (!entry) throw new Error(`Caso muscular ausente: ${originalName}`);
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
  catalogNodes: muscularModelCatalog.length,
  anatomyEntries: entries.length,
  modelBindings: bindings.length,
  entriesWithEducationalId: entries.filter((entry) => entry.educationalId).length,
  entriesWithoutEducationalId: entries.filter((entry) => !entry.educationalId).length,
  uniqueEducationalIds: new Set(entries.flatMap((entry) => entry.educationalId ?? [])).size,
  entriesWithMultipleBindings: multiBindingEntries.length,
  maximumBindingsPerEntry: Math.max(...entries.map((entry) => entry.modelBindings.length)),
  layers: {
    "muscular-head-neck": entries.filter((entry) => entry.layer === "muscular-head-neck").length,
    "muscular-trunk": entries.filter((entry) => entry.layer === "muscular-trunk").length,
    "muscular-upper-limb": entries.filter((entry) => entry.layer === "muscular-upper-limb").length,
    "muscular-lower-limb": entries.filter((entry) => entry.layer === "muscular-lower-limb").length,
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
    groupsWithoutStableKey,
    nodesWithoutStableAnatomyId,
    explicitlyRegisteredModelNodeIds: Object.keys(muscularStableIdByOriginalName).length,
    explicitlyRegisteredEducationalGroups: Object.values(
      muscularEducationalIdentityGroupsByEducationalId
    ).flat().length,
    duplicateStableIds: duplicates(Object.values(muscularStableIdByOriginalName)),
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
  catalogNamesNotIndexed: muscularModelCatalog
    .filter((entry) => !indexedNames.has(entry.originalName))
    .map((entry) => entry.originalName),
  utf8Problems,
  technicalNodesExcluded,
  preservedPilot: example("Músculo esternocleidomastoideo.r"),
  examples: {
    headNeckLeft: example("Músculo esternocleidomastoideo.l"),
    headNeckRight: example("Músculo esternocleidomastoideo.r"),
    trunk: example("Diafragma"),
    upperLimbLeft: example("Porción acromial del músculo deltoides.l"),
    upperLimbRight: example("Porción acromial del músculo deltoides.r"),
    lowerLimbLeft: example("Cabeza lateral del músculo gastrocnemio.l"),
    lowerLimbRight: example("Cabeza lateral del músculo gastrocnemio.r"),
    withoutEducationalId: example("Linea alba"),
  },
}, null, 2));
