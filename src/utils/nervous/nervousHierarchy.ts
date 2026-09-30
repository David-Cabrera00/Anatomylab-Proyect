import * as THREE from "three";

export type NervousHierarchyCategory =
  | "nervous-central"
  | "nervous-peripheral"
  | "nervous-sense";

export type NervousHierarchyStats = {
  central: number;
  peripheral: number;
  sense: number;
  other: number;
  total: number;
};

export type NervousHierarchyResult = {
  rootName: string;
  topLevelObjects: number;
  markersFound: {
    centralEnd: boolean;
    peripheralEnd: boolean;
  };
  stats: NervousHierarchyStats;
};

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_\-.()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findSequenceRoot(model: THREE.Object3D) {
  let bestObject = model;

  model.traverse((object) => {
    if (object.children.length > bestObject.children.length) {
      bestObject = object;
    }
  });

  return bestObject;
}

function assignRegion(
  object: THREE.Object3D,
  category: NervousHierarchyCategory
) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.userData.anatomyCategory = category;
    child.userData.nervousSource = object.name;
  });
}

function getStats(model: THREE.Object3D): NervousHierarchyStats {
  const stats: NervousHierarchyStats = {
    central: 0,
    peripheral: 0,
    sense: 0,
    other: 0,
    total: 0,
  };

  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    stats.total++;

    const category = object.userData.anatomyCategory;

    if (category === "nervous-central") {
      stats.central++;
      return;
    }

    if (category === "nervous-peripheral") {
      stats.peripheral++;
      return;
    }

    if (category === "nervous-sense") {
      stats.sense++;
      return;
    }

    stats.other++;
  });

  return stats;
}

export function classifyNervousHierarchy(
  model: THREE.Object3D
): NervousHierarchyResult {
  const root = findSequenceRoot(model);

  let currentRegion: NervousHierarchyCategory =
    "nervous-central";

  const markersFound = {
    centralEnd: false,
    peripheralEnd: false,
  };

  for (const child of root.children) {
    assignRegion(child, currentRegion);

    const name = normalizeName(child.name);

    if (name.includes("sustancia intermedia lateral")) {
      markersFound.centralEnd = true;
      currentRegion = "nervous-peripheral";
      continue;
    }

    if (name.includes("cauda equina")) {
      markersFound.peripheralEnd = true;
      currentRegion = "nervous-sense";
    }
  }

  return {
    rootName: root.name || "Scene",
    topLevelObjects: root.children.length,
    markersFound,
    stats: getStats(model),
  };
}
