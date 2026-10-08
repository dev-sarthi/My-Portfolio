import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { PerformanceMonitor } from '@react-three/drei';
import { MainScene } from './components/3d/Scene/MainScene';
import { ProjectPanel } from './components/ui/Panels/ProjectPanel';
import { SkillPanel } from './components/ui/Panels/SkillPanel';
import { LeadPanel } from './components/ui/Panels/LeadPanel';
import { GlobalOverlay } from './components/ui/Panels/GlobalOverlay';
import { HUD } from './components/ui/HUD/HUD';
import { IntroSequence } from './components/ui/Loading/IntroSequence';
import { usePortfolioStore } from './store/usePortfolioStore';

export default function App() {
  const performanceTier = usePortfolioStore((state) => state.performanceTier);
  const setPerformanceTier = usePortfolioStore((state) => state.setPerformanceTier);

  // Configure hardware tiers
  const getDpr = () => {
    switch (performanceTier) {
      case 'LOW': return [0.5, 0.75];
      case 'MEDIUM': return [0.75, 1];
      case 'HIGH': 
      default: return [1, 2];
    }
  };

  const enableBloom = performanceTier === 'HIGH';

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={getDpr()}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
      >
        <PerformanceMonitor 
          onDecline={() => {
            if (performanceTier === 'HIGH') setPerformanceTier('MEDIUM');
            else if (performanceTier === 'MEDIUM') setPerformanceTier('LOW');
          }} 
          onIncline={() => {
            // Optionally scale back up if performance is stellar
            if (performanceTier === 'LOW') setPerformanceTier('MEDIUM');
          }}
          flipflops={3} // Prevents infinite oscillation between tiers
          onFallback={() => setPerformanceTier('LOW')} // Extreme lag
        >
          <Suspense fallback={null}>
            <MainScene />
            {enableBloom && (
              <EffectComposer disableNormalPass>
                <Bloom 
                  luminanceThreshold={0.2} 
                  mipmapBlur 
                  intensity={1.2} 
                />
              </EffectComposer>
            )}
          </Suspense>
        </PerformanceMonitor>
      </Canvas>

      <IntroSequence />
      <HUD />
      <ProjectPanel />
      <SkillPanel />
      <LeadPanel />
      <GlobalOverlay />
    </div>
  );
}
