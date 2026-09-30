import * as THREE from "three";

export type DigestiveHierarchyCategory =
  | "digestive-tract"
  | "digestive-accessory";

export type DigestiveHierarchyResult = {
  stats: {
    tract: number;
    accessory: number;
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

const ACCESSORY_SOURCE_TERMS = [
  "glandula parotida accesoria",
  "conducto parotideo",
  "conducto submandibular",
  "glandula parotida",
  "glandula sublingual",
  "glandula submandibular",
  "glandulas salivales",
  "lengua",
  "conducto biliar",
  "conductos biliares",
  "higado",
  "pancreas",
  "vesicula biliar",
];

function getSourceCategory(
  sourceName: string
): DigestiveHierarchyCategory {
  const name = normalizeName(sourceName);

  const isAccessory = ACCESSORY_SOURCE_TERMS.some((term) =>
    name.includes(term)
  );

  return isAccessory
    ? "digestive-accessory"
    : "digestive-tract";
}

function assignRegion(
  object: THREE.Object3D,
  category: DigestiveHierarchyCategory
) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    child.userData.anatomyCategory = category;
    child.userData.digestiveSource = object.name;
  });
}

function getStats(model: THREE.Object3D) {
  const stats = {
    tract: 0,
    accessory: 0,
    other: 0,
    total: 0,
  };

  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    stats.total++;

    const category = object.userData.anatomyCategory;

    if (category === "digestive-tract") {
      stats.tract++;
    } else if (category === "digestive-accessory") {
      stats.accessory++;
    } else {
      stats.other++;
    }
  });

  return stats;
}

export function classifyDigestiveHierarchy(
  model: THREE.Object3D
): DigestiveHierarchyResult {
  /*
   * En digestive_overview.glb los grandes órganos
   * (hígado y páncreas) conservan sus subestructuras
   * como hijos. Clasificamos el bloque superior y
   * propagamos la categoría a todos sus meshes.
   */
  for (const child of model.children) {
    const category = getSourceCategory(child.name);
    assignRegion(child, category);
  }

  return {
    stats: getStats(model),
  };
}
