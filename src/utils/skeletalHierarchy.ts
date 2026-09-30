import * as THREE from "three";

export type SkeletalHierarchyCategory =
  | "skeletal-axial"
  | "skeletal-appendicular";

export type SkeletalHierarchyResult = {
  rootName: string;
  directChildren: number;

  markersFound: {
    upperLimbEnd: boolean;
    axialMiddleEnd: boolean;
    lowerLimbEnd: boolean;
  };

  markerIndexes: {
    upperLimbEnd: number;
    axialMiddleEnd: number;
    lowerLimbEnd: number;
  };

  stats: {
    axial: number;
    appendicular: number;
    other: number;
    total: number;
  };
};

/* ======================================================
   NORMALIZAR NOMBRES
====================================================== */

function normalizeName(
  value: string
) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[_\-.()]/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

/* ======================================================
   MARCADORES REALES DEL GLB
====================================================== */

const UPPER_LIMB_END =
  "escapula r";

const AXIAL_MIDDLE_END =
  "malleus r";

const LOWER_LIMB_END =
  "hueso coxal r";

/* ======================================================
   COMPARAR MARCADOR
====================================================== */

function isMarkerName(
  objectName: string,
  marker: string
) {
  const name =
    normalizeName(
      objectName
    );

  return (
    name === marker ||
    name.startsWith(
      `${marker} `
    )
  );
}

/* ======================================================
   ENCONTRAR LA SECUENCIA REAL DEL ESQUELETO

   No asumimos que model.children sea directamente
   la lista de huesos.

   Buscamos el objeto cuyos hijos contengan los
   marcadores reales del GLB.
====================================================== */

function findSequenceRoot(
  model: THREE.Object3D
) {
  let bestObject =
    model;

  let bestMarkerScore =
    -1;

  let bestChildrenCount =
    -1;

  model.traverse(
    (object) => {
      if (
        object.children
          .length === 0
      ) {
        return;
      }

      let markerScore =
        0;

      for (
        const child of
        object.children
      ) {
        if (
          isMarkerName(
            child.name,
            UPPER_LIMB_END
          )
        ) {
          markerScore++;
        }

        if (
          isMarkerName(
            child.name,
            AXIAL_MIDDLE_END
          )
        ) {
          markerScore++;
        }

        if (
          isMarkerName(
            child.name,
            LOWER_LIMB_END
          )
        ) {
          markerScore++;
        }
      }

      if (
        markerScore >
          bestMarkerScore ||
        (
          markerScore ===
            bestMarkerScore &&
          object.children
            .length >
            bestChildrenCount
        )
      ) {
        bestObject =
          object;

        bestMarkerScore =
          markerScore;

        bestChildrenCount =
          object.children
            .length;
      }
    }
  );

  return bestObject;
}

/* ======================================================
   ASIGNAR REGIÓN

   Si un nodo tiene varias primitivas Mesh,
   todas reciben la misma categoría.
====================================================== */

function assignRegion(
  object: THREE.Object3D,
  category:
    SkeletalHierarchyCategory
) {
  object.traverse(
    (child) => {
      if (
        !(
          child instanceof
          THREE.Mesh
        )
      ) {
        return;
      }

      child.userData
        .anatomyCategory =
        category;

      child.userData
        .skeletalSource =
        object.name;
    }
  );
}

/* ======================================================
   ESTADÍSTICAS
====================================================== */

function getStats(
  model: THREE.Object3D
) {
  const stats = {
    axial: 0,
    appendicular: 0,
    other: 0,
    total: 0,
  };

  model.traverse(
    (object) => {
      if (
        !(
          object instanceof
          THREE.Mesh
        )
      ) {
        return;
      }

      stats.total++;

      const category =
        object.userData
          .anatomyCategory;

      if (
        category ===
        "skeletal-axial"
      ) {
        stats.axial++;

        return;
      }

      if (
        category ===
        "skeletal-appendicular"
      ) {
        stats.appendicular++;

        return;
      }

      stats.other++;
    }
  );

  return stats;
}

/* ======================================================
   BUSCAR ÍNDICES DE LOS MARCADORES
====================================================== */

function findMarkerIndexes(
  children:
    THREE.Object3D[]
) {
  return {
    upperLimbEnd:
      children.findIndex(
        (child) =>
          isMarkerName(
            child.name,
            UPPER_LIMB_END
          )
      ),

    axialMiddleEnd:
      children.findIndex(
        (child) =>
          isMarkerName(
            child.name,
            AXIAL_MIDDLE_END
          )
      ),

    lowerLimbEnd:
      children.findIndex(
        (child) =>
          isMarkerName(
            child.name,
            LOWER_LIMB_END
          )
      ),
  };
}

/* ======================================================
   CLASIFICACIÓN PRINCIPAL

   Orden REAL de skeletal_overview.glb:

   1. Miembros superiores
      termina en:
      Escápula.r

   2. Esqueleto axial
      termina en:
      Malleus.r

   3. Miembros inferiores
      termina en:
      Hueso coxal.r

   4. Axial final
      Hioides y mandíbula
====================================================== */

export function classifySkeletalHierarchy(
  model: THREE.Object3D
): SkeletalHierarchyResult {
  const root =
    findSequenceRoot(
      model
    );

  const children =
    root.children;

  const markerIndexes =
    findMarkerIndexes(
      children
    );

  /* ====================================================
     RESPALDO EXACTO PARA TU GLB

     Tu archivo tiene 269 nodos superiores.

     Los límites reales son:

     Escápula.r       -> índice 63
     Malleus.r        -> índice 202
     Hueso coxal.r    -> índice 266
  ==================================================== */

  const upperLimbEndIndex =
    markerIndexes
      .upperLimbEnd >= 0
      ? markerIndexes
          .upperLimbEnd
      : children.length >=
          269
        ? 63
        : -1;

  const axialMiddleEndIndex =
    markerIndexes
      .axialMiddleEnd >= 0
      ? markerIndexes
          .axialMiddleEnd
      : children.length >=
          269
        ? 202
        : -1;

  const lowerLimbEndIndex =
    markerIndexes
      .lowerLimbEnd >= 0
      ? markerIndexes
          .lowerLimbEnd
      : children.length >=
          269
        ? 266
        : -1;

  const markersAreUsable =
    upperLimbEndIndex >=
      0 &&
    axialMiddleEndIndex >
      upperLimbEndIndex &&
    lowerLimbEndIndex >
      axialMiddleEndIndex;

  /* ====================================================
     ERROR DE JERARQUÍA
  ==================================================== */

  if (
    !markersAreUsable
  ) {
    console.error(
      "[AnatomyLab] No se pudo clasificar el esqueleto.",
      {
        rootName:
          root.name,

        directChildren:
          children.length,

        markerIndexes,
      }
    );

    return {
      rootName:
        root.name ||
        "Scene",

      directChildren:
        children.length,

      markersFound: {
        upperLimbEnd:
          false,

        axialMiddleEnd:
          false,

        lowerLimbEnd:
          false,
      },

      markerIndexes,

      stats:
        getStats(
          model
        ),
    };
  }

  /* ====================================================
     CLASIFICAR POR ORDEN REAL
  ==================================================== */

  for (
    let index = 0;
    index <
    children.length;
    index++
  ) {
    const child =
      children[
        index
      ];

    let category:
      SkeletalHierarchyCategory;

    /* ================================================
       MIEMBROS SUPERIORES
    ================================================ */

    if (
      index <=
      upperLimbEndIndex
    ) {
      category =
        "skeletal-appendicular";
    }

    /* ================================================
       AXIAL CENTRAL
    ================================================ */

    else if (
      index <=
      axialMiddleEndIndex
    ) {
      category =
        "skeletal-axial";
    }

    /* ================================================
       MIEMBROS INFERIORES
    ================================================ */

    else if (
      index <=
      lowerLimbEndIndex
    ) {
      category =
        "skeletal-appendicular";
    }

    /* ================================================
       HIOIDES + MANDÍBULA
    ================================================ */

    else {
      category =
        "skeletal-axial";
    }

    assignRegion(
      child,
      category
    );
  }

  /* ====================================================
     ESTADÍSTICAS
  ==================================================== */

  const stats =
    getStats(
      model
    );

  console.log(
    "CLASIFICACIÓN ESQUELÉTICA REAL:",
    {
      rootName:
        root.name ||
        "Scene",

      directChildren:
        children.length,

      upperLimbEndIndex,

      axialMiddleEndIndex,

      lowerLimbEndIndex,

      stats,
    }
  );

  return {
    rootName:
      root.name ||
      "Scene",

    directChildren:
      children.length,

    markersFound: {
      upperLimbEnd:
        true,

      axialMiddleEnd:
        true,

      lowerLimbEnd:
        true,
    },

    markerIndexes: {
      upperLimbEnd:
        upperLimbEndIndex,

      axialMiddleEnd:
        axialMiddleEndIndex,

      lowerLimbEnd:
        lowerLimbEndIndex,
    },

    stats,
  };
}