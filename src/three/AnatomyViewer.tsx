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
  getStructureCategory,
  getUnknownAnatomyWords,
  isInvalidStructureName,
} from "../utils/anatomyNames";

/* ======================================================
   TIPOS
====================================================== */

export type AnatomyLayer =
  | "general"
  | "heart"
  | "arteries"
  | "veins"
  | "complete";

export type ViewerActionType =
  | "isolate"
  | "hide"
  | "transparency"
  | "reset";

export type ViewerAction = {
  type: ViewerActionType;
  id: number;
};

export type StructureFocusRequest = {
  structureName: string;
  id: number;
};

type AnatomyViewerProps = {
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
   COLORES
====================================================== */

const COLORS = {
  heart: "#8f2438",

  artery: "#d94b59",

  vein: "#4f6fa8",

  other: "#94a3b8",

  selected: "#f59e0b",

  selectedEmissive:
    "#92400e",
};

/* ======================================================
   COLOR
====================================================== */

function getStructureColor(
  structureName: string
) {
  const category =
    getStructureCategory(
      structureName
    );

  return COLORS[category];
}

/* ======================================================
   VISTA GENERAL
====================================================== */

function isGeneralStructure(
  structureName: string
) {
  const name =
    structureName.toLowerCase();

  const category =
    getStructureCategory(
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
   VISIBILIDAD
====================================================== */

function shouldBeVisible(
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
    getStructureCategory(
      structureName
    );

  if (
    layer === "complete"
  ) {
    return true;
  }

  if (
    layer === "heart"
  ) {
    return category === "heart";
  }

  if (
    layer === "arteries"
  ) {
    return category === "artery";
  }

  if (
    layer === "veins"
  ) {
    return category === "vein";
  }

  if (
    layer === "general"
  ) {
    return isGeneralStructure(
      structureName
    );
  }

  return true;
}

/* ======================================================
   MODELO
====================================================== */

function CardiovascularModel({
  modelPath,
  layer,
  onStructureSelect,
  action,
  focusRequest,
}: Pick<
  AnatomyViewerProps,
  | "modelPath"
  | "layer"
  | "onStructureSelect"
  | "action"
  | "focusRequest"
>) {
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
      /*
       * El modelo cardiovascular
       * completo necesita un poco
       * más de aire alrededor.
       *
       * El corazón detallado conserva
       * el tamaño que ya funcionaba.
       */
      const desiredSize =
        modelPath.includes(
          "cardiovascular_overview"
        )
          ? 5.8
          : 6;

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
      COLORS.selected
    );

    material.emissive.set(
      COLORS.selectedEmissive
    );

    material.emissiveIntensity =
      0.35;
  };

  /* ====================================================
     DIAGNÓSTICO
  ==================================================== */

  useEffect(() => {
    const counts = {
      heart: 0,
      arteries: 0,
      veins: 0,
      other: 0,
      invalid: 0,
      total: 0,
    };

    const otherStructures:
      string[] = [];

    const invalidStructures:
      string[] = [];

    const missingTranslations:
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

        if (
          isInvalidStructureName(
            object.name
          )
        ) {
          counts.invalid++;

          invalidStructures.push(
            object.name
          );

          return;
        }

        const category =
          getStructureCategory(
            object.name
          );

        if (
          category === "heart"
        ) {
          counts.heart++;
        }

        if (
          category === "artery"
        ) {
          counts.arteries++;
        }

        if (
          category === "vein"
        ) {
          counts.veins++;
        }

        if (
          category === "other"
        ) {
          counts.other++;

          otherStructures.push(
            object.name
          );
        }

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
    );

    console.log(
      "======================================"
    );

    console.log(
      "CLASIFICACIÓN CARDIOVASCULAR"
    );

    console.table(
      counts
    );

    console.log(
      "Estructuras sin clasificar:"
    );

    console.log(
      otherStructures.join(
        "\n"
      )
    );

    const uniqueUnknownWords = [
      ...new Set(
        Object.values(
          missingTranslations
        ).flat()
      ),
    ].sort();

    console.log(
      "PALABRAS ÚNICAS SIN TRADUCIR:"
    );

    console.log(
      uniqueUnknownWords.join(
        "\n"
      )
    );

    if (
      invalidStructures.length >
      0
    ) {
      console.log(
        "NOMBRES INVÁLIDOS OCULTADOS:"
      );

      console.log(
        invalidStructures.join(
          "\n"
        )
      );
    }
  }, [model]);

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
            object.name
          )
        );

        material.emissive.set(
          "#000000"
        );

        material.emissiveIntensity =
          0;

        material.opacity = 1;

        material.transparent =
          false;

        material.depthWrite =
          true;

        material.needsUpdate =
          true;
      }
    );
  }, [
    layer,
    model,
    onStructureSelect,
  ]);

  /* ====================================================
     ENFOQUE DESDE MODO ESTUDIO
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

    /* AISLAR */

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

    /* OCULTAR */

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

    /* TRANSPARENCIA */

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
        material.opacity = 1;

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

          object.visible =
            shouldBeVisible(
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
          <CardiovascularModel
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