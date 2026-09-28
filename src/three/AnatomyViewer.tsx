import { Suspense, useEffect, useMemo, useRef } from "react";
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

type StructureCategory =
  | "heart"
  | "artery"
  | "vein"
  | "other";

type AnatomyViewerProps = {
  modelPath: string;

  layer: AnatomyLayer;

  onStructureSelect?: (
    structureName: string | null
  ) => void;

  action?: ViewerAction | null;
};

/*
 * Colores anatómicos.
 */
const COLORS = {
  heart: "#8f2438",
  artery: "#d94b59",
  vein: "#4f6fa8",
  other: "#9ca3af",

  selected: "#f59e0b",
  selectedEmissive: "#92400e",
};

/*
 * Clasifica automáticamente
 * una estructura a partir del nombre
 * interno del mesh.
 */
function getStructureCategory(
  meshName: string
): StructureCategory {
  const name =
    meshName.toLowerCase();

  /*
   * Primero corazón.
   *
   * Esto evita que nombres como
   * coronary_leaflet terminen
   * siendo confundidos con arterias.
   */
  if (
    name.includes("heart") ||
    name.includes("atrium") ||
    name.includes("ventricle") ||
    name.includes("valve") ||
    name.includes("leaflet") ||
    name.includes("papillary") ||
    name.includes("interatrial") ||
    name.includes("interventricular")
  ) {
    return "heart";
  }

  /*
   * Arterias.
   */
  if (
    name.includes("artery") ||
    name.includes("arterial") ||
    name.includes("aorta") ||
    name.includes("aortic") ||
    name.includes("pulmonary_trunk")
  ) {
    return "artery";
  }

  /*
   * Venas.
   */
  if (
    name.includes("vein") ||
    name.includes("venous") ||
    name.includes("vena") ||
    name.includes("cava") ||
    name.includes("sinus")
  ) {
    return "vein";
  }

  return "other";
}

/*
 * Color inicial según
 * categoría anatómica.
 */
function getStructureColor(
  meshName: string
) {
  const category =
    getStructureCategory(meshName);

  return COLORS[category];
}

/*
 * Decide cuáles estructuras
 * deben aparecer en la vista GENERAL.
 */
function isGeneralStructure(
  meshName: string
) {
  const name =
    meshName.toLowerCase();

  const category =
    getStructureCategory(meshName);

  /*
   * Todo el corazón.
   */
  if (category === "heart") {
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
    "pulmonary_vein",
    "carotid",
    "subclavian",
    "iliac",
    "femoral",
  ];

  return importantStructures.some(
    (keyword) =>
      name.includes(keyword)
  );
}

/*
 * Determina si un mesh debe estar
 * visible según la capa seleccionada.
 */
function shouldBeVisible(
  meshName: string,
  layer: AnatomyLayer
) {
  const category =
    getStructureCategory(meshName);

  if (layer === "complete") {
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

  if (layer === "general") {
    return isGeneralStructure(
      meshName
    );
  }

  return true;
}

function CardiovascularModel({
  modelPath,
  layer,
  onStructureSelect,
  action,
}: AnatomyViewerProps) {
  const { scene } =
    useGLTF(modelPath);

  const selectedMeshRef =
    useRef<THREE.Mesh | null>(
      null
    );

  /*
   * Copiamos el modelo y
   * configuramos cada mesh.
   */
  const model = useMemo(() => {
    const clone =
      scene.clone(true);

    /*
     * Normalización automática
     * del tamaño del modelo.
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

    if (maxDimension > 0) {
      const desiredSize = 6;

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

        object.castShadow = true;
        object.receiveShadow = true;

        object.geometry.computeVertexNormals();

        /*
         * Material independiente
         * para cada estructura.
         */
        object.material =
          new THREE.MeshStandardMaterial(
            {
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
            }
          );
      }
    );

    return clone;
  }, [scene]);

  /*
   * ==========================
   * INFORMACIÓN DE CLASIFICACIÓN
   * ==========================
   *
   * Esto aparecerá en consola.
   */
  useEffect(() => {
    const counts = {
      heart: 0,
      arteries: 0,
      veins: 0,
      other: 0,
      total: 0,
    };

    const otherStructures:
      string[] = [];

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
      }
    );

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
      otherStructures
    );

    console.log(
      "======================================"
    );
  }, [model]);

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

  /*
   * Devuelve el mesh
   * a su color anatómico.
   */
  const restoreHighlight = (
    mesh: THREE.Mesh | null
  ) => {
    if (!mesh) return;

    const material =
      getMaterial(mesh);

    if (!material) return;

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

  /*
   * Resalta la estructura
   * seleccionada.
   */
  const highlightMesh = (
    mesh: THREE.Mesh
  ) => {
    const material =
      getMaterial(mesh);

    if (!material) return;

    material.color.set(
      COLORS.selected
    );

    material.emissive.set(
      COLORS.selectedEmissive
    );

    material.emissiveIntensity =
      0.35;
  };

  /*
   * ==========================
   * CAMBIO DE CAPA
   * ==========================
   */
  useEffect(() => {
    /*
     * Limpiamos selección.
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
     * Aplicamos la visibilidad
     * según la capa.
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

        object.visible =
          shouldBeVisible(
            object.name,
            layer
          );

        /*
         * Cada vez que cambiamos
         * de capa dejamos limpio
         * el material.
         */
        const material =
          getMaterial(object);

        if (!material) return;

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

  /*
   * ==========================
   * SELECCIÓN POR CLIC
   * ==========================
   */
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
     * Si está invisible,
     * no hacemos nada.
     */
    if (!object.visible) {
      return;
    }

    /*
     * Restauramos la selección
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

  /*
   * ==========================
   * TOOLBAR
   * ==========================
   */
  useEffect(() => {
    if (!action) return;

    const selected =
      selectedMeshRef.current;

    /*
     * AISLAR
     */
    if (
      action.type === "isolate"
    ) {
      if (!selected) return;

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

    /*
     * OCULTAR
     */
    if (
      action.type === "hide"
    ) {
      if (!selected) return;

      selected.visible = false;

      restoreHighlight(
        selected
      );

      selectedMeshRef.current =
        null;

      onStructureSelect?.(null);

      return;
    }

    /*
     * TRANSPARENCIA
     */
    if (
      action.type ===
      "transparency"
    ) {
      if (!selected) return;

      const material =
        getMaterial(selected);

      if (!material) return;

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

    /*
     * RESTABLECER
     *
     * Importante:
     * ahora no muestra TODO.
     * Vuelve a la capa activa.
     */
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

          if (!material) return;

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

export default function AnatomyViewer({
  modelPath,
  layer,
  onStructureSelect,
  action,
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

          near: 0.1,

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

        <ambientLight
          intensity={0.65}
        />

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
          fallback={
            <LoadingModel />
          }
        >
          <CardiovascularModel
            modelPath={modelPath}
            layer={layer}
            onStructureSelect={
              onStructureSelect
            }
            action={action}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enableRotate
          enableZoom
          enablePan
          enableDamping
          dampingFactor={0.08}
          minDistance={2}
          maxDistance={18}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}