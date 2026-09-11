import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { regions } from '../data';

const PARTICLE_COUNT = 120;
const CONNECTION_COUNT = 40;

export default function NeuralNetwork() {
  const particlesRef = useRef();
  const connectionsRef = useRef();

  // Generate random particles in a sphere around the brain
  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);

    const regionColors = regions.map(r => new THREE.Color(r.color));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute in an ellipsoid
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 4;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.8;

      // Assign color based on nearest region
      const color = regionColors[Math.floor(Math.random() * regionColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.015 + Math.random() * 0.035;
      speeds[i] = 0.2 + Math.random() * 0.8;
    }

    return { positions, colors, sizes, speeds };
  }, []);

  // Generate neural connections between regions
  const connectionData = useMemo(() => {
    const positions = [];

    for (let c = 0; c < CONNECTION_COUNT; c++) {
      const fromRegion = regions[Math.floor(Math.random() * regions.length)];
      const toRegion = regions[Math.floor(Math.random() * regions.length)];

      if (fromRegion.id === toRegion.id) continue;

      const from = fromRegion.position;
      const to = toRegion.position;

      // Create a curved line with a midpoint offset
      const mid = [
        (from[0] + to[0]) / 2 + (Math.random() - 0.5) * 2,
        (from[1] + to[1]) / 2 + (Math.random() - 0.5) * 2 + 1,
        (from[2] + to[2]) / 2 + (Math.random() - 0.5) * 2,
      ];

      positions.push({ from, mid, to });
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = particlesRef.current.geometry.attributes.position;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const speed = particleData.speeds[i];
      const ix = i * 3;

      // Gentle orbital drift
      const origX = particleData.positions[ix];
      const origY = particleData.positions[ix + 1];
      const origZ = particleData.positions[ix + 2];

      posAttr.array[ix] = origX + Math.sin(t * speed * 0.3 + i) * 0.15;
      posAttr.array[ix + 1] = origY + Math.cos(t * speed * 0.2 + i * 0.7) * 0.1;
      posAttr.array[ix + 2] = origZ + Math.sin(t * speed * 0.25 + i * 1.3) * 0.12;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={new Float32Array(particleData.positions)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT}
            array={particleData.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Neural connections as thin lines */}
      {connectionData.map((conn, i) => (
        <NeuralConnection key={i} connection={conn} index={i} />
      ))}
    </group>
  );
}

function NeuralConnection({ connection, index }) {
  const lineRef = useRef();

  const curve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...connection.from),
      new THREE.Vector3(...connection.mid),
      new THREE.Vector3(...connection.to),
    );
  }, [connection]);

  const points = useMemo(() => curve.getPoints(30), [curve]);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.elapsedTime;
    // Pulse opacity
    lineRef.current.material.opacity =
      0.04 + Math.sin(t * 0.5 + index * 0.8) * 0.03;
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.05}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}
