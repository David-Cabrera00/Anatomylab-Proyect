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
  getNervousCategory,
  getRespiratoryCategory,
  getSkeletalCategory,
  type SystemCategory,
} from "../utils/systemClassification";

import {
  classifyMuscularHierarchy,
} from "../utils/muscularHierarchy";

/* ======================================================
   ACCIONES
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
   ENFOQUE
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
    structureName:
      | string
      | null
  ) => void;

  action?:
    | ViewerAction
    | null;

  focusRequest?:
    | StructureFocusRequest
    | null;
};

/* ======================================================
   COLORES
====================================================== */

const COLORS = {
  /* Cardiovascular */

  heart:
    "#8f2438",

  artery:
    "#d94b59",

  vein:
    "#4f6fa8",

  /* Respiratorio */

  lung:
    "#b97882",

  airway:
    "#7896a8",

  upperAirway:
    "#9c87aa",

  /* Nervioso */

  nervousCentral:
    "#d6a84b",

  nervousPeripheral:
    "#e4c978",

  /* Esquelético */

  skeletalAxial:
    "#d8d1c4",

  skeletalAppendicular:
    "#b9c1ca",

  /* Muscular */

  muscularHeadNeck:
    "#9f5656",

  muscularTrunk:
    "#a64b4b",

  muscularUpper:
    "#bd6666",

  muscularLower:
    "#874040",

  /* Digestivo */

  digestiveTract:
    "#b87949",

  digestiveAccessory:
    "#d2a15f",

  /* Otros */

  other:
    "#94a3b8",

  /* Selección */

  selected:
    "#f59e0b",

  selectedEmissive:
    "#92400e",
};

/* ======================================================
   NORMALIZACIÓN
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
   CATEGORÍA PARA SISTEMAS NO MUSCULARES
====================================================== */

function getStructureCategory(
  system: AnatomySystemId,
  structureName: string
): SystemCategory {
  /* Cardiovascular */

  if (
    system ===
    "cardiovascular"
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

  /* Respiratorio */

  if (
    system ===
    "respiratory"
  ) {
    return getRespiratoryCategory(
      structureName
    );
  }

  /* Nervioso */

  if (
    system ===
    "nervous"
  ) {
    return getNervousCategory(
      structureName
    );
  }

  /* Esquelético */

  if (
    system ===
    "skeletal"
  ) {
    return getSkeletalCategory(
      structureName
    );
  }

  /* Digestivo */

  if (
    system ===
    "digestive"
  ) {
    return getDigestiveCategory(
      structureName
    );
  }

  /*
   * Muscular se clasifica usando
   * muscularHierarchy.ts.
   */
  return "other";
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
   COLOR
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
   MOSTRAR / OCULTAR MESH

   Usamos layers de Three.js.

   Layer 0 = visible.
   Layer 1 = oculto.

   Esto evita que ocultar un padre también
   oculte todos sus descendientes.
====================================================== */

function setMeshRendered(
  mesh: THREE.Mesh,
  rendered: boolean
) {
  /*
   * El objeto permanece visible jerárquicamente.
   */
  mesh.visible =
    true;

  if (
    rendered
  ) {
    mesh.layers.set(
      0
    );
  } else {
    mesh.layers.set(
      1
    );
  }
}

function isMeshRendered(
  mesh: THREE.Mesh
) {
  return mesh.layers
    .isEnabled(
      0
    );
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
    category ===
      "lung" ||
    category ===
      "airway"
  );
}

/* ======================================================
   VISIBILIDAD SEGÚN CAPA
====================================================== */

function shouldMeshBeVisible(
  system: AnatomySystemId,
  mesh: THREE.Mesh,
  layer: AnatomyLayerId
) {
  /* Mesh técnico */

  if (
    mesh.userData
      .anatomyIgnore ===
    true
  ) {
    return false;
  }

  /*
   * Para Muscular ya conocemos exactamente
   * las piezas que pertenecen al modelo.
   *
   * No aplicamos aquí filtros de nombres
   * diseñados originalmente para cardiovascular.
   */
  if (
    system !==
      "muscular" &&
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
    layer ===
    "complete"
  ) {
    return true;
  }

  /* ====================================================
     GENERAL
  ==================================================== */

  if (
    layer ===
    "general"
  ) {
    if (
      system ===
      "cardiovascular"
    ) {
      return isGeneralCardiovascularStructure(
        mesh.name
      );
    }

    if (
      system ===
      "respiratory"
    ) {
      return isGeneralRespiratoryStructure(
        mesh.name
      );
    }

    /*
     * Nervioso, esquelético,
     * muscular y digestivo:
     * General muestra todo.
     */
    return true;
  }

  /* ====================================================
     CARDIOVASCULAR
  ==================================================== */

  if (
    layer ===
    "heart"
  ) {
    return (
      category ===
      "heart"
    );
  }

  if (
    layer ===
    "arteries"
  ) {
    return (
      category ===
      "artery"
    );
  }

  if (
    layer ===
    "veins"
  ) {
    return (
      category ===
      "vein"
    );
  }

  /* ====================================================
     RESPIRATORIO
  ==================================================== */

  if (
    layer ===
    "lungs"
  ) {
    return (
      category ===
      "lung"
    );
  }

  if (
    layer ===
    "airways"
  ) {
    return (
      category ===
      "airway"
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
    useRef<
      THREE.Mesh | null
    >(
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

      /* ================================================
         NORMALIZAR TAMAÑO
      ================================================ */

      const bounds =
        new THREE.Box3()
          .setFromObject(
            clone
          );

      const size =
        bounds.getSize(
          new THREE.Vector3()
        );

      const maxDimension =
        Math.max(
          size.x,
          size.y,
          size.z
        );

      if (
        maxDimension >
        0
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

      /* ================================================
         PREPARAR MATERIALES Y CATEGORÍAS INICIALES
      ================================================ */

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

          object.visible =
            true;

          object.layers.set(
            0
          );

          object.castShadow =
            true;

          object.receiveShadow =
            true;

          object.userData
            .anatomyIgnore =
            false;

          /*
           * Muscular se clasificará después
           * usando la jerarquía real.
           */
          const category =
            system ===
            "muscular"
              ? "other"
              : getStructureCategory(
                  system,
                  object.name
                );

          object.userData
            .anatomyCategory =
            category;

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

              side:
                THREE.DoubleSide,
            });
        }
      );

      /* ================================================
         MUSCULAR
         CLASIFICACIÓN REAL SEGÚN Z-ANATOMY
      ================================================ */

      if (
        system ===
        "muscular"
      ) {
        const result =
          classifyMuscularHierarchy(
            clone
          );

        clone.userData
          .muscularHierarchyResult =
          result;

        /*
         * Ahora que cada mesh tiene su categoría
         * correcta, aplicamos los colores.
         */
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
          }
        );
      }

      return clone;
    }, [
      scene,
      system,
      modelPath,
    ]);

  /* ====================================================
     RESTAURAR SELECCIÓN
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

        if (
          object.userData
            .anatomyIgnore ===
          true
        ) {
          counts.ignored =
            (
              counts.ignored ??
              0
            ) + 1;

          return;
        }

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
      system ===
      "muscular"
    ) {
      const result =
        model.userData
          .muscularHierarchyResult;

      console.log(
        "CLASIFICACIÓN MUSCULAR BASADA EN EL GLB:"
      );

      console.log(
        result
      );

      console.log(
        "VALORES ESPERADOS PARA muscular_overview.glb:"
      );

      console.log(
        "Cabeza/cuello: 175"
      );

      console.log(
        "Tronco: 153"
      );

      console.log(
        "Miembros superiores: 222"
      );

      console.log(
        "Miembros inferiores: 272"
      );

      console.log(
        "Ignorados técnicos: 1"
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
        "NOMBRES RESPIRATORIOS A REVISAR:",
        suspicious
      );

      console.log(
        "TOTAL A REVISAR:",
        suspicious.length
      );
    }

    /* ==================================================
       CARDIOVASCULAR
    ================================================== */

    if (
      system ===
      "cardiovascular"
    ) {
      const words =
        new Set<string>();

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

          const unknown =
            getUnknownAnatomyWords(
              object.name
            );

          unknown.forEach(
            (word) =>
              words.add(
                word
              )
          );
        }
      );

      console.log(
        "PALABRAS CARDIOVASCULARES SIN TRADUCIR:"
      );

      console.log(
        Array.from(
          words
        )
          .sort()
          .join(
            "\n"
          )
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
      object.userData
        .anatomyIgnore ===
      true
    ) {
      return;
    }

    if (
      !isMeshRendered(
        object
      )
    ) {
      return;
    }

    if (
      system !==
        "muscular" &&
      isInvalidStructureName(
        object.name
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
     TOOLBAR
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

    /* AISLAR */

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

          if (
            object.userData
              .anatomyIgnore ===
            true
          ) {
            setMeshRendered(
              object,
              false
            );

            return;
          }

          setMeshRendered(
            object,
            object === selected
          );
        }
      );

      return;
    }

    /* OCULTAR */

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

    /* TRANSPARENCIA */

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

      const currentlyTransparent =
        material.opacity <
        1;

      if (
        currentlyTransparent
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

    /* RESTABLECER */

    if (
      action.type ===
      "reset"
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
   VISOR
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
        <color
          attach="background"
          args={[
            "#f1f5f9",
          ]}
        />

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