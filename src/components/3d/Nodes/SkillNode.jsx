import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const skillGeo = new THREE.DodecahedronGeometry(0.25, 0);
const innerSkillGeo = new THREE.DodecahedronGeometry(0.15, 0);
const innerMat = new THREE.MeshBasicMaterial({ color: '#000000' });

export function SkillNode({ skill, position }) {
  const meshRef = useRef();
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  const navigate = usePortfolioStore((state) => state.navigate);
  const setHoveredNode = usePortfolioStore((state) => state.setHoveredNode);
  
  const isHoveredGlobally = usePortfolioStore((state) => state.hoveredNodeId === skill.id);
  const currentScene = usePortfolioStore((state) => state.currentScene);

  const isInteractable = currentScene === 'LEARN' || currentScene === skill.id;
  const isHovered = isHoveredGlobally && isInteractable;
  const isActive = currentScene === skill.id;

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (!prefersReducedMotion) {
        meshRef.current.rotation.x += delta * 0.1;
        meshRef.current.rotation.y += delta * 0.2;
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
        geometry={skillGeo}
        onClick={(e) => {
          e.stopPropagation();
          if (isInteractable) {
            navigate(skill.id);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (isInteractable) {
            setHoveredNode(skill.id);
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
          color="#a855f7" 
          emissive="#c084fc"
          emissiveIntensity={isHovered ? 2.0 : (isInteractable ? 1.0 : 0.2)}
          wireframe={true}
          transparent
          opacity={isInteractable ? 1 : 0.2}
        />
        <mesh geometry={innerSkillGeo} material={innerMat} />
      </mesh>
      
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.12}
        color={isActive ? '#ffffff' : (isInteractable ? '#d8b4fe' : '#444444')}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
        fillOpacity={isInteractable ? 1 : 0}
      >
        {skill.title}
      </Text>
    </group>
  );
}
