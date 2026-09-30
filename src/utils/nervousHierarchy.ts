import * as THREE from "three";

export type NervousHierarchyCategory =
  | "nervous-central"
  | "nervous-peripheral"
  | "nervous-sense";

export type NervousHierarchyResult = {
  markersFound: {
    centralEnd: boolean;
    peripheralEnd: boolean;
  };
  stats: {
    central: number;
    peripheral: number;
    sense: number;
    other: number;
    total: number;
  };
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

function getStats(model: THREE.Object3D) {
  const stats = {
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
    } else if (category === "nervous-peripheral") {
      stats.peripheral++;
    } else if (category === "nervous-sense") {
      stats.sense++;
    } else {
      stats.other++;
    }
  });

  return stats;
}

export function classifyNervousHierarchy(
  model: THREE.Object3D
): NervousHierarchyResult {
  let currentRegion: NervousHierarchyCategory =
    "nervous-central";

  const markersFound = {
    centralEnd: false,
    peripheralEnd: false,
  };

  for (const child of model.children) {
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
    markersFound,
    stats: getStats(model),
  };
}
