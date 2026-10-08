import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export function CameraController() {
  const { camera } = useThree();
  
  const target = usePortfolioStore((state) => state.cameraTarget);
  const lookAt = usePortfolioStore((state) => state.cameraLookAt);
  const setTransitioning = usePortfolioStore((state) => state.setTransitioning);

  useEffect(() => {
    setTransitioning(true);
    
    // Create a dummy object to animate the lookAt target smoothly
    const currentLookAt = { x: 0, y: 0, z: 0 };
    // Assuming the camera is currently looking near 0,0,0 initially, 
    // a more robust approach tracks the actual lookAt over time if needed, 
    // but this suffices for the core foundation.

    const tl = gsap.timeline({
      onComplete: () => {
        setTransitioning(false);
      }
    });

    tl.to(camera.position, {
      x: target[0],
      y: target[1],
      z: target[2],
      duration: 2.0,
      ease: 'power4.inOut',
      onUpdate: () => {
        camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
      }
    }, 0);

  }, [target, lookAt, camera, setTransitioning]);

  return null;
}
