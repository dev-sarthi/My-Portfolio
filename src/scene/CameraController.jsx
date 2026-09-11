import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useNavigation } from '../hooks/useNavigation';
import { regions } from '../data';

const HOME_POSITION = new THREE.Vector3(0, 1.5, 8);
const HOME_TARGET = new THREE.Vector3(0, 0.5, 0);
const LERP_SPEED = 0.025;

export default function CameraController() {
  const { camera } = useThree();
  const { activeRegion } = useNavigation();

  const targetPos = useRef(HOME_POSITION.clone());
  const targetLookAt = useRef(HOME_TARGET.clone());
  const currentLookAt = useRef(HOME_TARGET.clone());
  const autoRotateAngle = useRef(0);

  useEffect(() => {
    if (activeRegion) {
      const region = regions.find(r => r.id === activeRegion);
      if (region) {
        const pos = new THREE.Vector3(...region.position);
        // Camera flies to a position offset from the node
        targetPos.current.set(
          pos.x * 0.5,
          pos.y + 1.5,
          pos.z + 5,
        );
        targetLookAt.current.copy(pos);
      }
    } else {
      targetPos.current.copy(HOME_POSITION);
      targetLookAt.current.copy(HOME_TARGET);
    }
  }, [activeRegion]);

  useFrame((state, delta) => {
    // Auto-rotate when at home
    if (!activeRegion) {
      autoRotateAngle.current += delta * 0.06;
      const radius = 8;
      const angle = autoRotateAngle.current;
      targetPos.current.set(
        Math.sin(angle) * radius,
        1.5 + Math.sin(angle * 0.3) * 0.3,
        Math.cos(angle) * radius,
      );
    }

    // Smooth lerp camera position
    camera.position.lerp(targetPos.current, LERP_SPEED);

    // Smooth lerp look-at target
    currentLookAt.current.lerp(targetLookAt.current, LERP_SPEED);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
