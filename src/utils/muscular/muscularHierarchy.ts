import * as THREE from "three";

import type {
  SystemCategory,
} from "../systemClassification";

export type MuscularHierarchyStats = {
  headNeck: number;
  trunk: number;
  upperLimb: number;
  lowerLimb: number;
  ignored: number;
  total: number;
};

export type MuscularHierarchyResult = {
  rootName: string;
  markersFound: {
    abdominalEnd: boolean;
    cranialEnd: boolean;
    thoracicEnd: boolean;
    lowerLimbEnd: boolean;
  };
  stats: MuscularHierarchyStats;
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

function findMuscularRoot(
  model: THREE.Object3D
) {
  let bestMatch: THREE.Object3D | null = null;

  model.traverse((object) => {
    const name = normalizeName(object.name);

    const isMuscularRoot =
      name.includes("sistema muscular") ||
      name.includes("muscular system");

    if (!isMuscularRoot) {
      return;
    }

    if (
      !bestMatch ||
      object.children.length >
        bestMatch.children.length
    ) {
      bestMatch = object;
    }
  });

  if (bestMatch) {
    return bestMatch;
  }

  let objectWithMostChildren: THREE.Object3D =
    model;

  model.traverse((object) => {
    if (
      object.children.length >
      objectWithMostChildren.children.length
    ) {
      objectWithMostChildren = object;
    }
  });

  return objectWithMostChildren;
}

function isTechnicalMuscularObject(
  object: THREE.Object3D
) {
  const name = normalizeName(object.name);

  return (
    name === "sistema muscular g" ||
    name === "muscular system g" ||
    name === "sistema muscular" ||
    name === "muscular system"
  );
}

function ignoreObject(
  object: THREE.Object3D
) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.userData.anatomyIgnore = true;
    child.userData.anatomyCategory = "other";
    child.layers.set(1);
  });
}

function assignRegion(
  object: THREE.Object3D,
  category: SystemCategory
) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.userData.anatomyIgnore = false;
    child.userData.anatomyCategory = category;
    child.userData.muscularSource = object.name;
  });
}

function getStats(
  root: THREE.Object3D
): MuscularHierarchyStats {
  const stats: MuscularHierarchyStats = {
    headNeck: 0,
    trunk: 0,
    upperLimb: 0,
    lowerLimb: 0,
    ignored: 0,
    total: 0,
  };

  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    stats.total++;

    if (
      object.userData.anatomyIgnore === true
    ) {
      stats.ignored++;
      return;
    }

    const category =
      object.userData.anatomyCategory as
        | SystemCategory
        | undefined;

    if (category === "muscular-head-neck") {
      stats.headNeck++;
      return;
    }

    if (category === "muscular-trunk") {
      stats.trunk++;
      return;
    }

    if (category === "muscular-upper-limb") {
      stats.upperLimb++;
      return;
    }

    if (category === "muscular-lower-limb") {
      stats.lowerLimb++;
    }
  });

  return stats;
}

export function classifyMuscularHierarchy(
  model: THREE.Object3D
): MuscularHierarchyResult {
  const root = findMuscularRoot(model);

  if (root instanceof THREE.Mesh) {
    root.userData.anatomyIgnore = true;
    root.userData.anatomyCategory = "other";
    root.layers.set(1);
  }

  const markersFound = {
    abdominalEnd: false,
    cranialEnd: false,
    thoracicEnd: false,
    lowerLimbEnd: false,
  };

  let currentRegion: SystemCategory =
    "muscular-trunk";

  for (const child of root.children) {
    const normalized = normalizeName(child.name);

    if (isTechnicalMuscularObject(child)) {
      ignoreObject(child);
      continue;
    }

    assignRegion(child, currentRegion);

    if (
      normalized.includes(
        "porcion abdominal del sistema muscular"
      )
    ) {
      markersFound.abdominalEnd = true;
      currentRegion = "muscular-head-neck";
      continue;
    }

    if (
      normalized.includes(
        "porcion craneal del sistema muscular"
      )
    ) {
      markersFound.cranialEnd = true;
      currentRegion = "muscular-trunk";
      continue;
    }

    if (
      normalized.includes(
        "porcion toracica del sistema muscular"
      )
    ) {
      markersFound.thoracicEnd = true;
      currentRegion = "muscular-lower-limb";
      continue;
    }

    if (
      normalized.includes(
        "vainas tendinosas tarsianas tibiales"
      )
    ) {
      markersFound.lowerLimbEnd = true;
      currentRegion = "muscular-upper-limb";
    }
  }

  return {
    rootName: root.name,
    markersFound,
    stats: getStats(root),
  };
}
