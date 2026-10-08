import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const regionGeo = new THREE.IcosahedronGeometry(0.8, 0);
const innerRegionGeo = new THREE.IcosahedronGeometry(0.5, 0);
const innerMat = new THREE.MeshBasicMaterial({ color: '#000000' });

export function RegionNode({ id, label, position, color, isActive }) {
  const meshRef = useRef();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const navigate = usePortfolioStore((state) => state.navigate);
  const setHoveredNode = usePortfolioStore((state) => state.setHoveredNode);
  const currentScene = usePortfolioStore((state) => state.currentScene);
  const isHoveredGlobally = usePortfolioStore((state) => state.hoveredNodeId === id);

  const isInteractable = currentScene === 'CENTER';
  const isHovered = isHoveredGlobally && isInteractable;
  
  // Make unselected regions darker/transparent when we are inside a specific region
  const isBackground = currentScene !== 'CENTER' && currentScene !== id && !isActive;

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!prefersReducedMotion) {
        meshRef.current.rotation.y += delta * 0.2;
        meshRef.current.rotation.x += delta * 0.1;
      }
      
      const baseScale = isMobile ? 1.2 : 1.0;
      const targetScale = isHovered || isActive ? baseScale * 1.2 : baseScale;
      
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05);
      meshRef.current.scale.y = meshRef.current.scale.x;
      meshRef.current.scale.z = meshRef.current.scale.x;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        geometry={regionGeo}
        onClick={(e) => {
          e.stopPropagation();
          if (isInteractable) {
            navigate(id);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (isInteractable) {
            setHoveredNode(id);
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={(e) => {
          if (isInteractable) {
            setHoveredNode(null);
            document.body.style.cursor = 'auto';
          }
        }}
      >
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={isHovered || isActive ? 2.0 : (isBackground ? 0.1 : 0.5)}
          wireframe={true}
          transparent
          opacity={isBackground ? 0.1 : 0.8}
        />
        <mesh geometry={innerRegionGeo} material={innerMat} />
      </mesh>

      <Text
        position={[0, -1.5, 0]}
        fontSize={0.4}
        color={isActive || isHovered ? '#ffffff' : (isBackground ? '#222222' : '#aaaaaa')}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {label}
      </Text>
    </group>
  );
}
