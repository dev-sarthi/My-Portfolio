import { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { BrainCore } from '../Brain/BrainCore';
import { NeuralParticles } from '../Brain/NeuralParticles';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { RegionNode } from '../Nodes/RegionNode';
import { ProjectNode } from '../Nodes/ProjectNode';
import { SkillNode } from '../Nodes/SkillNode';
import { LeadNode } from '../Nodes/LeadNode';
import { NeuralNetwork } from '../Neural/NeuralNetwork';
import { CameraController } from '../../camera/CameraController';

// Import our decoupled portfolio data
import { projects, learnNodes, leadershipNodes, achievements } from '../../../data';

// Central regions
const R3F_REGIONS = [
  { id: 'BUILD', label: 'BUILD', position: [-3.5, 0.5, 0], color: '#06b6d4', emissive: '#0891b2' },
  { id: 'LEARN', label: 'LEARN', position: [0, 2.5, -1], color: '#8b5cf6', emissive: '#7c3aed' },
  { id: 'LEAD', label: 'LEAD', position: [3.5, 0.5, 0], color: '#f59e0b', emissive: '#d97706' },
];

// Define spatial positions for the projects in the BUILD region
const PROJECT_POSITIONS = {
  vigil: [-4.5, 1.5, 1],
  lifelens: [-2.5, -0.5, 1],
  praniti: [-4.5, -0.5, 1]
};

export function MainScene() {
  const currentScene = usePortfolioStore((state) => state.currentScene);
  const performanceTier = usePortfolioStore((state) => state.performanceTier);
  
  // Create small branch connections from the BUILD node to its projects
  const buildConnections = useMemo(() => {
    const buildPos = new THREE.Vector3(...R3F_REGIONS.find(r => r.id === 'BUILD').position);
    return projects.map(proj => {
      const posArr = PROJECT_POSITIONS[proj.id];
      if (!posArr) return null;
      const projPos = new THREE.Vector3(...posArr);
      return { id: proj.id, points: [buildPos, projPos], isFeatured: proj.featured };
    }).filter(Boolean);
  }, []);

  // Create branch connections from the LEARN node to skills
  const learnConnections = useMemo(() => {
    const learnPos = new THREE.Vector3(...R3F_REGIONS.find(r => r.id === 'LEARN').position);
    return learnNodes.map(skill => {
      const skillPos = new THREE.Vector3(...skill.position);
      return { id: skill.id, points: [learnPos, skillPos], prominence: skill.prominence };
    });
  }, []);

  // Create branch connections from LEAD node to leadership nodes/achievements
  const leadConnections = useMemo(() => {
    const leadPos = new THREE.Vector3(...R3F_REGIONS.find(r => r.id === 'LEAD').position);
    const combinedNodes = [...leadershipNodes, ...achievements];
    return combinedNodes.map(node => {
      const nodePos = new THREE.Vector3(...node.position);
      return { id: node.id, points: [leadPos, nodePos], isFeatured: node.featured };
    });
  }, []);

  return (
    <>
      <CameraController />
      
      <fog attach="fog" args={['#010103', 4, 18]} />

      <BrainCore />
      {/* Atmosphere / Global Particles */}
      <NeuralParticles count={performanceTier === 'HIGH' ? 300 : (performanceTier === 'MEDIUM' ? 150 : 50)} radius={3.5} />
      <NeuralNetwork regions={R3F_REGIONS} />
      
      {/* Premium Studio Lighting Setup */}
      <ambientLight intensity={0.15} color="#445588" />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#06b6d4" />
      <directionalLight position={[-10, -10, -5]} intensity={1.0} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} intensity={2.0} angle={0.3} penumbra={1} color="#ffffff" />

      {R3F_REGIONS.map((region) => (
        <RegionNode
          key={region.id}
          id={region.id}
          label={region.label}
          position={region.position}
          color={region.color}
          emissive={region.emissive}
        />
      ))}
      
      {/* Project Nodes driven by data */}
      {projects.map((project) => {
        const position = PROJECT_POSITIONS[project.id];
        if (!position) return null;
        return (
          <ProjectNode 
            key={project.id}
            project={project}
            position={position}
          />
        );
      })}

      {/* Minor connections from BUILD to Projects */}
      {buildConnections.map(conn => (
        <Line 
          key={`conn-${conn.id}`}
          points={conn.points}
          color={conn.isFeatured ? '#06b6d4' : '#aaaaaa'}
          lineWidth={conn.isFeatured ? 2 : 1}
          transparent
          opacity={conn.isFeatured ? 0.6 : 0.3}
        />
      ))}
      
      {/* Skill Nodes driven by data */}
      {learnNodes.map((skill) => (
        <SkillNode key={skill.id} skill={skill} />
      ))}

      {/* Connections from LEARN to Skills */}
      {learnConnections.map(conn => (
        <Line 
          key={`conn-learn-${conn.id}`}
          points={conn.points}
          color={conn.prominence === 3 ? '#8b5cf6' : '#6b7280'}
          lineWidth={conn.prominence === 3 ? 1.5 : 0.5}
          transparent
          opacity={conn.prominence * 0.2}
        />
      ))}
      
      {/* Leadership & Achievement Nodes */}
      {leadershipNodes.map((node) => (
        <LeadNode key={node.id} item={node} />
      ))}
      {achievements.map((node) => (
        <LeadNode key={node.id} item={node} />
      ))}

      {/* Connections from LEAD to Experiences */}
      {leadConnections.map(conn => (
        <Line 
          key={`conn-lead-${conn.id}`}
          points={conn.points}
          color={conn.isFeatured ? '#f59e0b' : '#aaaaaa'}
          lineWidth={conn.isFeatured ? 2 : 1}
          transparent
          opacity={conn.isFeatured ? 0.6 : 0.3}
        />
      ))}
    </>
  );
}
