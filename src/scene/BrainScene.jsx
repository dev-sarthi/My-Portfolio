import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import BrainNodes from './BrainNodes';
import NeuralNetwork from './NeuralNetwork';
import Environment from './Environment';
import CameraController from './CameraController';
import Effects from './Effects';

export default function BrainScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 8], fov: 50, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#050510',
      }}
      onPointerMissed={() => {
        // Could navigate home on background click
      }}
    >
      <CameraController />
      <Environment />
      <BrainNodes />
      <NeuralNetwork />
      <Effects />
      <Preload all />
    </Canvas>
  );
}
