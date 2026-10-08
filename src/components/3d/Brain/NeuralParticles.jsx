import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function NeuralParticles({ count = 200, radius = 2.5 }) {
  const pointsRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  // Generate random points in a sphere
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const r = radius + (Math.random() - 0.5) * 1.5; // Slight variation in radius

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (pointsRef.current && !prefersReducedMotion) {
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#88ccff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
