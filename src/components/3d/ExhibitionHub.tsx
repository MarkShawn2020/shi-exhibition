'use client';

import { Box, RoundedBox, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  position: [number, number, number];
};

type ExhibitionHubProps = {
  projects: Project[];
};

export const ExhibitionHub = ({ projects }: ExhibitionHubProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const hubId = useRef(`hub-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`).current;

  // Gentle rotation of the entire hub
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Hub Platform */}
      <RoundedBox args={[20, 0.5, 20]} radius={0.5} smoothness={4} position={[0, -2, 0]}>
        <meshStandardMaterial color="#1e1e1e" roughness={0.8} metalness={0.2} />
      </RoundedBox>

      {/* Project Cubes in Grid Formation */}
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index * 0.5 + Date.now() * 0.001) * 0.5;

        return (
          <group key={project.id} position={[x, y + 2, z]}>
            {/* Project Cube */}
            <Box
              args={[1.5, 1.5, 1.5]}
              onPointerEnter={() => setHoveredProject(project.id)}
              onPointerLeave={() => setHoveredProject(null)}
            >
              <meshStandardMaterial
                color={hoveredProject === project.id ? '#ddff00' : '#ffffff'}
                roughness={0.3}
                metalness={0.1}
                emissive={hoveredProject === project.id ? '#ddff00' : '#000000'}
                emissiveIntensity={hoveredProject === project.id ? 0.2 : 0}
              />
            </Box>

            {/* Project Label */}
            {hoveredProject === project.id && (
              <Text
                position={[0, 2.5, 0]}
                fontSize={0.3}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                fontWeight="normal"
              >
                {project.title}
              </Text>
            )}

            {/* Category Badge */}
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.15}
              color="#ddff00"
              anchorX="center"
              anchorY="middle"
              fontWeight="500"
            >
              {project.category}
            </Text>

            {/* Year Badge */}
            <Text
              position={[0, -1.5, 0]}
              fontSize={0.12}
              color="#888888"
              anchorX="center"
              anchorY="middle"
            >
              {project.year}
            </Text>

            {/* Connection Lines to Center */}
            <mesh>
              <cylinderGeometry args={[0.01, 0.01, radius]} />
              <meshBasicMaterial color="#333333" transparent opacity={0.3} />
              <primitive
                object={new THREE.Object3D()}
                ref={(ref: THREE.Object3D | null) => {
                  if (ref) {
                    ref.position.set(-x / 2, -y / 2 - 1, -z / 2);
                    ref.lookAt(0, 0, 0);
                    ref.rotateX(Math.PI / 2);
                  }
                }}
              />
            </mesh>
          </group>
        );
      })}

      {/* Central Information Node */}
      <group position={[0, 3, 0]}>
        <Text
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          石藝苑
        </Text>
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.3}
          color="#ddff00"
          anchorX="center"
          anchorY="middle"
        >
          3D Exhibition Hall
        </Text>
        <Text
          position={[0, -1.3, 0]}
          fontSize={0.2}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          Rural Education Architecture
        </Text>
      </group>

      {/* Floating Particles for Atmosphere */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`${hubId}-particle-${i}`}
          position={[
            (Math.random() - 0.5) * 40,
            Math.random() * 20 + 5,
            (Math.random() - 0.5) * 40,
          ]}
        >
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#ddff00" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};
