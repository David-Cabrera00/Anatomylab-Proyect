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

/*
 * IMPORTANTE:
 * Este es el nombre del archivo que actualmente
 * tienes funcionando dentro de public/models/cardiovascular/
 */
const MODEL_PATH =
  "/models/cardiovascular/cardiovascular_bodyparts.glb";

/*
 * Colores principales del modelo.
 */
const BASE_COLOR = "#8f2438";
const SELECTED_COLOR = "#ef5b67";
const SELECTED_EMISSIVE = "#7f1d1d";

/*
 * Acciones que puede ejecutar el toolbar.
 */
export type ViewerActionType =
  | "isolate"
  | "hide"
  | "transparency"
  | "reset";

/*
 * El id permite ejecutar varias veces
 * consecutivas la misma acción.
 */
export type ViewerAction = {
  type: ViewerActionType;
  id: number;
};

type AnatomyViewerProps = {
  /*
   * Se ejecuta cuando el usuario
   * selecciona una estructura.
   */
  onStructureSelect?: (
    structureName: string | null
  ) => void;

  /*
   * Acción enviada desde App.tsx.
   */
  action?: ViewerAction | null;
};

function CardiovascularModel({
  onStructureSelect,
  action,
}: AnatomyViewerProps) {
  const { scene } = useGLTF(MODEL_PATH);

  /*
   * Guarda la estructura actualmente
   * seleccionada.
   */
  const selectedMeshRef =
    useRef<THREE.Mesh | null>(null);

  /*
   * Creamos nuestra propia copia
   * del modelo.
   */
  const model = useMemo(() => {
    const clone = scene.clone(true);

    /*
     * Calculamos el tamaño completo
     * del corazón.
     */
    const box =
      new THREE.Box3().setFromObject(clone);

    const size =
      box.getSize(new THREE.Vector3());

    const maxDimension = Math.max(
      size.x,
      size.y,
      size.z
    );

    /*
     * Normalizamos automáticamente
     * el tamaño.
     */
    if (maxDimension > 0) {
      const desiredSize = 4;

      const scale =
        desiredSize / maxDimension;

      clone.scale.setScalar(scale);
    }

    /*
     * Configuramos cada estructura
     * independientemente.
     */
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;

      /*
       * Mejora visual de las superficies.
       */
      object.geometry.computeVertexNormals();

      /*
       * Cada mesh obtiene su propio material.
       * Así podemos cambiar una estructura
       * sin modificar las demás.
       */
      object.material =
        new THREE.MeshStandardMaterial({
          color: BASE_COLOR,
          roughness: 0.58,
          metalness: 0,
          transparent: false,
          opacity: 1,
        });
    });

    return clone;
  }, [scene]);

  /*
   * Mostrar todos los meshes
   * encontrados en la consola.
   */
  useEffect(() => {
    console.log(
      "======================================"
    );

    console.log(
      "ESTRUCTURAS DEL MODELO CARDIOVASCULAR"
    );

    console.log(
      "======================================"
    );

    let meshCount = 0;

    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        meshCount++;

        console.log(
          `${meshCount}. ${object.name}`
        );
      }
    });

    console.log(
      `Total de meshes encontrados: ${meshCount}`
    );

    console.log(
      "======================================"
    );
  }, [model]);

  /*
   * Devuelve el material del mesh
   * de una manera segura.
   */
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
   * Quita el resaltado de una estructura.
   */
  const restoreHighlight = (
    mesh: THREE.Mesh | null
  ) => {
    if (!mesh) return;

    const material =
      getMaterial(mesh);

    if (!material) return;

    material.color.set(BASE_COLOR);

    material.emissive.set(
      "#000000"
    );

    material.emissiveIntensity = 0;
  };

  /*
   * Resalta la estructura seleccionada.
   */
  const highlightMesh = (
    mesh: THREE.Mesh
  ) => {
    const material =
      getMaterial(mesh);

    if (!material) return;

    material.color.set(
      SELECTED_COLOR
    );

    material.emissive.set(
      SELECTED_EMISSIVE
    );

    material.emissiveIntensity = 0.4;
  };

  /*
   * Se ejecuta cuando hacemos
   * clic sobre una estructura.
   */
  const handleClick = (
    event: ThreeEvent<MouseEvent>
  ) => {
    event.stopPropagation();

    const object = event.object;

    if (!(object instanceof THREE.Mesh)) {
      return;
    }

    /*
     * Si anteriormente había otra
     * estructura seleccionada,
     * quitamos su resaltado.
     */
    if (
      selectedMeshRef.current &&
      selectedMeshRef.current !== object
    ) {
      restoreHighlight(
        selectedMeshRef.current
      );
    }

    /*
     * Guardamos la nueva selección.
     */
    selectedMeshRef.current = object;

    /*
     * Resaltamos la nueva estructura.
     */
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
      "Tipo:",
      object.type
    );

    console.log(
      "--------------------------------------"
    );

    /*
     * Enviamos el nombre a App.tsx.
     */
    onStructureSelect?.(
      object.name
    );
  };

  /*
   * Escucha las acciones enviadas
   * desde el toolbar.
   */
  useEffect(() => {
    if (!action) return;

    const selected =
      selectedMeshRef.current;

    /*
     * AISLAR
     *
     * Solo queda visible la
     * estructura seleccionada.
     */
    if (action.type === "isolate") {
      if (!selected) return;

      model.traverse((object) => {
        if (
          object instanceof THREE.Mesh
        ) {
          object.visible =
            object === selected;
        }
      });

      return;
    }

    /*
     * OCULTAR
     *
     * Oculta únicamente la
     * estructura seleccionada.
     */
    if (action.type === "hide") {
      if (!selected) return;

      selected.visible = false;

      restoreHighlight(selected);

      selectedMeshRef.current = null;

      onStructureSelect?.(null);

      return;
    }

    /*
     * TRANSPARENCIA
     *
     * Alterna entre:
     * opacity 1
     * opacity 0.25
     */
    if (
      action.type === "transparency"
    ) {
      if (!selected) return;

      const material =
        getMaterial(selected);

      if (!material) return;

      const isTransparent =
        material.opacity < 1;

      if (isTransparent) {
        material.opacity = 1;

        material.transparent = false;

        material.depthWrite = true;
      } else {
        material.opacity = 0.25;

        material.transparent = true;

        material.depthWrite = false;
      }

      material.needsUpdate = true;

      return;
    }

    /*
     * RESTABLECER
     *
     * Devuelve absolutamente todo
     * al estado original.
     */
    if (action.type === "reset") {
      model.traverse((object) => {
        if (
          !(object instanceof THREE.Mesh)
        ) {
          return;
        }

        /*
         * Volvemos a mostrar
         * cualquier pieza oculta.
         */
        object.visible = true;

        const material =
          getMaterial(object);

        if (!material) return;

        /*
         * Color original.
         */
        material.color.set(
          BASE_COLOR
        );

        /*
         * Sin resaltado.
         */
        material.emissive.set(
          "#000000"
        );

        material.emissiveIntensity = 0;

        /*
         * Sin transparencia.
         */
        material.opacity = 1;

        material.transparent = false;

        material.depthWrite = true;

        material.needsUpdate = true;
      });

      /*
       * Limpiamos la selección.
       */
      selectedMeshRef.current = null;

      onStructureSelect?.(null);
    }
  }, [
    action,
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

/*
 * Pequeño objeto temporal mientras
 * carga el GLB.
 */
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
  onStructureSelect,
  action,
}: AnatomyViewerProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        camera={{
          position: [0, 0.5, 7],
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
        {/* Fondo */}
        <color
          attach="background"
          args={["#f1f5f9"]}
        />

        {/* Iluminación general */}
        <ambientLight
          intensity={0.55}
        />

        {/* Luz principal */}
        <directionalLight
          position={[5, 6, 5]}
          intensity={1.6}
          castShadow
        />

        {/* Luz lateral */}
        <directionalLight
          position={[-5, 3, 4]}
          intensity={0.75}
        />

        {/* Luz posterior */}
        <directionalLight
          position={[0, 4, -5]}
          intensity={0.5}
        />

        <Suspense
          fallback={<LoadingModel />}
        >
          <CardiovascularModel
            onStructureSelect={
              onStructureSelect
            }
            action={action}
          />
        </Suspense>

        {/* Cámara interactiva */}
        <OrbitControls
          makeDefault
          enableRotate
          enableZoom
          enablePan
          enableDamping
          dampingFactor={0.08}
          minDistance={2}
          maxDistance={15}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}

/*
 * Precarga del modelo.
 */
useGLTF.preload(MODEL_PATH);