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
} from "../utils/cardiovascular";

import {
  getRespiratoryStructureName,
  isSuspiciousRespiratoryName,
} from "../utils/respiratory";

import {
  getRespiratoryCategory,
  type SystemCategory,
} from "../utils/systemClassification";

import {
  classifyMuscularHierarchy,
} from "../utils/muscular";

import {
  classifyNervousHierarchy,
  type NervousHierarchyCategory,
} from "../utils/nervous";

import {
  classifySkeletalHierarchy,
  type SkeletalHierarchyCategory,
} from "../utils/skeletal";

import {
  classifyDigestiveHierarchy,
  type DigestiveHierarchyCategory,
} from "../utils/digestive";

/* ======================================================
   CATEGORÍAS INTERNAS DEL VISOR
====================================================== */

type ViewerCategory =
  | SystemCategory
  | NervousHierarchyCategory
  | SkeletalHierarchyCategory
  | DigestiveHierarchyCategory;

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
   SOLICITUD DE ENFOQUE
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
  focusRequest?: StructureFocusRequest | null;
};

/* ======================================================
   COLORES
====================================================== */

const COLORS = {
  heart: "#8f2438",
  artery: "#d94b59",
  vein: "#4f6fa8",

  lung: "#b97882",
  airway: "#7896a8",
  upperAirway: "#9c87aa",

  nervousCentral: "#d6a84b",
  nervousPeripheral: "#e4c978",
  nervousSense: "#8ba6b9",

  skeletalAxial: "#d8d1c4",
  skeletalAppendicular: "#b9c1ca",

  muscularHeadNeck: "#9f5656",
  muscularTrunk: "#a64b4b",
  muscularUpper: "#bd6666",
  muscularLower: "#874040",

  digestiveTract: "#b87949",
  digestiveAccessory: "#d2a15f",

  other: "#94a3b8",
  selected: "#f59e0b",
  selectedEmissive: "#92400e",
};

/* ======================================================
   NORMALIZAR TEXTO
====================================================== */

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* ======================================================
   CLASIFICACIÓN POR NOMBRE

   Solo se usa para Cardiovascular y Respiratorio.
   Los demás sistemas se clasifican desde el GLB real.
====================================================== */

function getNameBasedCategory(
  system: AnatomySystemId,
  structureName: string
): ViewerCategory {
  if (system === "cardiovascular") {
    const category = getCardiovascularCategory(
      structureName
    );

    if (category === "heart") {
      return "heart";
    }

    if (category === "artery") {
      return "artery";
    }

    if (category === "vein") {
      return "vein";
    }

    return "other";
  }

  if (system === "respiratory") {
    return getRespiratoryCategory(
      structureName
    );
  }

  return "other";
}

/* ======================================================
   CATEGORÍA GUARDADA
====================================================== */

function getStoredCategory(
  mesh: THREE.Mesh
): ViewerCategory {
  const category =
    mesh.userData.anatomyCategory;

  if (typeof category === "string") {
    return category as ViewerCategory;
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
   COLOR SEGÚN CATEGORÍA
====================================================== */

function getCategoryColor(
  system: AnatomySystemId,
  category: ViewerCategory
) {
  switch (category) {
    case "heart":
      return COLORS.heart;

    case "artery":
      return COLORS.artery;

    case "vein":
      return COLORS.vein;

    case "lung":
      return COLORS.lung;

    case "airway":
      return COLORS.airway;

    case "upper-airway":
      return COLORS.upperAirway;

    case "nervous-central":
      return COLORS.nervousCentral;

    case "nervous-peripheral":
      return COLORS.nervousPeripheral;

    case "nervous-sense":
      return COLORS.nervousSense;

    case "skeletal-axial":
      return COLORS.skeletalAxial;

    case "skeletal-appendicular":
      return COLORS.skeletalAppendicular;

    case "muscular-head-neck":
      return COLORS.muscularHeadNeck;

    case "muscular-trunk":
      return COLORS.muscularTrunk;

    case "muscular-upper-limb":
      return COLORS.muscularUpper;

    case "muscular-lower-limb":
      return COLORS.muscularLower;

    case "digestive-tract":
      return COLORS.digestiveTract;

    case "digestive-accessory":
      return COLORS.digestiveAccessory;

    default:
      return (
        anatomySystems[system]?.color ??
        COLORS.other
      );
  }
}

/* ======================================================
   MOSTRAR / OCULTAR MESH

   Layer 0 = visible
   Layer 1 = oculto

   No usamos mesh.visible = false para filtrar capas,
   porque algunos meshes de Z-Anatomy contienen otros
   meshes como hijos.
====================================================== */

function setMeshRendered(
  mesh: THREE.Mesh,
  rendered: boolean
) {
  mesh.visible = true;
  mesh.layers.set(rendered ? 0 : 1);
}

function isMeshRendered(
  mesh: THREE.Mesh
) {
  return mesh.layers.isEnabled(0);
}

/* ======================================================
   VISTA GENERAL CARDIOVASCULAR
====================================================== */

function isGeneralCardiovascularStructure(
  structureName: string
) {
  const name = normalizeName(
    structureName
  );

  const category =
    getCardiovascularCategory(
      structureName
    );

  if (category === "heart") {
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
   VISTA GENERAL RESPIRATORIA
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
   VISIBILIDAD SEGÚN CAPA
====================================================== */

function shouldMeshBeVisible(
  system: AnatomySystemId,
  mesh: THREE.Mesh,
  layer: AnatomyLayerId
) {
  if (
    mesh.userData.anatomyIgnore === true
  ) {
    return false;
  }

  /*
   * El filtro antiguo de nombres inválidos se mantiene
   * solo para los dos sistemas que siguen usando la
   * clasificación histórica por nombre.
   */
  if (
    (system === "cardiovascular" ||
      system === "respiratory") &&
    isInvalidStructureName(mesh.name)
  ) {
    return false;
  }

  const category =
    getStoredCategory(mesh);

  if (layer === "complete") {
    return true;
  }

  if (layer === "general") {
    if (system === "cardiovascular") {
      return isGeneralCardiovascularStructure(
        mesh.name
      );
    }

    if (system === "respiratory") {
      return isGeneralRespiratoryStructure(
        mesh.name
      );
    }

    return true;
  }

  if (layer === "heart") {
    return category === "heart";
  }

  if (layer === "arteries") {
    return category === "artery";
  }

  if (layer === "veins") {
    return category === "vein";
  }

  if (layer === "lungs") {
    return category === "lung";
  }

  if (layer === "airways") {
    return category === "airway";
  }

  if (layer === "upper-airway") {
    return category === "upper-airway";
  }

  if (layer === "nervous-central") {
    return category === "nervous-central";
  }

  if (layer === "nervous-peripheral") {
    return category === "nervous-peripheral";
  }

  if (layer === "nervous-sense") {
    return category === "nervous-sense";
  }

  if (layer === "skeletal-axial") {
    return category === "skeletal-axial";
  }

  if (layer === "skeletal-appendicular") {
    return (
      category ===
      "skeletal-appendicular"
    );
  }

  if (layer === "muscular-head-neck") {
    return (
      category ===
      "muscular-head-neck"
    );
  }

  if (layer === "muscular-trunk") {
    return category === "muscular-trunk";
  }

  if (layer === "muscular-upper-limb") {
    return (
      category ===
      "muscular-upper-limb"
    );
  }

  if (layer === "muscular-lower-limb") {
    return (
      category ===
      "muscular-lower-limb"
    );
  }

  if (layer === "digestive-tract") {
    return category === "digestive-tract";
  }

  if (layer === "digestive-accessory") {
    return (
      category ===
      "digestive-accessory"
    );
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
  const { scene } = useGLTF(modelPath);

  const selectedMeshRef =
    useRef<THREE.Mesh | null>(null);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    /* ================================================
       NORMALIZAR ESCALA
    ================================================ */

    const initialBounds =
      new THREE.Box3().setFromObject(
        clone
      );

    const initialSize =
      initialBounds.getSize(
        new THREE.Vector3()
      );

    const maxDimension = Math.max(
      initialSize.x,
      initialSize.y,
      initialSize.z
    );

    if (maxDimension > 0) {
      let desiredSize =
        anatomySystems[system].viewerSize;

      if (
        modelPath.includes(
          "cardiovascular_bodyparts"
        )
      ) {
        desiredSize = 6;
      }

      clone.scale.setScalar(
        desiredSize / maxDimension
      );
    }

    clone.updateMatrixWorld(true);

    /* ================================================
       ESTADO BASE DE TODOS LOS MESHES
    ================================================ */

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.visible = true;
      object.layers.set(0);
      object.castShadow = true;
      object.receiveShadow = true;
      object.userData.anatomyIgnore = false;

      object.userData.anatomyCategory =
        getNameBasedCategory(
          system,
          object.name
        );
    });

    /* ================================================
       CLASIFICACIÓN REAL DE CADA GLB
    ================================================ */

    if (system === "muscular") {
      clone.userData.muscularHierarchyResult =
        classifyMuscularHierarchy(clone);
    }

    if (system === "nervous") {
      clone.userData.nervousHierarchyResult =
        classifyNervousHierarchy(clone);
    }

    if (system === "skeletal") {
      clone.userData.skeletalHierarchyResult =
        classifySkeletalHierarchy(clone);
    }

    if (system === "digestive") {
      clone.userData.digestiveHierarchyResult =
        classifyDigestiveHierarchy(clone);
    }

    /* ================================================
       MATERIALES
    ================================================ */

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      const category =
        getStoredCategory(object);

      object.material =
        new THREE.MeshStandardMaterial({
          color: getCategoryColor(
            system,
            category
          ),
          roughness: 0.58,
          metalness: 0,
          transparent: false,
          opacity: 1,
          side: THREE.DoubleSide,
        });
    });

    return clone;
  }, [scene, system, modelPath]);

  /* ====================================================
     RESTAURAR RESALTADO
  ==================================================== */

  const restoreHighlight = (
    mesh: THREE.Mesh | null
  ) => {
    if (!mesh) {
      return;
    }

    const material =
      getMeshMaterial(mesh);

    if (!material) {
      return;
    }

    const category =
      getStoredCategory(mesh);

    material.color.set(
      getCategoryColor(
        system,
        category
      )
    );

    material.emissive.set("#000000");
    material.emissiveIntensity = 0;
  };

  /* ====================================================
     RESALTAR
  ==================================================== */

  const highlightMesh = (
    mesh: THREE.Mesh
  ) => {
    const material =
      getMeshMaterial(mesh);

    if (!material) {
      return;
    }

    material.color.set(COLORS.selected);
    material.emissive.set(
      COLORS.selectedEmissive
    );
    material.emissiveIntensity = 0.35;
  };

  /* ====================================================
     DIAGNÓSTICO
  ==================================================== */

  useEffect(() => {
    const counts: Record<string, number> = {
      total: 0,
    };

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      counts.total++;

      if (
        object.userData.anatomyIgnore === true
      ) {
        counts.ignored =
          (counts.ignored ?? 0) + 1;
        return;
      }

      const category =
        getStoredCategory(object);

      counts[category] =
        (counts[category] ?? 0) + 1;
    });

    console.log(
      "======================================"
    );
    console.log(
      `SISTEMA: ${system.toUpperCase()}`
    );
    console.table(counts);

    if (system === "muscular") {
      console.log(
        "CLASIFICACIÓN MUSCULAR BASADA EN EL GLB:"
      );
      console.log(
        model.userData
          .muscularHierarchyResult
      );
      console.log(
        "Esperado: cabeza/cuello 175, tronco 153, superiores 222, inferiores 272, ignorado 1, total 823."
      );
    }

    if (system === "nervous") {
      console.log(
        "CLASIFICACIÓN NERVIOSA BASADA EN EL GLB:"
      );
      console.log(
        model.userData
          .nervousHierarchyResult
      );
      console.log(
        "Esperado: central 414, periférico 255, sentidos 40, total 709."
      );
    }

    if (system === "skeletal") {
      console.log(
        "CLASIFICACIÓN ESQUELÉTICA BASADA EN EL GLB:"
      );
      console.log(
        model.userData
          .skeletalHierarchyResult
      );
      console.log(
        "Esperado: axial 315, apendicular 260, total 575."
      );
    }

    if (system === "digestive") {
      console.log(
        "CLASIFICACIÓN DIGESTIVA BASADA EN EL GLB:"
      );
      console.log(
        model.userData
          .digestiveHierarchyResult
      );
      console.log(
        "Esperado: tubo digestivo 19, órganos accesorios 28, total 47."
      );
    }

    if (system === "respiratory") {
      const suspicious: {
        original: string;
        visible: string;
      }[] = [];

      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) {
          return;
        }

        if (
          isSuspiciousRespiratoryName(
            object.name
          )
        ) {
          suspicious.push({
            original: object.name,
            visible:
              getRespiratoryStructureName(
                object.name
              ),
          });
        }
      });

      console.log(
        "TOTAL RESPIRATORIO A REVISAR:",
        suspicious.length
      );
    }

    if (system === "cardiovascular") {
      const words = new Set<string>();

      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) {
          return;
        }

        const unknown =
          getUnknownAnatomyWords(
            object.name
          );

        unknown.forEach((word) =>
          words.add(word)
        );
      });

      console.log(
        "PALABRAS CARDIOVASCULARES SIN TRADUCIR:"
      );
      console.log(
        Array.from(words)
          .sort()
          .join("\n")
      );
    }

    console.log(
      "======================================"
    );
  }, [model, system]);

  /* ====================================================
     CAMBIO DE CAPA
  ==================================================== */

  useEffect(() => {
    if (selectedMeshRef.current) {
      restoreHighlight(
        selectedMeshRef.current
      );
    }

    selectedMeshRef.current = null;
    onStructureSelect?.(null);

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
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
        getMeshMaterial(object);

      if (!material) {
        return;
      }

      const category =
        getStoredCategory(object);

      material.color.set(
        getCategoryColor(
          system,
          category
        )
      );
      material.emissive.set("#000000");
      material.emissiveIntensity = 0;
      material.opacity = 1;
      material.transparent = false;
      material.depthWrite = true;
      material.needsUpdate = true;
    });
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
    if (!focusRequest) {
      return;
    }

    let target: THREE.Mesh | null = null;

    model.traverse((object) => {
      if (target) {
        return;
      }

      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      if (
        object.name ===
        focusRequest.structureName
      ) {
        target = object;
      }
    });

    if (!target) {
      console.warn(
        "No se encontró la estructura:",
        focusRequest.structureName
      );
      return;
    }

    if (
      selectedMeshRef.current &&
      selectedMeshRef.current !== target
    ) {
      restoreHighlight(
        selectedMeshRef.current
      );
    }

    setMeshRendered(target, true);
    selectedMeshRef.current = target;
    highlightMesh(target);
    onStructureSelect?.(target.name);
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

    const object = event.object;

    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    if (
      object.userData.anatomyIgnore === true
    ) {
      return;
    }

    if (!isMeshRendered(object)) {
      return;
    }

    if (
      (system === "cardiovascular" ||
        system === "respiratory") &&
      isInvalidStructureName(object.name)
    ) {
      return;
    }

    if (
      selectedMeshRef.current &&
      selectedMeshRef.current !== object
    ) {
      restoreHighlight(
        selectedMeshRef.current
      );
    }

    selectedMeshRef.current = object;
    highlightMesh(object);
    onStructureSelect?.(object.name);
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

    if (action.type === "isolate") {
      if (!selected) {
        return;
      }

      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) {
          return;
        }

        if (
          object.userData.anatomyIgnore === true
        ) {
          setMeshRendered(object, false);
          return;
        }

        setMeshRendered(
          object,
          object === selected
        );
      });

      return;
    }

    if (action.type === "hide") {
      if (!selected) {
        return;
      }

      setMeshRendered(selected, false);
      restoreHighlight(selected);
      selectedMeshRef.current = null;
      onStructureSelect?.(null);
      return;
    }

    if (action.type === "transparency") {
      if (!selected) {
        return;
      }

      const material =
        getMeshMaterial(selected);

      if (!material) {
        return;
      }

      const transparent =
        material.opacity < 1;

      if (transparent) {
        material.opacity = 1;
        material.transparent = false;
        material.depthWrite = true;
      } else {
        material.opacity = 0.2;
        material.transparent = true;
        material.depthWrite = false;
      }

      material.needsUpdate = true;
      return;
    }

    if (action.type === "reset") {
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) {
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
          getMeshMaterial(object);

        if (!material) {
          return;
        }

        const category =
          getStoredCategory(object);

        material.color.set(
          getCategoryColor(
            system,
            category
          )
        );
        material.emissive.set("#000000");
        material.emissiveIntensity = 0;
        material.opacity = 1;
        material.transparent = false;
        material.depthWrite = true;
        material.needsUpdate = true;
      });

      selectedMeshRef.current = null;
      onStructureSelect?.(null);
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
        onClick={handleClick}
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
        args={[0.15, 32, 32]}
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
          position: [0, 0.5, 8],
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
        <color
          attach="background"
          args={["#f1f5f9"]}
        />

        <ambientLight intensity={0.65} />

        <directionalLight
          position={[5, 6, 5]}
          intensity={1.4}
        />

        <directionalLight
          position={[-5, 3, 4]}
          intensity={0.7}
        />

        <directionalLight
          position={[0, 4, -5]}
          intensity={0.45}
        />

        <Suspense
          fallback={<LoadingModel />}
        >
          <AnatomyModel
            system={system}
            modelPath={modelPath}
            layer={layer}
            onStructureSelect={
              onStructureSelect
            }
            action={action}
            focusRequest={focusRequest}
          />
        </Suspense>

        <OrbitControls
          enableRotate
          enableZoom
          enablePan
          enableDamping
          dampingFactor={0.08}
          zoomSpeed={0.8}
          rotateSpeed={0.7}
          panSpeed={0.7}
          minDistance={0.35}
          maxDistance={18}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
