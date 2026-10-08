import { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export function NeuralNetwork({ regions }) {
  
  // Create curves from center (Brain) to each region
  const connections = useMemo(() => {
    return regions.map(region => {
      // Start point near brain, end point at region
      const start = new THREE.Vector3(
        region.position[0] * 0.2, 
        region.position[1] * 0.2, 
        region.position[2] * 0.2
      );
      const end = new THREE.Vector3(...region.position);
      
      // Control point for a nice organic curve
      const mid = new THREE.Vector3(
        (start.x + end.x) / 2 + (Math.random() - 0.5),
        (start.y + end.y) / 2 + (Math.random() - 0.5),
        (start.z + end.z) / 2 + (Math.random() - 0.5)
      );

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return { id: region.id, points: curve.getPoints(50), color: region.emissive };
    });
  }, [regions]);

  return (
    <group>
      {connections.map((conn) => (
        <Line
          key={conn.id}
          points={conn.points}
          color={conn.color}
          lineWidth={1.5}
          transparent
          opacity={0.3}
          dashed={false}
        />
      ))}
      
      {/* Background random neural web for depth */}
      <RandomNeuralWeb count={15} radius={4} />
    </group>
  );
}

function RandomNeuralWeb({ count, radius }) {
  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const p1 = new THREE.Vector3(
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius
      );
      const p2 = new THREE.Vector3(
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius,
        (Math.random() - 0.5) * radius
      );
      arr.push([p1, p2]);
    }
    return arr;
  }, [count, radius]);

  return (
    <group>
      {lines.map((pts, i) => (
        <Line 
          key={i} 
          points={pts} 
          color="#334466" 
          lineWidth={0.5} 
          transparent 
          opacity={0.15} 
        />
      ))}
    </group>
  );
}
