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
      clone.scale.setScalar(4.4 / maxDimension);
    }

    clone.position.y = -0.35;
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
    <div className="h-[280px] w-full sm:h-[320px]" aria-label="AnatomyLab 3D preview" role="img">
      <Canvas
        shadows
        camera={{ position: [0, 0.35, 5.8], fov: 32, near: 0.01, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#f3f6f7"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 5]} intensity={1.25} castShadow />
        <directionalLight position={[-3, 2, 4]} intensity={0.55} />
        <directionalLight position={[0, 3, -4]} intensity={0.3} />
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
