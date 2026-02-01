import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { MathUtils, type Mesh, type MeshStandardMaterial } from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";

type GLTFResult = GLTF & {
  nodes: {
    moon: Mesh;
  };
  materials: {
    moon: MeshStandardMaterial;
  };
};

interface ModelProps {
  onLoad: () => void;
}

const moonPath = `${import.meta.env.BASE_URL}moon.glb`;

function Model({ onLoad }: ModelProps) {
  const { nodes, materials } = useGLTF(moonPath) as unknown as GLTFResult;
  const meshRef = useRef<Mesh>(null);
  const mouseX = useMotionValue(0);

  useFrame(() => {
    if (meshRef.current) {
      const current = meshRef.current.rotation.y;
      const target = window.innerWidth < 640 ? current + 0.01 : mouseX.get();
      meshRef.current.rotation.y = MathUtils.lerp(current, target, 0.1);
    }
  });

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (window.innerWidth < 640) return;

      mouseX.set(
        (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2) / 4,
      );
    }

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX]);

  return (
    <group dispose={null} position={[0, -0.6, 0]}>
      <mesh
        ref={meshRef}
        scale={1}
        geometry={nodes.moon.geometry}
        material={materials.moon}
      />
    </group>
  );
}

useGLTF.preload(moonPath);

export { Model };
