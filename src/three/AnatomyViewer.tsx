import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  Canvas,
  type ThreeEvent,
  useThree,
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

type AnatomyViewerProps = {
  modelPath: string;

  layer: AnatomyLayer;

  onStructureSelect?: (
    structureName: string | null
  ) => void;

  action?: ViewerAction | null;

  zoomLevel?: number;

  onZoomChange?: (
    value: number
  ) => void;
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
   ZOOM
====================================================== */

const MIN_DISTANCE = 0.35;
const MAX_DISTANCE = 18;

/* ======================================================
   COLOR POR CATEGORÍA
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

  /*
   * Mostramos el corazón.
   */
  if (
    category === "heart"
  ) {
    return true;
  }

  /*
   * Grandes vasos principales.
   */
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
  /*
   * No mostramos objetos
   * con nombres dañados.
   */
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
   MODELO CARDIOVASCULAR
====================================================== */

function CardiovascularModel({
  modelPath,
  layer,
  onStructureSelect,
  action,
}: Pick<
  AnatomyViewerProps,
  | "modelPath"
  | "layer"
  | "onStructureSelect"
  | "action"
>) {
  const { scene } =
    useGLTF(modelPath);

  const selectedMeshRef =
    useRef<THREE.Mesh | null>(
      null
    );

  /* ====================================================
     PREPARACIÓN DEL MODELO
  ==================================================== */

  const model = useMemo(() => {
    const clone =
      scene.clone(true);

    /*
     * Calcular tamaño.
     */
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

    /*
     * Escala automática.
     */
    if (
      maxDimension > 0
    ) {
      const desiredSize = 6;

      const scale =
        desiredSize /
        maxDimension;

      clone.scale.setScalar(
        scale
      );
    }

    /*
     * Material independiente
     * para cada mesh.
     */
    clone.traverse((object) => {
      if (
        !(
          object instanceof
          THREE.Mesh
        )
      ) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;

      object.geometry.computeVertexNormals();

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
    });

    return clone;
  }, [scene]);

  /* ====================================================
     INFORMACIÓN EN CONSOLA
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

    model.traverse((object) => {
      if (
        !(
          object instanceof
          THREE.Mesh
        )
      ) {
        return;
      }

      counts.total++;

      /*
       * Nombres inválidos.
       */
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

      /*
       * Detectar traducciones
       * todavía incompletas.
       */
      const unknownWords =
        getUnknownAnatomyWords(
          object.name
        );

      if (
        unknownWords.length > 0
      ) {
        missingTranslations[
          object.name
        ] = unknownWords;
      }
    });

    console.log(
      "======================================"
    );

    console.log(
      "CLASIFICACIÓN CARDIOVASCULAR"
    );

    console.log(
      "======================================"
    );

    console.table(counts);

    console.log(
      "Estructuras sin clasificar:"
    );

    console.log(
      otherStructures.join(
        "\n"
      )
    );

    console.log(
      "======================================"
    );

    console.log(
      "NOMBRES QUE NECESITAN TRADUCCIÓN"
    );

    Object.entries(
      missingTranslations
    ).forEach(
      ([
        structure,
        unknownWords,
      ]) => {
        console.log(
          `${structure} -> ${unknownWords.join(", ")}`
        );
      }
    );

    const uniqueUnknownWords = [
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
      uniqueUnknownWords.join(
        "\n"
      )
    );

    console.log(
      "TOTAL:",
      uniqueUnknownWords.length
    );

    if (
      invalidStructures.length >
      0
    ) {
      console.log(
        "======================================"
      );

      console.log(
        "NOMBRES INVÁLIDOS OCULTADOS:"
      );

      console.log(
        invalidStructures.join(
          "\n"
        )
      );
    }

    console.log(
      "======================================"
    );
  }, [model]);

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
     CAMBIO DE CAPA
  ==================================================== */

  useEffect(() => {
    /*
     * Limpiar selección.
     */
    if (
      selectedMeshRef.current
    ) {
      restoreHighlight(
        selectedMeshRef.current
      );
    }

    selectedMeshRef.current =
      null;

    onStructureSelect?.(null);

    /*
     * Aplicar visibilidad.
     */
    model.traverse((object) => {
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
    });
  }, [
    layer,
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

    /*
     * Ignorar objetos inválidos.
     */
    if (
      isInvalidStructureName(
        object.name
      )
    ) {
      return;
    }

    if (!object.visible) {
      return;
    }

    /*
     * Restaurar selección
     * anterior.
     */
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

    highlightMesh(object);

    console.log(
      "--------------------------------------"
    );

    console.log(
      "ESTRUCTURA SELECCIONADA"
    );

    console.log(
      "Nombre:",
      object.name
    );

    console.log(
      "Categoría:",
      getStructureCategory(
        object.name
      )
    );

    console.log(
      "--------------------------------------"
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

    /* =========================
       AISLAR
    ========================= */

    if (
      action.type === "isolate"
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

    /* =========================
       OCULTAR
    ========================= */

    if (
      action.type === "hide"
    ) {
      if (!selected) {
        return;
      }

      selected.visible = false;

      restoreHighlight(
        selected
      );

      selectedMeshRef.current =
        null;

      onStructureSelect?.(null);

      return;
    }

    /* =========================
       TRANSPARENCIA
    ========================= */

    if (
      action.type ===
      "transparency"
    ) {
      if (!selected) {
        return;
      }

      const material =
        getMaterial(selected);

      if (!material) {
        return;
      }

      const isTransparent =
        material.opacity < 1;

      if (isTransparent) {
        material.opacity = 1;

        material.transparent =
          false;

        material.depthWrite =
          true;
      } else {
        material.opacity = 0.2;

        material.transparent =
          true;

        material.depthWrite =
          false;
      }

      material.needsUpdate =
        true;

      return;
    }

    /* =========================
       RESTABLECER
    ========================= */

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

      selectedMeshRef.current =
        null;

      onStructureSelect?.(null);
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
        onClick={handleClick}
      />
    </Center>
  );
}

/* ======================================================
   CONTROL DE ZOOM
====================================================== */

function CameraZoomController({
  zoomLevel,
  onZoomChange,
}: {
  zoomLevel: number;

  onZoomChange?: (
    value: number
  ) => void;
}) {
  const {
    camera,
    controls,
  } = useThree();

  /*
   * Barra / botones -> cámara
   */
  useEffect(() => {
    const orbitControls =
      controls as any;

    if (
      !orbitControls ||
      !orbitControls.target
    ) {
      return;
    }

    const normalized =
      zoomLevel / 100;

    const distance =
      MAX_DISTANCE -
      normalized *
        (MAX_DISTANCE -
          MIN_DISTANCE);

    const direction =
      camera.position
        .clone()
        .sub(
          orbitControls.target
        )
        .normalize();

    camera.position.copy(
      orbitControls.target
        .clone()
        .add(
          direction.multiplyScalar(
            distance
          )
        )
    );

    camera.updateProjectionMatrix();

    orbitControls.update();
  }, [
    zoomLevel,
    camera,
    controls,
  ]);

  /*
   * Rueda / touchpad -> barra
   */
  useEffect(() => {
    const orbitControls =
      controls as any;

    if (
      !orbitControls ||
      !orbitControls.target
    ) {
      return;
    }

    const updateZoomLevel =
      () => {
        const distance =
          camera.position.distanceTo(
            orbitControls.target
          );

        const normalized =
          (MAX_DISTANCE -
            distance) /
          (MAX_DISTANCE -
            MIN_DISTANCE);

        const percentage =
          Math.round(
            Math.min(
              1,
              Math.max(
                0,
                normalized
              )
            ) * 100
          );

        onZoomChange?.(
          percentage
        );
      };

    orbitControls.addEventListener(
      "change",
      updateZoomLevel
    );

    return () => {
      orbitControls.removeEventListener(
        "change",
        updateZoomLevel
      );
    };
  }, [
    camera,
    controls,
    onZoomChange,
  ]);

  return null;
}

/* ======================================================
   CARGA
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
  modelPath,
  layer,
  onStructureSelect,
  action,
  zoomLevel = 55,
  onZoomChange,
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
        {/* Fondo */}

        <color
          attach="background"
          args={[
            "#f1f5f9",
          ]}
        />

        {/* Iluminación */}

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

        {/* Modelo */}

        <Suspense
          fallback={
            <LoadingModel />
          }
        >
          <CardiovascularModel
            modelPath={
              modelPath
            }
            layer={layer}
            onStructureSelect={
              onStructureSelect
            }
            action={
              action
            }
          />
        </Suspense>

        {/* Controles */}

        <OrbitControls
          makeDefault
          enableRotate
          enableZoom
          enablePan
          enableDamping
          dampingFactor={
            0.08
          }
          zoomSpeed={1}
          minDistance={
            MIN_DISTANCE
          }
          maxDistance={
            MAX_DISTANCE
          }
          target={[
            0,
            0,
            0,
          ]}
        />

        {/* Sincronización zoom */}

        <CameraZoomController
          zoomLevel={
            zoomLevel
          }
          onZoomChange={
            onZoomChange
          }
        />
      </Canvas>
    </div>
  );
}