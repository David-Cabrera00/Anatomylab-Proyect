import * as THREE from "three";

import type {
  SystemCategory,
} from "./systemClassification";

/* ======================================================
   ANATOMYLAB AI
   CLASIFICACIÓN DEL SISTEMA MUSCULAR

   IMPORTANTE:
   Esta clasificación está basada en la estructura REAL
   del archivo muscular_overview.glb de AnatomyLab.

   No utiliza coordenadas espaciales ni intenta adivinar
   la región por la posición del mesh.
====================================================== */

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

/* ======================================================
   NORMALIZAR
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
   ENCONTRAR RAÍZ DEL SISTEMA MUSCULAR
====================================================== */

function findMuscularRoot(
  model: THREE.Object3D
) {
  let bestMatch:
    | THREE.Object3D
    | null =
    null;

  model.traverse(
    (object) => {
      const name =
        normalizeName(
          object.name
        );

      const isMuscularRoot =
        name.includes(
          "sistema muscular"
        ) ||
        name.includes(
          "muscular system"
        );

      if (
        !isMuscularRoot
      ) {
        return;
      }

      if (
        !bestMatch ||
        object.children.length >
          bestMatch.children.length
      ) {
        bestMatch =
          object;
      }
    }
  );

  if (
    bestMatch
  ) {
    return bestMatch;
  }

  /*
   * Respaldo:
   * buscamos el objeto con más hijos.
   *
   * En este GLB la raíz muscular posee
   * cientos de hijos directos.
   */
  let objectWithMostChildren:
    THREE.Object3D =
    model;

  model.traverse(
    (object) => {
      if (
        object.children.length >
        objectWithMostChildren
          .children.length
      ) {
        objectWithMostChildren =
          object;
      }
    }
  );

  return objectWithMostChildren;
}

/* ======================================================
   IDENTIFICAR MESH TÉCNICO
====================================================== */

function isTechnicalMuscularObject(
  object: THREE.Object3D
) {
  const name =
    normalizeName(
      object.name
    );

  return (
    name ===
      "sistema muscular g" ||
    name ===
      "muscular system g" ||
    name ===
      "sistema muscular" ||
    name ===
      "muscular system"
  );
}

/* ======================================================
   IGNORAR RECURSIVAMENTE
====================================================== */

function ignoreObject(
  object: THREE.Object3D
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
        .anatomyIgnore =
        true;

      child.userData
        .anatomyCategory =
        "other";

      /*
       * Three.js layer 1:
       * no se renderiza con la cámara normal.
       */
      child.layers.set(
        1
      );
    }
  );
}

/* ======================================================
   ASIGNAR REGIÓN
====================================================== */

function assignRegion(
  object: THREE.Object3D,
  category: SystemCategory
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
        .anatomyIgnore =
        false;

      child.userData
        .anatomyCategory =
        category;

      /*
       * Guardamos también el nombre del bloque
       * original de Z-Anatomy.
       *
       * Será útil después para depuración.
       */
      child.userData
        .muscularSource =
        object.name;
    }
  );
}

/* ======================================================
   CONTAR RESULTADO
====================================================== */

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

  root.traverse(
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

      if (
        object.userData
          .anatomyIgnore ===
        true
      ) {
        stats.ignored++;
        return;
      }

      const category =
        object.userData
          .anatomyCategory as
          | SystemCategory
          | undefined;

      if (
        category ===
        "muscular-head-neck"
      ) {
        stats.headNeck++;
        return;
      }

      if (
        category ===
        "muscular-trunk"
      ) {
        stats.trunk++;
        return;
      }

      if (
        category ===
        "muscular-upper-limb"
      ) {
        stats.upperLimb++;
        return;
      }

      if (
        category ===
        "muscular-lower-limb"
      ) {
        stats.lowerLimb++;
      }
    }
  );

  return stats;
}

/* ======================================================
   CLASIFICACIÓN PRINCIPAL
====================================================== */

export function classifyMuscularHierarchy(
  model: THREE.Object3D
): MuscularHierarchyResult {
  const root =
    findMuscularRoot(
      model
    );

  /*
   * El GLB muscular tiene una geometría
   * técnica en su nodo raíz:
   *
   * Sistema muscular.g
   *
   * No forma parte de las regiones anatómicas.
   */
  if (
    root instanceof
    THREE.Mesh
  ) {
    root.userData
      .anatomyIgnore =
      true;

    root.userData
      .anatomyCategory =
      "other";

    root.layers.set(
      1
    );
  }

  const markersFound = {
    abdominalEnd: false,
    cranialEnd: false,
    thoracicEnd: false,
    lowerLimbEnd: false,
  };

  /*
   * El archivo empieza con abdomen,
   * por lo que iniciamos en Tronco.
   */
  let currentRegion:
    SystemCategory =
    "muscular-trunk";

  /*
   * La clave está aquí.
   *
   * Z-Anatomy exportó los bloques anatómicos
   * conservando su orden original.
   *
   * Los objetos .j actúan como marcadores
   * entre secciones, aunque estén como hermanos
   * dentro del GLB.
   */
  for (
    const child of
    root.children
  ) {
    const normalized =
      normalizeName(
        child.name
      );

    /*
     * Por seguridad ignoramos cualquier
     * representación técnica adicional
     * del nodo raíz.
     */
    if (
      isTechnicalMuscularObject(
        child
      )
    ) {
      ignoreObject(
        child
      );

      continue;
    }

    /*
     * Todos los meshes descendientes del
     * objeto actual pertenecen a la región
     * activa.
     */
    assignRegion(
      child,
      currentRegion
    );

    /* ================================================
       FIN ABDOMEN
       Lo siguiente corresponde a cabeza/cuello.
    ================================================ */

    if (
      normalized.includes(
        "porcion abdominal del sistema muscular"
      )
    ) {
      markersFound
        .abdominalEnd =
        true;

      currentRegion =
        "muscular-head-neck";

      continue;
    }

    /* ================================================
       FIN CRÁNEO / CABEZA

       Lo siguiente vuelve al tronco:
       erectores, espalda, pelvis y tórax.
    ================================================ */

    if (
      normalized.includes(
        "porcion craneal del sistema muscular"
      )
    ) {
      markersFound
        .cranialEnd =
        true;

      currentRegion =
        "muscular-trunk";

      continue;
    }

    /* ================================================
       FIN TÓRAX

       Lo siguiente corresponde al miembro inferior.
    ================================================ */

    if (
      normalized.includes(
        "porcion toracica del sistema muscular"
      )
    ) {
      markersFound
        .thoracicEnd =
        true;

      currentRegion =
        "muscular-lower-limb";

      continue;
    }

    /* ================================================
       FIN MIEMBRO INFERIOR

       En el GLB, las vainas tarsianas tibiales
       son el último bloque antes de comenzar
       las estructuras del miembro superior.
    ================================================ */

    if (
      normalized.includes(
        "vainas tendinosas tarsianas tibiales"
      )
    ) {
      markersFound
        .lowerLimbEnd =
        true;

      currentRegion =
        "muscular-upper-limb";
    }
  }

  const stats =
    getStats(
      root
    );

  return {
    rootName:
      root.name,

    markersFound,

    stats,
  };
}