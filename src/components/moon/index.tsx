import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Model } from "./model";
import styles from "./moon.module.css";

function Moon() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.moon} ${loaded ? styles.loaded : ""}`}>
      <Suspense fallback={null}>
        <Canvas camera={{ fov: 10 }}>
          <spotLight
            angle={0.15}
            decay={0}
            intensity={4}
            penumbra={2}
            position={[40, 20, 20]}
          />

          <Model onLoad={() => setLoaded(true)} />
        </Canvas>
      </Suspense>
    </div>
  );
}

export { Moon };
