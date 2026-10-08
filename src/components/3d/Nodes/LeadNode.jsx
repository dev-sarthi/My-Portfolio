import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const leadGeo = new THREE.TetrahedronGeometry(0.3, 0);
const innerLeadGeo = new THREE.TetrahedronGeometry(0.2, 0);
const innerMat = new THREE.MeshBasicMaterial({ color: '#000000' });

export function LeadNode({ item, position }) {
  const meshRef = useRef();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const navigate = usePortfolioStore((state) => state.navigate);
  const setHoveredNode = usePortfolioStore((state) => state.setHoveredNode);
  
  const isHoveredGlobally = usePortfolioStore((state) => state.hoveredNodeId === item.id);
  const currentScene = usePortfolioStore((state) => state.currentScene);

  const isInteractable = currentScene === 'LEAD' || currentScene === item.id;
  const isHovered = isHoveredGlobally && isInteractable;
  const isActive = currentScene === item.id;

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!prefersReducedMotion) {
        meshRef.current.rotation.y += delta * 0.4;
        meshRef.current.rotation.z += delta * 0.1;
      }
      
      const baseScale = isMobile ? 1.4 : 1.0;
      const targetScale = isHovered || isActive ? baseScale * 1.4 : baseScale;
      
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05);
      meshRef.current.scale.y = meshRef.current.scale.x;
      meshRef.current.scale.z = meshRef.current.scale.x;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        geometry={leadGeo}
        onClick={(e) => {
          e.stopPropagation();
          if (isInteractable) {
            navigate(item.id);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (isInteractable) {
            setHoveredNode(item.id);
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
        <meshStandardMaterial 
          color="#f59e0b" 
          emissive="#fbbf24"
          emissiveIntensity={isHovered ? 2.0 : (isInteractable ? 1.0 : 0.2)}
          wireframe={true}
          transparent
          opacity={isInteractable ? 1 : 0.2}
        />
        <mesh geometry={innerLeadGeo} material={innerMat} />
      </mesh>
      
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.15}
        color={isActive ? '#ffffff' : (isInteractable ? '#fcd34d' : '#444444')}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
        fillOpacity={isInteractable ? 1 : 0}
      >
        {item.title}
      </Text>
    </group>
  );
}
