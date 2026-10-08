import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const points = Array.from({ length: 22 }, (_, i) => {
  const y = 1 - (i / 21) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = i * 2.399963;
  return [
    Math.cos(angle) * radius * 2.08,
    y * 2.08,
    Math.sin(angle) * radius * 2.08,
  ];
});

function Core({ animate, mobile }) {
  const group = useRef(null);
  const time = useRef(0);
  useFrame(({ pointer }, delta) => {
    if (!animate || !group.current) return;
    time.current += Math.min(delta, 0.05);
    const amount = 1 - Math.exp(-delta * 2);
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    group.current.rotation.y +=
      (pointer.x * 0.2 + time.current * 0.055 - group.current.rotation.y) *
      amount;
    group.current.rotation.x +=
      (0.18 + pointer.y * 0.12 + scroll * 0.16 - group.current.rotation.x) *
      amount;
    group.current.position.y = Math.sin(time.current * 0.45) * 0.05;
  });
  return (
    <group ref={group} rotation={[0.18, 0.3, -0.23]}>
      <mesh>
        <icosahedronGeometry args={[1.16, 1]} />
        <meshStandardMaterial
          color="#122a65"
          metalness={0.8}
          roughness={0.28}
          flatShading
        />
      </mesh>
      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.16, 1]} />
        <meshBasicMaterial
          color="#4f8cff"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0.4]}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial
          color="#647cff"
          wireframe
          transparent
          opacity={0.13}
        />
      </mesh>
      {[0, 1, 2, 3, 4].slice(0, mobile ? 3 : 5).map((i) => (
        <group key={i} rotation={[0.6 + i * 0.62, i * 0.71, i * 0.36]}>
          <mesh>
            <torusGeometry
              args={[
                1.8 + i * 0.055,
                i === 0 ? 0.021 : 0.009,
                6,
                mobile ? 80 : 128,
              ]}
            />
            <meshStandardMaterial
              color={i % 2 ? "#ae85ff" : "#658eff"}
              emissive={i % 2 ? "#552fba" : "#2258ae"}
              emissiveIntensity={0.75}
              metalness={0.5}
              roughness={0.4}
            />
          </mesh>
        </group>
      ))}
      {points.slice(0, mobile ? 12 : 22).map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[i % 4 === 0 ? 0.052 : 0.023, 8, 6]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#b5a1ff" : "#8ecbff"} />
        </mesh>
      ))}
    </group>
  );
}

function Lifecycle({ onReady, onLost }) {
  const called = useRef(false);
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onLost, { once: true });
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl, onLost]);
  useFrame(() => {
    if (called.current) return;
    called.current = true;
    onReady();
  });
  return null;
}

export default function HeroScene({ animate, onReady, onLost }) {
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const mobile = window.matchMedia("(max-width: 700px)").matches;
  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 43 }}
        dpr={[1, mobile ? 1 : 1.5]}
        frameloop={animate && tabVisible ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        fallback={null}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 5]} color="#c7dcff" intensity={3} />
        <pointLight position={[-3, -1, 2]} color="#8c5bff" intensity={15} />
        <Core animate={animate && tabVisible} mobile={mobile} />
        <Lifecycle onReady={onReady} onLost={onLost} />
      </Canvas>
    </div>
  );
}
