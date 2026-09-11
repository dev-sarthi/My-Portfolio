import { Stars } from '@react-three/drei';

export default function Environment() {
  return (
    <>
      {/* Ambient light for base visibility */}
      <ambientLight intensity={0.15} />

      {/* Key light — cool blue from above */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.4}
        color="#e0f0ff"
      />

      {/* Fill light — warm from below-left */}
      <pointLight
        position={[-5, -3, 2]}
        intensity={0.3}
        color="#8b5cf6"
        distance={15}
      />

      {/* Accent light — cyan from right */}
      <pointLight
        position={[5, 2, -3]}
        intensity={0.3}
        color="#06b6d4"
        distance={15}
      />

      {/* Background stars */}
      <Stars
        radius={80}
        depth={60}
        count={2500}
        factor={3}
        saturation={0.1}
        fade
        speed={0.5}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={['#050510', 8, 30]} />
    </>
  );
}
