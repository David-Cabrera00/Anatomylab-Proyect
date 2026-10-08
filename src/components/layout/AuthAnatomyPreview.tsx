import { useMemo } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PREVIEW_MODEL_PATH = "/models/respiratory/respiratory_overview.glb";

function PreviewModel() {
  const { scene } = useGLTF(PREVIEW_MODEL_PATH);
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    if (maxDimension > 0) {
      clone.scale.setScalar(5.2 / maxDimension);
    }

    const scaledBounds = new THREE.Box3().setFromObject(clone);
    const scaledCenter = scaledBounds.getCenter(new THREE.Vector3());
    clone.position.set(-scaledCenter.x + 0.16, -scaledCenter.y - 0.32, -scaledCenter.z);
    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return clone;
  }, [scene]);

  return <primitive object={model} />;
}

export function AuthAnatomyPreview() {
  return (
    <div className="h-[360px] w-full sm:h-[420px] xl:h-[500px]" aria-label="AnatomyLab 3D preview" role="img">
      <Canvas
        shadows
        camera={{ position: [0, 0.25, 7.8], fov: 38, near: 0.01, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.65} />
        <hemisphereLight args={["#ffffff", "#d7e1e5", 0.75]} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} castShadow />
        <directionalLight position={[-4, 3, 4]} intensity={0.7} />
        <directionalLight position={[0, 5, -4]} intensity={0.45} />
        <PreviewModel />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.35}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI * 0.35}
          maxPolarAngle={Math.PI * 0.65}
          rotateSpeed={0.35}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(PREVIEW_MODEL_PATH);
