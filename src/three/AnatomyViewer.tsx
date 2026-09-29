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
  getStructureCategory as getCardiovascularCategory,
  getUnknownAnatomyWords,
  isInvalidStructureName,
} from "../utils/anatomyNames";

import {
  getRespiratoryStructureName,
  isSuspiciousRespiratoryName,
} from "../utils/respiratoryNames";

/* ======================================================
   SISTEMAS
====================================================== */

export type AnatomySystemId =
  | "cardiovascular"
  | "respiratory";

/* ======================================================
   CAPAS
====================================================== */

export type AnatomyLayer =
  | "general"

  // Cardiovascular
  | "heart"
  | "arteries"
  | "veins"

  // Respiratorio
  | "lungs"
  | "airways"
  | "upper-airway"

  // Compartido
  | "complete";

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
   ENFOQUE AUTOMÁTICO
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
  layer: AnatomyLayer;

  onStructureSelect?: (
    structureName: string | null
  ) => void;

  action?: ViewerAction | null;

  focusRequest?:
    | StructureFocusRequest
    | null;
};

/* ======================================================
   CATEGORÍAS
====================================================== */

type ViewerCategory =
  | "heart"
  | "artery"
  | "vein"
  | "lung"
  | "airway"
  | "upper-airway"
  | "other";

/* ======================================================
   COLORES
====================================================== */

const CARDIOVASCULAR_COLORS = {
  heart: "#8f2438",
  artery: "#d94b59",
  vein: "#4f6fa8",
  other: "#94a3b8",
};

const RESPIRATORY_COLORS = {
  lung: "#b97882",
  airway: "#7896a8",
  upperAirway: "#9c87aa",
  other: "#94a3b8",
};

const SELECTED_COLOR =
  "#f59e0b";

const SELECTED_EMISSIVE =
  "#92400e";

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
   CLASIFICACIÓN RESPIRATORIA
====================================================== */

function getRespiratoryCategory(
  structureName: string
): ViewerCategory {
  const name =
    normalizeName(
      structureName
    );

  /* VÍA AÉREA SUPERIOR */

  if (
    name.includes("nariz") ||
    name.includes("nose") ||
    name.includes("nasal") ||
    name.includes("paranasal") ||
    name.includes("seno") ||
    name.includes("sinus") ||
    name.includes("laringe") ||
    name.includes("larynx") ||
    name.includes("epiglot") ||
    name.includes("faringe") ||
    name.includes("pharynx")
  ) {
    return "upper-airway";
  }

  /* PULMONES */

  if (
    name.includes("pulmon") ||
    name.includes("lung") ||
    name.includes("lobulo") ||
    name.includes("lobe") ||
    name.includes("segmento") ||
    name.includes("segment") ||
    name.includes("lingula") ||
    name.includes("incisura") ||
    name.includes("fisura") ||
    name.includes("fissure")
  ) {
    return "lung";
  }

  /* VÍAS RESPIRATORIAS */

  if (
    name.includes("traquea") ||
    name.includes("trachea") ||
    name.includes(
      "traqueobronquial"
    ) ||
    name.includes(
      "tracheobronchial"
    ) ||
    name.includes("bronqu") ||
    name.includes("bronch") ||
    name.includes("airway")
  ) {
    return "airway";
  }

  return "other";
}

/* ======================================================
   CLASIFICACIÓN GENERAL
====================================================== */

function getViewerCategory(
  system: AnatomySystemId,
  structureName: string
): ViewerCategory {
  if (
    system ===
    "cardiovascular"
  ) {
    return getCardiovascularCategory(
      structureName
    );
  }

  return getRespiratoryCategory(
    structureName
  );
}

/* ======================================================
   COLOR DE ESTRUCTURA
====================================================== */

function getStructureColor(
  system: AnatomySystemId,
  structureName: string
) {
  const category =
    getViewerCategory(
      system,
      structureName
    );

  if (
    system ===
    "cardiovascular"
  ) {
    if (
      category === "heart"
    ) {
      return CARDIOVASCULAR_COLORS
        .heart;
    }

    if (
      category === "artery"
    ) {
      return CARDIOVASCULAR_COLORS
        .artery;
    }

    if (
      category === "vein"
    ) {
      return CARDIOVASCULAR_COLORS
        .vein;
    }

    return CARDIOVASCULAR_COLORS
      .other;
  }

  if (
    category === "lung"
  ) {
    return RESPIRATORY_COLORS
      .lung;
  }

  if (
    category === "airway"
  ) {
    return RESPIRATORY_COLORS
      .airway;
  }

  if (
    category ===
    "upper-airway"
  ) {
    return RESPIRATORY_COLORS
      .upperAirway;
  }

  return RESPIRATORY_COLORS
    .other;
}

/* ======================================================
   CARDIOVASCULAR GENERAL
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
      name.includes(keyword)
  );
}

/* ======================================================
   RESPIRATORIO GENERAL
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
   VISIBILIDAD
====================================================== */

function shouldBeVisible(
  system: AnatomySystemId,
  structureName: string,
  layer: AnatomyLayer
) {
  if (
    isInvalidStructureName(
      structureName
    )
  ) {
    return false;
  }

  const category =
    getViewerCategory(
      system,
      structureName
    );

  if (
    layer === "complete"
  ) {
    return true;
  }

  /* CARDIOVASCULAR */

  if (
    system ===
    "cardiovascular"
  ) {
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

    if (
      layer === "general"
    ) {
      return isGeneralCardiovascularStructure(
        structureName
      );
    }
  }

  /* RESPIRATORIO */

  if (
    system === "respiratory"
  ) {
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

    if (
      layer === "general"
    ) {
      return isGeneralRespiratoryStructure(
        structureName
      );
    }
  }

  return true;
}

/* ======================================================
   MODELO ANATÓMICO
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
  } = useGLTF(modelPath);

  const selectedMeshRef =
    useRef<THREE.Mesh | null>(
      null
    );

  /* ====================================================
     PREPARAR MODELO
  ==================================================== */

  const model = useMemo(() => {
    const clone =
      scene.clone(true);

    const box =
      new THREE.Box3().setFromObject(
        clone
      );

    const size =
      box.getSize(
        new THREE.Vector3()
      );

    const maxDimension =
      Math.max(
        size.x,
        size.y,
        size.z
      );

    if (
      maxDimension > 0
    ) {
      let desiredSize = 6;

      if (
        system ===
          "cardiovascular" &&
        modelPath.includes(
          "cardiovascular_overview"
        )
      ) {
        desiredSize = 5.8;
      }

      if (
        system ===
        "respiratory"
      ) {
        desiredSize = 6;
      }

      const scale =
        desiredSize /
        maxDimension;

      clone.scale.setScalar(
        scale
      );
    }

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

        object.castShadow =
          true;

        object.receiveShadow =
          true;

        object.material =
          new THREE.MeshStandardMaterial({
            color:
              getStructureColor(
                system,
                object.name
              ),

            roughness: 0.58,
            metalness: 0,
            transparent: false,
            opacity: 1,
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
     MATERIAL
  ==================================================== */

  const getMaterial = (
    mesh: THREE.Mesh
  ) => {
    if (
      mesh.material instanceof
      THREE.MeshStandardMaterial
    ) {
      return mesh.material;
    }

    return null;
  };

  /* ====================================================
     RESTAURAR COLOR
  ==================================================== */

  const restoreHighlight = (
    mesh: THREE.Mesh | null
  ) => {
    if (!mesh) {
      return;
    }

    const material =
      getMaterial(mesh);

    if (!material) {
      return;
    }

    material.color.set(
      getStructureColor(
        system,
        mesh.name
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
      getMaterial(mesh);

    if (!material) {
      return;
    }

    material.color.set(
      SELECTED_COLOR
    );

    material.emissive.set(
      SELECTED_EMISSIVE
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

    const otherStructures:
      string[] = [];

    const missingTranslations:
      Record<
        string,
        string[]
      > = {};

    /*
     * Primer recorrido:
     * clasificación general.
     */
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
          getViewerCategory(
            system,
            object.name
          );

        counts[category] =
          (counts[category] ??
            0) + 1;

        if (
          category === "other"
        ) {
          otherStructures.push(
            object.name
          );
        }

        /*
         * Diagnóstico de traducciones
         * cardiovascular.
         */
        if (
          system ===
          "cardiovascular"
        ) {
          const unknownWords =
            getUnknownAnatomyWords(
              object.name
            );

          if (
            unknownWords.length >
            0
          ) {
            missingTranslations[
              object.name
            ] = unknownWords;
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

    console.log(
      "======================================"
    );

    console.table(counts);

    /* ======================================
       RESPIRATORIO
    ====================================== */

    if (
      system ===
      "respiratory"
    ) {
      const respiratoryNames: {
        original: string;
        visible: string;
      }[] = [];

      const suspiciousNames: {
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

          const visibleName =
            getRespiratoryStructureName(
              object.name
            );

          respiratoryNames.push({
            original:
              object.name,

            visible:
              visibleName,
          });

          if (
            isSuspiciousRespiratoryName(
              object.name
            )
          ) {
            suspiciousNames.push({
              original:
                object.name,

              visible:
                visibleName,
            });
          }
        }
      );

      console.log(
        "======================================"
      );

      console.log(
        "NOMBRES RESPIRATORIOS:"
      );

      /*
       * La tabla completa queda disponible
       * por si después queremos revisarla.
       */
      console.table(
        respiratoryNames
      );

      console.log(
        "======================================"
      );

      console.log(
        "NOMBRES QUE NECESITAN REVISIÓN:"
      );

      /*
       * IMPORTANTE:
       * los imprimimos uno por uno para
       * evitar que Chrome muestre Array(18).
       */
      suspiciousNames.forEach(
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
        suspiciousNames.length
      );
    }

    /* ======================================
       SIN CLASIFICAR
    ====================================== */

    console.log(
      "======================================"
    );

    console.log(
      "ESTRUCTURAS SIN CLASIFICAR:"
    );

    if (
      otherStructures.length ===
      0
    ) {
      console.log(
        "Ninguna"
      );
    } else {
      console.log(
        otherStructures.join(
          "\n"
        )
      );
    }

    /* ======================================
       CARDIOVASCULAR
    ====================================== */

    if (
      system ===
      "cardiovascular"
    ) {
      const unknownWords = [
        ...new Set(
          Object.values(
            missingTranslations
          ).flat()
        ),
      ].sort();

      console.log(
        "======================================"
      );

      console.log(
        "PALABRAS ÚNICAS SIN TRADUCIR:"
      );

      console.log(
        unknownWords.join(
          "\n"
        )
      );

      console.log(
        "TOTAL:",
        unknownWords.length
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
      selectedMeshRef.current
    ) {
      restoreHighlight(
        selectedMeshRef.current
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

        object.visible =
          shouldBeVisible(
            system,
            object.name,
            layer
          );

        const material =
          getMaterial(object);

        if (!material) {
          return;
        }

        material.color.set(
          getStructureColor(
            system,
            object.name
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
     ENFOQUE AUTOMÁTICO
  ==================================================== */

  useEffect(() => {
    if (
      !focusRequest
    ) {
      return;
    }

    let targetMesh:
      | THREE.Mesh
      | null = null;

    model.traverse(
      (object) => {
        if (
          targetMesh
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
          focusRequest.structureName
        ) {
          targetMesh =
            object;
        }
      }
    );

    if (
      !targetMesh
    ) {
      console.warn(
        "No se encontró la estructura:",
        focusRequest.structureName
      );

      return;
    }

    if (
      selectedMeshRef.current &&
      selectedMeshRef.current !==
        targetMesh
    ) {
      restoreHighlight(
        selectedMeshRef.current
      );
    }

    targetMesh.visible =
      true;

    selectedMeshRef.current =
      targetMesh;

    highlightMesh(
      targetMesh
    );

    onStructureSelect?.(
      targetMesh.name
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
    event: ThreeEvent<MouseEvent>
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

    if (
      !object.visible
    ) {
      return;
    }

    if (
      selectedMeshRef.current &&
      selectedMeshRef.current !==
        object
    ) {
      restoreHighlight(
        selectedMeshRef.current
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
    if (!action) {
      return;
    }

    const selected =
      selectedMeshRef.current;

    /* =================================
       AISLAR
    ================================= */

    if (
      action.type ===
      "isolate"
    ) {
      if (!selected) {
        return;
      }

      model.traverse(
        (object) => {
          if (
            object instanceof
            THREE.Mesh
          ) {
            object.visible =
              object ===
              selected;
          }
        }
      );

      return;
    }

    /* =================================
       OCULTAR
    ================================= */

    if (
      action.type ===
      "hide"
    ) {
      if (!selected) {
        return;
      }

      selected.visible =
        false;

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

    /* =================================
       TRANSPARENCIA
    ================================= */

    if (
      action.type ===
      "transparency"
    ) {
      if (!selected) {
        return;
      }

      const material =
        getMaterial(
          selected
        );

      if (!material) {
        return;
      }

      const isTransparent =
        material.opacity < 1;

      if (
        isTransparent
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

    /* =================================
       RESTABLECER
    ================================= */

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

          object.visible =
            shouldBeVisible(
              system,
              object.name,
              layer
            );

          const material =
            getMaterial(
              object
            );

          if (!material) {
            return;
          }

          material.color.set(
            getStructureColor(
              system,
              object.name
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
        object={model}
        onClick={
          handleClick
        }
      />
    </Center>
  );
}

/* ======================================================
   CARGANDO
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
        dpr={[1, 2]}
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
          intensity={0.65}
        />

        <directionalLight
          position={[
            5,
            6,
            5,
          ]}
          intensity={1.4}
        />

        <directionalLight
          position={[
            -5,
            3,
            4,
          ]}
          intensity={0.7}
        />

        <directionalLight
          position={[
            0,
            4,
            -5,
          ]}
          intensity={0.45}
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
          zoomSpeed={0.8}
          rotateSpeed={0.7}
          panSpeed={0.7}
          minDistance={0.35}
          maxDistance={18}
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