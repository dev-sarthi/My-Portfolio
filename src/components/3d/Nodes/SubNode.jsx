import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { usePortfolioStore } from '../../../store/usePortfolioStore';

export function SubNode({ id, label, position, color = '#aaaaaa', emissive = '#ffffff', parentRegion }) {
  const meshRef = useRef();
  
  const navigate = usePortfolioStore((state) => state.navigate);
  const setHoveredNode = usePortfolioStore((state) => state.setHoveredNode);
  const hoveredNodeId = usePortfolioStore((state) => state.hoveredNodeId);
  const currentScene = usePortfolioStore((state) => state.currentScene);

  // A sub-node is only clickable/hoverable if we are currently in its parent region or at the node itself
  const isInteractable = currentScene === parentRegion || currentScene === id;
  const isHovered = hoveredNodeId === id && isInteractable;
  const isActive = currentScene === id;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.z += delta * 0.2;
      
      const targetScale = isHovered || isActive ? 1.4 : 1.0;
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
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
        visible={isInteractable || currentScene === 'CENTER'} // optionally hide them if far away, but they add depth
      >
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial 
          color={color} 
          emissive={emissive}
          emissiveIntensity={isHovered ? 1.5 : (isInteractable ? 0.8 : 0.2)}
          wireframe={true}
          transparent
          opacity={isInteractable ? 1 : 0.3}
        />
        <mesh>
           <boxGeometry args={[0.2, 0.2, 0.2]} />
           <meshBasicMaterial color="#000" />
        </mesh>
      </mesh>
      
      {/* Label only fully visible if interactable */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.15}
        color={isActive ? '#ffffff' : (isInteractable ? '#cccccc' : '#444444')}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
        fillOpacity={isInteractable ? 1 : 0}
      >
        {label}
      </Text>
    </group>
  );
}
