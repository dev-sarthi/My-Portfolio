import { create } from 'zustand';
import { projects, learnNodes, leadershipNodes, achievements } from '../data';

// Central hub cameras
const HUB_CAMERAS = {
  CENTER: { target: [0, 0, 8], lookAt: [0, 0, 0] },
  BUILD: { target: [-3.5, 0.5, 3.5], lookAt: [-3.5, 0.5, 0] },
  LEARN: { target: [0, 2.5, 3], lookAt: [0, 2.5, -1] },
  LEAD: { target: [3.5, 0.5, 3.5], lookAt: [3.5, 0.5, 0] }
};

// Hardcoded specific project offsets for BUILD since data.js doesn't contain them
const PROJECT_OFFSETS = {
  vigil: [-4.5, 1.5, 1],
  lifelens: [-2.5, -0.5, 1],
  praniti: [-4.5, -0.5, 1]
};

// Helper to look up camera position dynamically
function getCameraForScene(sceneId) {
  if (HUB_CAMERAS[sceneId]) return HUB_CAMERAS[sceneId];
  
  // Is it a project?
  if (PROJECT_OFFSETS[sceneId]) {
    const pos = PROJECT_OFFSETS[sceneId];
    return { target: [pos[0], pos[1], pos[2] + 1.2], lookAt: [pos[0], pos[1], pos[2]] };
  }
  
  // Is it a learn node?
  const learnNode = learnNodes.find(n => n.id === sceneId);
  if (learnNode) {
    const pos = learnNode.position;
    return { target: [pos[0], pos[1], pos[2] + 1.2], lookAt: [pos[0], pos[1], pos[2]] };
  }

  // Is it a leadership node?
  const leadNode = leadershipNodes.find(n => n.id === sceneId);
  if (leadNode) {
    const pos = leadNode.position;
    return { target: [pos[0], pos[1], pos[2] + 1.5], lookAt: [pos[0], pos[1], pos[2]] };
  }

  // Is it an achievement?
  const achNode = achievements.find(n => n.id === sceneId);
  if (achNode) {
    const pos = achNode.position;
    return { target: [pos[0], pos[1], pos[2] + 1.5], lookAt: [pos[0], pos[1], pos[2]] };
  }
  
  return HUB_CAMERAS.CENTER;
}

export const usePortfolioStore = create((set) => ({
  // Navigation State
  currentScene: 'CENTER',
  navigationPath: ['CENTER'],
  
  // Camera State
  cameraTarget: HUB_CAMERAS.CENTER.target,
  cameraLookAt: HUB_CAMERAS.CENTER.lookAt,
  isTransitioning: false,
  
  // Interaction
  hoveredNodeId: null,
  
  // Intro State
  isIntroComplete: localStorage.getItem('hasSeenIntro') === 'true',
  
  // Overlay State (ABOUT, RESUME, CONTACT)
  activeOverlay: null,
  
  // Performance Scaling (HIGH, MEDIUM, LOW)
  performanceTier: 'HIGH',
  
  // Actions
  setPerformanceTier: (tier) => set({ performanceTier: tier }),
  
  setActiveOverlay: (overlayId) => set({ activeOverlay: overlayId }),
  
  completeIntro: () => {
    localStorage.setItem('hasSeenIntro', 'true');
    set({ isIntroComplete: true });
  },

  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  
  navigate: (sceneId) => {
    set((state) => {
      if (state.currentScene === sceneId || state.isTransitioning) return state;
      
      const newCamera = getCameraForScene(sceneId);
      const newPath = [...state.navigationPath, sceneId];

      return {
        currentScene: sceneId,
        navigationPath: newPath,
        cameraTarget: newCamera.target,
        cameraLookAt: newCamera.lookAt,
        isTransitioning: true
      };
    });
  },
  
  navigateBack: () => {
    set((state) => {
      if (state.navigationPath.length <= 1 || state.isTransitioning) return state;
      
      const newPath = [...state.navigationPath];
      newPath.pop();
      const prevScene = newPath[newPath.length - 1];
      const newCamera = getCameraForScene(prevScene);

      return {
        currentScene: prevScene,
        navigationPath: newPath,
        cameraTarget: newCamera.target,
        cameraLookAt: newCamera.lookAt,
        isTransitioning: true
      };
    });
  },

  navigateToCenter: () => {
    set((state) => {
      if (state.currentScene === 'CENTER' || state.isTransitioning) return state;
      
      return {
        currentScene: 'CENTER',
        navigationPath: ['CENTER'],
        cameraTarget: HUB_CAMERAS.CENTER.target,
        cameraLookAt: HUB_CAMERAS.CENTER.lookAt,
        isTransitioning: true
      };
    });
  },
  
  setTransitioning: (status) => set({ isTransitioning: status })
}));
