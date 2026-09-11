import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { regions } from '../data';
import { useNavigation } from '../hooks/useNavigation';

function BrainNode({ region, index }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { navigateTo, activeRegion, isTransitioning } = useNavigation();

  const isActive = activeRegion === region.id;
  const isAnyActive = activeRegion !== null;

  const baseColor = useMemo(() => new THREE.Color(region.color), [region.color]);
  const emissiveColor = useMemo(() => new THREE.Color(region.emissive), [region.emissive]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle pulse
    const pulse = 1 + Math.sin(t * 2 + index * 2.1) * 0.05;
    meshRef.current.scale.setScalar(hovered ? 1.15 : pulse);

    // Glow intensity
    if (glowRef.current) {
      const glowScale = hovered ? 2.8 : 2.2 + Math.sin(t * 1.5 + index) * 0.3;
      glowRef.current.scale.setScalar(glowScale);
      glowRef.current.material.opacity = hovered ? 0.18 : 0.08 + Math.sin(t * 1.5 + index) * 0.03;
    }

    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3 + index * 1.5;
      ringRef.current.rotation.x = Math.sin(t * 0.2 + index) * 0.3;
    }

    // Emissive intensity
    meshRef.current.material.emissiveIntensity = hovered ? 1.2 : 0.6 + Math.sin(t * 2 + index) * 0.2;
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isTransitioning) {
      navigateTo(region.id);
    }
  };

  // Fade out nodes that aren't active when one is selected
  const opacity = isAnyActive && !isActive ? 0.15 : 1;

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={region.position}>
        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={baseColor}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>

        {/* Orbit ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.4, 0.008, 16, 100]} />
          <meshBasicMaterial
            color={baseColor}
            transparent
            opacity={opacity * (hovered ? 0.6 : 0.25)}
          />
        </mesh>

        {/* Core sphere */}
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
        >
          <icosahedronGeometry args={[0.6, 4]} />
          <meshStandardMaterial
            color={baseColor}
            emissive={emissiveColor}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={opacity}
            wireframe={false}
          />
        </mesh>

        {/* Small orbiting particles */}
        {[...Array(5)].map((_, i) => (
          <OrbitingParticle
            key={i}
            index={i}
            color={baseColor}
            radius={1.0 + i * 0.12}
            speed={0.8 + i * 0.3}
            opacity={opacity}
          />
        ))}

        {/* Label */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.22}

          color={region.color}
          anchorX="center"
          anchorY="top"
          letterSpacing={0.15}
          fillOpacity={opacity * (hovered ? 1 : 0.7)}
        >
          {region.label}
        </Text>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.11}
          color="#8b8fa8"
          anchorX="center"
          anchorY="top"
          fillOpacity={opacity * (hovered ? 0.9 : 0.5)}
        >
          {region.subtitle}
        </Text>
      </group>
    </Float>
  );
}

function OrbitingParticle({ index, color, radius, speed, opacity }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + index * 1.3;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t * 0.7) * radius * 0.3;
    ref.current.position.z = Math.sin(t) * radius * 0.5;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={opacity * 0.7} />
    </mesh>
  );
}

export default function BrainNodes() {
  return (
    <group>
      {regions.map((region, i) => (
        <BrainNode key={region.id} region={region} index={i} />
      ))}
    </group>
  );
}
