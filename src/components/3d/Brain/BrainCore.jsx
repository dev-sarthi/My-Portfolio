import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { usePortfolioStore } from '../../../store/usePortfolioStore';

export function BrainCore() {
  const meshRef = useRef();
  const materialRef = useRef();
  
  const currentScene = usePortfolioStore((state) => state.currentScene);
  const hoveredNodeId = usePortfolioStore((state) => state.hoveredNodeId);
  const navigate = usePortfolioStore((state) => state.navigate);

  // Subtle organic rotation and pulsing
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (materialRef.current) {
      // Pulse emissive intensity slightly
      const baseIntensity = hoveredNodeId ? 1.5 : 0.8;
      materialRef.current.emissiveIntensity = baseIntensity + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Neural Core Placeholder */}
      <mesh 
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          navigate('CENTER');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Icosahedron acts as a stylized geometric brain placeholder */}
        <icosahedronGeometry args={[1.2, 4]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#111122"
          emissive="#2244aa"
          emissiveIntensity={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* Inner solid core to hide back wireframes slightly */}
      <mesh>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshBasicMaterial color="#050510" />
      </mesh>
    </group>
  );
}
