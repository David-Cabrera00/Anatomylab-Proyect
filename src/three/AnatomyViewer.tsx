import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  Canvas,
  type ThreeEvent,
} from "@react-three/fiber";

import {
  Center,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import {
  anatomySystems,
  type AnatomyLayerId,
  type AnatomySystemId,
} from "../config/anatomySystems";

import {
  getStructureCategory as getCardiovascularCategory,
  getUnknownAnatomyWords,
  isInvalidStructureName,
} from "../utils/anatomyNames";

import {
  getRespiratoryStructureName,
  isSuspiciousRespiratoryName,
} from "../utils/respiratoryNames";

import {
  getSystemStructureName,
} from "../utils/systemNames";

import {
  getDigestiveCategory,
  getMuscularCategory,
  getNervousCategory,
  getRespiratoryCategory,
  getSkeletalCategory,
  type SystemCategory,
} from "../utils/systemClassification";

/* ======================================================
   ACCIONES DEL VISOR
====================================================== */

export type ViewerActionType =
  | "isolate"
  | "hide"
  | "transparency"
  | "reset";

export type ViewerAction = {
  type: ViewerActionType;
  id: number;
};

/* ======================================================
   ENFOQUE EXTERNO
====================================================== */

export type StructureFocusRequest = {
  structureName: string;
  id: number;
};

/* ======================================================
   PROPS
====================================================== */

type AnatomyViewerProps = {
  system: AnatomySystemId;

  modelPath: string;

  layer: AnatomyLayerId;

  onStructureSelect?: (
    structureName: string | null
  ) => void;

  action?: ViewerAction | null;

  focusRequest?:
    | StructureFocusRequest
    | null;
};

/* ======================================================
   COLORES
====================================================== */

const COLORS = {
  /* Cardiovascular */

  heart: "#8f2438",

  artery: "#d94b59",

  vein: "#4f6fa8",

  /* Respiratorio */

  lung: "#b97882",

  airway: "#7896a8",

  upperAirway: "#9c87aa",

  /* Nervioso */

  nervousCentral: "#d6a84b",

  nervousPeripheral: "#e4c978",

  /* Esquelético */

  skeletalAxial: "#d8d1c4",

  skeletalAppendicular: "#b9c1ca",

  /* Muscular */

  muscularHeadNeck: "#9f5656",

  muscularTrunk: "#a64b4b",

  muscularUpper: "#bd6666",

  muscularLower: "#874040",

  /* Digestivo */

  digestiveTract: "#b87949",

  digestiveAccessory: "#d2a15f",

  /* Otros */

  other: "#94a3b8",

  /* Selección */

  selected: "#f59e0b",

  selectedEmissive: "#92400e",
};

/* ======================================================
   EJES
====================================================== */

type AxisName =
  | "x"
  | "y"
  | "z";

type BodyAxes = {
  vertical: AxisName;
  horizontal: AxisName;
  depth: AxisName;
};

/* ======================================================
   NORMALIZAR TEXTO
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
    );
}

/* ======================================================
   CLASIFICACIÓN POR NOMBRE
====================================================== */

function getNameCategory(
  system: AnatomySystemId,
  structureName: string
): SystemCategory {
  /* ====================================================
     CARDIOVASCULAR
  ==================================================== */

  if (
    system === "cardiovascular"
  ) {
    const category =
      getCardiovascularCategory(
        structureName
      );

    if (
      category === "heart"
    ) {
      return "heart";
    }

    if (
      category === "artery"
    ) {
      return "artery";
    }

    if (
      category === "vein"
    ) {
      return "vein";
    }

    return "other";
  }

  /* ====================================================
     RESPIRATORIO
  ==================================================== */

  if (
    system === "respiratory"
  ) {
    return getRespiratoryCategory(
      structureName
    );
  }

  /* ====================================================
     NERVIOSO
  ==================================================== */

  if (
    system === "nervous"
  ) {
    return getNervousCategory(
      structureName
    );
  }

  /* ====================================================
     ESQUELÉTICO
  ==================================================== */

  if (
    system === "skeletal"
  ) {
    return getSkeletalCategory(
      structureName
    );
  }

  /* ====================================================
     MUSCULAR
  ==================================================== */

  if (
    system === "muscular"
  ) {
    return getMuscularCategory(
      structureName
    );
  }

  /* ====================================================
     DIGESTIVO
  ==================================================== */

  return getDigestiveCategory(
    structureName
  );
}

/* ======================================================
   DETECTAR EJES DEL CUERPO
====================================================== */

function getBodyAxes(
  bounds: THREE.Box3
): BodyAxes {
  const size =
    bounds.getSize(
      new THREE.Vector3()
    );

  const axes = [
    {
      axis: "x" as AxisName,
      size: size.x,
    },
    {
      axis: "y" as AxisName,
      size: size.y,
    },
    {
      axis: "z" as AxisName,
      size: size.z,
    },
  ].sort(
    (a, b) =>
      b.size - a.size
  );

  return {
    vertical:
      axes[0].axis,

    horizontal:
      axes[1].axis,

    depth:
      axes[2].axis,
  };
}

/* ======================================================
   VALOR DE UN EJE
====================================================== */

function getAxisValue(
  vector: THREE.Vector3,
  axis: AxisName
) {
  if (
    axis === "x"
  ) {
    return vector.x;
  }

  if (
    axis === "y"
  ) {
    return vector.y;
  }

  return vector.z;
}

/* ======================================================
   BOUNDING BOX PROPIA DE UN MESH

   No incluye hijos.
====================================================== */

function getOwnMeshBounds(
  mesh: THREE.Mesh
) {
  const geometry =
    mesh.geometry;

  if (
    !geometry.boundingBox
  ) {
    geometry.computeBoundingBox();
  }

  if (
    !geometry.boundingBox
  ) {
    return null;
  }

  return geometry.boundingBox
    .clone()
    .applyMatrix4(
      mesh.matrixWorld
    );
}

/* ======================================================
   CLASIFICACIÓN MUSCULAR ESPACIAL
====================================================== */

function getMuscularSpatialCategory(
  mesh: THREE.Mesh,
  modelBounds: THREE.Box3,
  axes: BodyAxes
): SystemCategory {
  const meshBounds =
    getOwnMeshBounds(
      mesh
    );

  if (
    !meshBounds
  ) {
    return "muscular-trunk";
  }

  const bodySize =
    modelBounds.getSize(
      new THREE.Vector3()
    );

  const bodyCenter =
    modelBounds.getCenter(
      new THREE.Vector3()
    );

  const meshCenter =
    meshBounds.getCenter(
      new THREE.Vector3()
    );

  const verticalSize =
    getAxisValue(
      bodySize,
      axes.vertical
    );

  const horizontalSize =
    getAxisValue(
      bodySize,
      axes.horizontal
    );

  if (
    verticalSize <= 0 ||
    horizontalSize <= 0
  ) {
    return "muscular-trunk";
  }

  const bodyVerticalMin =
    getAxisValue(
      modelBounds.min,
      axes.vertical
    );

  const meshVertical =
    getAxisValue(
      meshCenter,
      axes.vertical
    );

  const meshHorizontal =
    getAxisValue(
      meshCenter,
      axes.horizontal
    );

  const bodyHorizontal =
    getAxisValue(
      bodyCenter,
      axes.horizontal
    );

  const verticalRatio =
    (
      meshVertical -
      bodyVerticalMin
    ) /
    verticalSize;

  const horizontalRatio =
    Math.abs(
      meshHorizontal -
      bodyHorizontal
    ) /
    horizontalSize;

  /* Cabeza y cuello */

  if (
    verticalRatio >= 0.82
  ) {
    return "muscular-head-neck";
  }

  /* Miembros inferiores */

  if (
    verticalRatio <= 0.47
  ) {
    return "muscular-lower-limb";
  }

  /* Miembros superiores */

  if (
    verticalRatio > 0.45 &&
    verticalRatio < 0.82 &&
    horizontalRatio >= 0.18
  ) {
    return "muscular-upper-limb";
  }

  /* Tronco */

  return "muscular-trunk";
}

/* ======================================================
   CLASIFICACIÓN FINAL
====================================================== */

function getMeshCategory(
  system: AnatomySystemId,
  mesh: THREE.Mesh,
  modelBounds: THREE.Box3,
  axes: BodyAxes
): SystemCategory {
  const nameCategory =
    getNameCategory(
      system,
      mesh.name
    );

  if (
    system === "muscular"
  ) {
    if (
      nameCategory !== "other"
    ) {
      return nameCategory;
    }

    return getMuscularSpatialCategory(
      mesh,
      modelBounds,
      axes
    );
  }

  return nameCategory;
}

/* ======================================================
   CATEGORÍA GUARDADA
====================================================== */

function getStoredCategory(
  mesh: THREE.Mesh
): SystemCategory {
  const category =
    mesh.userData
      .anatomyCategory;

  if (
    typeof category ===
    "string"
  ) {
    return category as SystemCategory;
  }

  return "other";
}

/* ======================================================
   MATERIAL
====================================================== */

function getMeshMaterial(
  mesh: THREE.Mesh
) {
  if (
    mesh.material instanceof
    THREE.MeshStandardMaterial
  ) {
    return mesh.material;
  }

  return null;
}

/* ======================================================
   VISIBILIDAD DEL MATERIAL

   IMPORTANTE:

   Usamos material.visible en lugar de mesh.visible
   para no ocultar accidentalmente los hijos de un
   mesh padre del modelo Z-Anatomy.
====================================================== */

function setMeshRendered(
  mesh: THREE.Mesh,
  visible: boolean
) {
  /*
   * El objeto siempre permanece activo
   * dentro de la jerarquía.
   */
  mesh.visible = true;

  const material =
    getMeshMaterial(
      mesh
    );

  if (
    !material
  ) {
    return;
  }

  material.visible =
    visible;

  material.needsUpdate =
    true;
}

/* ======================================================
   SABER SI EL MESH ESTÁ MOSTRÁNDOSE
====================================================== */

function isMeshRendered(
  mesh: THREE.Mesh
) {
  const material =
    getMeshMaterial(
      mesh
    );

  if (
    !material
  ) {
    return false;
  }

  return material.visible;
}

/* ======================================================
   COLOR POR CATEGORÍA
====================================================== */

function getCategoryColor(
  system: AnatomySystemId,
  category: SystemCategory
) {
  switch (
    category
  ) {
    /* Cardiovascular */

    case "heart":
      return COLORS.heart;

    case "artery":
      return COLORS.artery;

    case "vein":
      return COLORS.vein;

    /* Respiratorio */

    case "lung":
      return COLORS.lung;

    case "airway":
      return COLORS.airway;

    case "upper-airway":
      return COLORS.upperAirway;

    /* Nervioso */

    case "nervous-central":
      return COLORS.nervousCentral;

    case "nervous-peripheral":
      return COLORS.nervousPeripheral;

    /* Esquelético */

    case "skeletal-axial":
      return COLORS.skeletalAxial;

    case "skeletal-appendicular":
      return COLORS.skeletalAppendicular;

    /* Muscular */

    case "muscular-head-neck":
      return COLORS.muscularHeadNeck;

    case "muscular-trunk":
      return COLORS.muscularTrunk;

    case "muscular-upper-limb":
      return COLORS.muscularUpper;

    case "muscular-lower-limb":
      return COLORS.muscularLower;

    /* Digestivo */

    case "digestive-tract":
      return COLORS.digestiveTract;

    case "digestive-accessory":
      return COLORS.digestiveAccessory;

    default:
      return (
        anatomySystems[
          system
        ]?.color ??
        COLORS.other
      );
  }
}

/* ======================================================
   GENERAL CARDIOVASCULAR
====================================================== */

function isGeneralCardiovascularStructure(
  structureName: string
) {
  const name =
    normalizeName(
      structureName
    );

  const category =
    getCardiovascularCategory(
      structureName
    );

  if (
    category === "heart"
  ) {
    return true;
  }

  const importantStructures = [
    "aorta",
    "aortic",
    "vena_cava",
    "cava",
    "pulmonary_trunk",
    "pulmonary_artery",
    "pulmonary_arteries",
    "pulmonary_vein",
    "pulmonary_veins",
    "carotid",
    "subclavian",
    "brachiocephalic",
    "iliac",
    "femoral",
  ];

  return importantStructures.some(
    (keyword) =>
      name.includes(
        keyword
      )
  );
}

/* ======================================================
   GENERAL RESPIRATORIO
====================================================== */

function isGeneralRespiratoryStructure(
  structureName: string
) {
  const category =
    getRespiratoryCategory(
      structureName
    );

  return (
    category === "lung" ||
    category === "airway"
  );
}

/* ======================================================
   VISIBILIDAD POR CAPA
====================================================== */

function shouldMeshBeVisible(
  system: AnatomySystemId,
  mesh: THREE.Mesh,
  layer: AnatomyLayerId
) {
  if (
    isInvalidStructureName(
      mesh.name
    )
  ) {
    return false;
  }

  const category =
    getStoredCategory(
      mesh
    );

  /* ====================================================
     COMPLETO
  ==================================================== */

  if (
    layer === "complete"
  ) {
    return true;
  }

  /* ====================================================
     GENERAL
  ==================================================== */

  if (
    layer === "general"
  ) {
    if (
      system === "cardiovascular"
    ) {
      return isGeneralCardiovascularStructure(
        mesh.name
      );
    }

    if (
      system === "respiratory"
    ) {
      return isGeneralRespiratoryStructure(
        mesh.name
      );
    }

    return true;
  }

  /* ====================================================
     CARDIOVASCULAR
  ==================================================== */

  if (
    layer === "heart"
  ) {
    return (
      category === "heart"
    );
  }

  if (
    layer === "arteries"
  ) {
    return (
      category === "artery"
    );
  }

  if (
    layer === "veins"
  ) {
    return (
      category === "vein"
    );
  }

  /* ====================================================
     RESPIRATORIO
  ==================================================== */

  if (
    layer === "lungs"
  ) {
    return (
      category === "lung"
    );
  }

  if (
    layer === "airways"
  ) {
    return (
      category === "airway"
    );
  }

  if (
    layer ===
    "upper-airway"
  ) {
    return (
      category ===
      "upper-airway"
    );
  }

  /* ====================================================
     NERVIOSO
  ==================================================== */

  if (
    layer ===
    "nervous-central"
  ) {
    return (
      category ===
      "nervous-central"
    );
  }

  if (
    layer ===
    "nervous-peripheral"
  ) {
    return (
      category ===
      "nervous-peripheral"
    );
  }

  /* ====================================================
     ESQUELÉTICO
  ==================================================== */

  if (
    layer ===
    "skeletal-axial"
  ) {
    return (
      category ===
      "skeletal-axial"
    );
  }

  if (
    layer ===
    "skeletal-appendicular"
  ) {
    return (
      category ===
      "skeletal-appendicular"
    );
  }

  /* ====================================================
     MUSCULAR
  ==================================================== */

  if (
    layer ===
    "muscular-head-neck"
  ) {
    return (
      category ===
      "muscular-head-neck"
    );
  }

  if (
    layer ===
    "muscular-trunk"
  ) {
    return (
      category ===
      "muscular-trunk"
    );
  }

  if (
    layer ===
    "muscular-upper-limb"
  ) {
    return (
      category ===
      "muscular-upper-limb"
    );
  }

  if (
    layer ===
    "muscular-lower-limb"
  ) {
    return (
      category ===
      "muscular-lower-limb"
    );
  }

  /* ====================================================
     DIGESTIVO
  ==================================================== */

  if (
    layer ===
    "digestive-tract"
  ) {
    return (
      category ===
      "digestive-tract"
    );
  }

  if (
    layer ===
    "digestive-accessory"
  ) {
    return (
      category ===
      "digestive-accessory"
    );
  }

  return true;
}

/* ======================================================
   MODELO
====================================================== */

function AnatomyModel({
  system,
  modelPath,
  layer,
  onStructureSelect,
  action,
  focusRequest,
}: AnatomyViewerProps) {
  const {
    scene,
  } =
    useGLTF(
      modelPath
    );

  const selectedMeshRef =
    useRef<THREE.Mesh | null>(
      null
    );

  /* ====================================================
     PREPARAR MODELO
  ==================================================== */

  const model =
    useMemo(() => {
      const clone =
        scene.clone(
          true
        );

      /* ==================================================
         NORMALIZAR ESCALA
      ================================================== */

      const initialBounds =
        new THREE.Box3()
          .setFromObject(
            clone
          );

      const initialSize =
        initialBounds.getSize(
          new THREE.Vector3()
        );

      const maxDimension =
        Math.max(
          initialSize.x,
          initialSize.y,
          initialSize.z
        );

      if (
        maxDimension > 0
      ) {
        let desiredSize =
          anatomySystems[
            system
          ].viewerSize;

        if (
          modelPath.includes(
            "cardiovascular_bodyparts"
          )
        ) {
          desiredSize =
            6;
        }

        const scale =
          desiredSize /
          maxDimension;

        clone.scale.setScalar(
          scale
        );
      }

      clone.updateMatrixWorld(
        true
      );

      /* ==================================================
         LIMITES DEL CUERPO
      ================================================== */

      const modelBounds =
        new THREE.Box3()
          .setFromObject(
            clone
          );

      const axes =
        getBodyAxes(
          modelBounds
        );

      if (
        system === "muscular"
      ) {
        console.log(
          "EJES MUSCULARES:",
          axes
        );
      }

      /* ==================================================
         PREPARAR MESHES
      ================================================== */

      clone.traverse(
        (object) => {
          if (
            !(
              object instanceof
              THREE.Mesh
            )
          ) {
            return;
          }

          object.geometry
            .computeBoundingBox();

          const category =
            getMeshCategory(
              system,
              object,
              modelBounds,
              axes
            );

          object.userData
            .anatomyCategory =
            category;

          /*
           * MUY IMPORTANTE:
           *
           * Nunca ocultamos object.visible porque
           * puede tener otros meshes como hijos.
           */
          object.visible =
            true;

          object.castShadow =
            true;

          object.receiveShadow =
            true;

          object.material =
            new THREE.MeshStandardMaterial({
              color:
                getCategoryColor(
                  system,
                  category
                ),

              roughness:
                0.58,

              metalness:
                0,

              transparent:
                false,

              opacity:
                1,

              visible:
                true,

              side:
                THREE.DoubleSide,
            });
        }
      );

      return clone;
    }, [
      scene,
      system,
      modelPath,
    ]);

  /* ====================================================
     RESTAURAR COLOR
  ==================================================== */

  const restoreHighlight = (
    mesh:
      | THREE.Mesh
      | null
  ) => {
    if (
      !mesh
    ) {
      return;
    }

    const material =
      getMeshMaterial(
        mesh
      );

    if (
      !material
    ) {
      return;
    }

    const category =
      getStoredCategory(
        mesh
      );

    material.color.set(
      getCategoryColor(
        system,
        category
      )
    );

    material.emissive.set(
      "#000000"
    );

    material.emissiveIntensity =
      0;
  };

  /* ====================================================
     RESALTAR
  ==================================================== */

  const highlightMesh = (
    mesh: THREE.Mesh
  ) => {
    const material =
      getMeshMaterial(
        mesh
      );

    if (
      !material
    ) {
      return;
    }

    material.color.set(
      COLORS.selected
    );

    material.emissive.set(
      COLORS
        .selectedEmissive
    );

    material.emissiveIntensity =
      0.35;
  };

  /* ====================================================
     DIAGNÓSTICO
  ==================================================== */

  useEffect(() => {
    const counts: Record<
      string,
      number
    > = {
      total: 0,
    };

    const structureNames: {
      original: string;
      visible: string;
      category: string;
    }[] = [];

    const unknownCardiovascularWords:
      Record<
        string,
        string[]
      > = {};

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

        counts.total++;

        const category =
          getStoredCategory(
            object
          );

        counts[
          category
        ] =
          (
            counts[
              category
            ] ?? 0
          ) + 1;

        structureNames.push({
          original:
            object.name,

          visible:
            getSystemStructureName(
              system,
              object.name
            ),

          category,
        });

        if (
          system ===
          "cardiovascular"
        ) {
          const unknown =
            getUnknownAnatomyWords(
              object.name
            );

          if (
            unknown.length > 0
          ) {
            unknownCardiovascularWords[
              object.name
            ] =
              unknown;
          }
        }
      }
    );

    console.log(
      "======================================"
    );

    console.log(
      `SISTEMA: ${system.toUpperCase()}`
    );

    console.table(
      counts
    );

    /* ==================================================
       MUSCULAR
    ================================================== */

    if (
      system === "muscular"
    ) {
      console.log(
        "DISTRIBUCIÓN MUSCULAR"
      );

      console.log(
        "Cabeza/cuello:",
        counts[
          "muscular-head-neck"
        ] ?? 0
      );

      console.log(
        "Tronco:",
        counts[
          "muscular-trunk"
        ] ?? 0
      );

      console.log(
        "Miembros superiores:",
        counts[
          "muscular-upper-limb"
        ] ?? 0
      );

      console.log(
        "Miembros inferiores:",
        counts[
          "muscular-lower-limb"
        ] ?? 0
      );
    }

    /* ==================================================
       RESPIRATORIO
    ================================================== */

    if (
      system ===
      "respiratory"
    ) {
      const suspicious: {
        original: string;
        visible: string;
      }[] = [];

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

          if (
            isSuspiciousRespiratoryName(
              object.name
            )
          ) {
            suspicious.push({
              original:
                object.name,

              visible:
                getRespiratoryStructureName(
                  object.name
                ),
            });
          }
        }
      );

      console.log(
        "NOMBRES RESPIRATORIOS QUE NECESITAN REVISIÓN:"
      );

      suspicious.forEach(
        ({
          original,
          visible,
        }) => {
          console.log(
            `${original} -> ${visible}`
          );
        }
      );

      console.log(
        "TOTAL A REVISAR:",
        suspicious.length
      );
    }

    /* ==================================================
       SISTEMAS NUEVOS
    ================================================== */

    if (
      system === "nervous" ||
      system === "skeletal" ||
      system === "muscular" ||
      system === "digestive"
    ) {
      console.log(
        "CLASIFICACIÓN DE ESTRUCTURAS:"
      );

      console.table(
        structureNames
      );
    }

    console.log(
      "======================================"
    );
  }, [
    model,
    system,
  ]);

  /* ====================================================
     CAMBIO DE CAPA
  ==================================================== */

  useEffect(() => {
    if (
      selectedMeshRef
        .current
    ) {
      restoreHighlight(
        selectedMeshRef
          .current
      );
    }

    selectedMeshRef.current =
      null;

    onStructureSelect?.(
      null
    );

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

        const shouldShow =
          shouldMeshBeVisible(
            system,
            object,
            layer
          );

        /*
         * Aquí está la corrección importante.
         */
        setMeshRendered(
          object,
          shouldShow
        );

        const material =
          getMeshMaterial(
            object
          );

        if (
          !material
        ) {
          return;
        }

        const category =
          getStoredCategory(
            object
          );

        material.color.set(
          getCategoryColor(
            system,
            category
          )
        );

        material.emissive.set(
          "#000000"
        );

        material.emissiveIntensity =
          0;

        material.opacity =
          1;

        material.transparent =
          false;

        material.depthWrite =
          true;

        material.needsUpdate =
          true;
      }
    );
  }, [
    system,
    layer,
    model,
    onStructureSelect,
  ]);

  /* ====================================================
     ENFOQUE EXTERNO
  ==================================================== */

  useEffect(() => {
    if (
      !focusRequest
    ) {
      return;
    }

    let target:
      | THREE.Mesh
      | null =
      null;

    model.traverse(
      (object) => {
        if (
          target
        ) {
          return;
        }

        if (
          !(
            object instanceof
            THREE.Mesh
          )
        ) {
          return;
        }

        if (
          object.name ===
          focusRequest
            .structureName
        ) {
          target =
            object;
        }
      }
    );

    if (
      !target
    ) {
      console.warn(
        "No se encontró la estructura:",
        focusRequest
          .structureName
      );

      return;
    }

    if (
      selectedMeshRef
        .current &&
      selectedMeshRef
        .current !==
        target
    ) {
      restoreHighlight(
        selectedMeshRef
          .current
      );
    }

    setMeshRendered(
      target,
      true
    );

    selectedMeshRef.current =
      target;

    highlightMesh(
      target
    );

    onStructureSelect?.(
      target.name
    );
  }, [
    focusRequest,
    model,
    onStructureSelect,
  ]);

  /* ====================================================
     CLIC
  ==================================================== */

  const handleClick = (
    event:
      ThreeEvent<MouseEvent>
  ) => {
    event.stopPropagation();

    const object =
      event.object;

    if (
      !(
        object instanceof
        THREE.Mesh
      )
    ) {
      return;
    }

    if (
      isInvalidStructureName(
        object.name
      )
    ) {
      return;
    }

    /*
     * Material oculto = estructura
     * fuera de la capa actual.
     */
    if (
      !isMeshRendered(
        object
      )
    ) {
      return;
    }

    if (
      selectedMeshRef
        .current &&
      selectedMeshRef
        .current !==
        object
    ) {
      restoreHighlight(
        selectedMeshRef
          .current
      );
    }

    selectedMeshRef.current =
      object;

    highlightMesh(
      object
    );

    onStructureSelect?.(
      object.name
    );
  };

  /* ====================================================
     ACCIONES DEL TOOLBAR
  ==================================================== */

  useEffect(() => {
    if (
      !action
    ) {
      return;
    }

    const selected =
      selectedMeshRef
        .current;

    /* ==================================================
       AISLAR
    ================================================== */

    if (
      action.type ===
      "isolate"
    ) {
      if (
        !selected
      ) {
        return;
      }

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

          setMeshRendered(
            object,
            object ===
              selected
          );
        }
      );

      return;
    }

    /* ==================================================
       OCULTAR
    ================================================== */

    if (
      action.type ===
      "hide"
    ) {
      if (
        !selected
      ) {
        return;
      }

      setMeshRendered(
        selected,
        false
      );

      restoreHighlight(
        selected
      );

      selectedMeshRef.current =
        null;

      onStructureSelect?.(
        null
      );

      return;
    }

    /* ==================================================
       TRANSPARENCIA
    ================================================== */

    if (
      action.type ===
      "transparency"
    ) {
      if (
        !selected
      ) {
        return;
      }

      const material =
        getMeshMaterial(
          selected
        );

      if (
        !material
      ) {
        return;
      }

      if (
        material.opacity < 1
      ) {
        material.opacity =
          1;

        material.transparent =
          false;

        material.depthWrite =
          true;
      } else {
        material.opacity =
          0.2;

        material.transparent =
          true;

        material.depthWrite =
          false;
      }

      material.needsUpdate =
        true;

      return;
    }

    /* ==================================================
       RESTABLECER
    ================================================== */

    if (
      action.type === "reset"
    ) {
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

          const shouldShow =
            shouldMeshBeVisible(
              system,
              object,
              layer
            );

          setMeshRendered(
            object,
            shouldShow
          );

          const material =
            getMeshMaterial(
              object
            );

          if (
            !material
          ) {
            return;
          }

          const category =
            getStoredCategory(
              object
            );

          material.color.set(
            getCategoryColor(
              system,
              category
            )
          );

          material.emissive.set(
            "#000000"
          );

          material.emissiveIntensity =
            0;

          material.opacity =
            1;

          material.transparent =
            false;

          material.depthWrite =
            true;

          material.needsUpdate =
            true;
        }
      );

      selectedMeshRef.current =
        null;

      onStructureSelect?.(
        null
      );
    }
  }, [
    action,
    system,
    layer,
    model,
    onStructureSelect,
  ]);

  /* ====================================================
     RENDER
  ==================================================== */

  return (
    <Center>
      <primitive
        object={
          model
        }
        onClick={
          handleClick
        }
      />
    </Center>
  );
}

/* ======================================================
   LOADING
====================================================== */

function LoadingModel() {
  return (
    <mesh>
      <sphereGeometry
        args={[
          0.15,
          32,
          32,
        ]}
      />

      <meshStandardMaterial
        color="#94a3b8"
      />
    </mesh>
  );
}

/* ======================================================
   VISOR PRINCIPAL
====================================================== */

export default function AnatomyViewer({
  system,
  modelPath,
  layer,
  onStructureSelect,
  action,
  focusRequest,
}: AnatomyViewerProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        camera={{
          position: [
            0,
            0.5,
            8,
          ],

          fov: 40,

          near: 0.01,

          far: 1000,
        }}
        gl={{
          antialias: true,

          alpha: false,
        }}
        dpr={[
          1,
          2,
        ]}
      >
        {/* FONDO */}

        <color
          attach="background"
          args={[
            "#f1f5f9",
          ]}
        />

        {/* ILUMINACIÓN */}

        <ambientLight
          intensity={
            0.65
          }
        />

        <directionalLight
          position={[
            5,
            6,
            5,
          ]}
          intensity={
            1.4
          }
        />

        <directionalLight
          position={[
            -5,
            3,
            4,
          ]}
          intensity={
            0.7
          }
        />

        <directionalLight
          position={[
            0,
            4,
            -5,
          ]}
          intensity={
            0.45
          }
        />

        {/* MODELO */}

        <Suspense
          fallback={
            <LoadingModel />
          }
        >
          <AnatomyModel
            system={
              system
            }
            modelPath={
              modelPath
            }
            layer={
              layer
            }
            onStructureSelect={
              onStructureSelect
            }
            action={
              action
            }
            focusRequest={
              focusRequest
            }
          />
        </Suspense>

        {/* CONTROLES */}

        <OrbitControls
          enableRotate
          enableZoom
          enablePan
          enableDamping
          dampingFactor={
            0.08
          }
          zoomSpeed={
            0.8
          }
          rotateSpeed={
            0.7
          }
          panSpeed={
            0.7
          }
          minDistance={
            0.35
          }
          maxDistance={
            18
          }
          target={[
            0,
            0,
            0,
          ]}
        />
      </Canvas>
    </div>
  );
}