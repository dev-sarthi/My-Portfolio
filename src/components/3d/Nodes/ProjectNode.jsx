import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

// Caching geometries and materials globally to prevent recreating them on every render
const boxGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const innerBoxGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const innerMat = new THREE.MeshBasicMaterial({ color: '#000000' });

export function ProjectNode({ project, position }) {
  const meshRef = useRef();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const navigate = usePortfolioStore((state) => state.navigate);
  const setHoveredNode = usePortfolioStore((state) => state.setHoveredNode);
  
  // OPTIMIZATION: Only re-render this specific component if its exact hover state changes.
  const isHoveredGlobally = usePortfolioStore((state) => state.hoveredNodeId === project.id);
  const currentScene = usePortfolioStore((state) => state.currentScene);

  const isInteractable = currentScene === 'BUILD' || currentScene === project.id;
  const isHovered = isHoveredGlobally && isInteractable;
  const isActive = currentScene === project.id;
  
  const isFeatured = project.featured;

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!prefersReducedMotion) {
        meshRef.current.rotation.y += delta * (isFeatured ? 0.3 : 0.1);
        meshRef.current.rotation.z += delta * (isFeatured ? 0.2 : 0.05);
      }
      
      const mobileMultiplier = isMobile ? 1.4 : 1.0;
      const baseScale = (isFeatured ? 1.3 : 1.0) * mobileMultiplier;
      const targetScale = isHovered || isActive ? baseScale * 1.3 : baseScale;
      
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05);
      meshRef.current.scale.y = meshRef.current.scale.x;
      meshRef.current.scale.z = meshRef.current.scale.x;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        geometry={boxGeo}
        onClick={(e) => {
          e.stopPropagation();
          if (isInteractable) {
            navigate(project.id);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (isInteractable) {
            setHoveredNode(project.id);
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={(e) => {
          if (isInteractable) {
            setHoveredNode(null);
            document.body.style.cursor = 'auto';
          }
        }}
        visible={isInteractable || currentScene === 'CENTER'} 
      >
        {/* Material cannot be fully cached if it relies heavily on unique props, but we can rely on R3F to manage instances if we don't recreate the geometry */}
        <meshStandardMaterial 
          color={isFeatured ? '#06b6d4' : '#aaaaaa'} 
          emissive={isFeatured ? '#0891b2' : '#ffffff'}
          emissiveIntensity={isHovered ? 2.0 : (isInteractable ? (isFeatured ? 1.0 : 0.5) : 0.2)}
          wireframe={true}
          transparent
          opacity={isInteractable ? 1 : (isFeatured ? 0.5 : 0.2)}
        />
        <mesh geometry={innerBoxGeo} material={innerMat} />
      </mesh>
      
      <Text
        position={[0, -0.6, 0]}
        fontSize={isFeatured ? 0.2 : 0.15}
        color={isActive ? '#ffffff' : (isInteractable ? (isFeatured ? '#06b6d4' : '#cccccc') : '#444444')}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
        fillOpacity={isInteractable ? 1 : 0}
      >
        {project.title}
      </Text>
    </group>
  );
}
