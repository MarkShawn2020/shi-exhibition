'use client';

import { Html, Plane, RoundedBox, Text } from '@react-three/drei';
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

type ProjectPavilionProps = {
  project: Project;
  position: [number, number, number];
};

export const ProjectPavilion = ({ project, position }: ProjectPavilionProps) => {
  const pavilionRef = useRef<THREE.Group>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Gentle floating animation
  useFrame((state) => {
    if (pavilionRef.current) {
      pavilionRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
    }
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
    setShowDetails(!showDetails);
  };

  return (
    <group
      ref={pavilionRef}
      position={position}
      onClick={handleClick}
    >
      {/* Main Pavilion Structure */}
      <RoundedBox
        args={[4, 3, 4]}
        radius={0.1}
        smoothness={4}
        position={[0, 1.5, 0]}
      >
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={isOpen ? 0.9 : 0.95}
        />
      </RoundedBox>

      {/* Pavilion Base */}
      <RoundedBox args={[5, 0.2, 5]} radius={0.1} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
      </RoundedBox>

      {/* Project Title on Pavilion */}
      <Text
        position={[0, 3.2, 2.1]}
        fontSize={0.3}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {project.title}
      </Text>

      {/* Category Badge */}
      <Text
        position={[-1.8, 2.8, 2.1]}
        fontSize={0.15}
        color="#ddff00"
        anchorX="left"
        anchorY="middle"
        fontWeight="500"
      >
        {project.category}
      </Text>

      {/* Year Badge */}
      <Text
        position={[1.8, 2.8, 2.1]}
        fontSize={0.15}
        color="#666666"
        anchorX="right"
        anchorY="middle"
      >
        {project.year}
      </Text>

      {/* Interior Content when Opened */}
      {isOpen && (
        <group position={[0, 1.5, 0]}>
          {/* Interior Walls */}
          <Plane args={[3.8, 2.8]} position={[0, 0, -1.9]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#f8f8f8" />
          </Plane>

          {/* Left Wall */}
          <Plane args={[3.8, 2.8]} position={[-1.9, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial color="#f8f8f8" />
          </Plane>

          {/* Right Wall */}
          <Plane args={[3.8, 2.8]} position={[1.9, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <meshStandardMaterial color="#f8f8f8" />
          </Plane>

          {/* Media Display Areas */}
          <Plane args={[1.5, 1]} position={[-1.5, 0.5, -1.85]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#000000" />
          </Plane>

          <Plane args={[1.5, 1]} position={[1.5, 0.5, -1.85]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color="#000000" />
          </Plane>

          {/* Interior Lighting */}
          <pointLight position={[0, 1, 0]} intensity={0.5} color="#ffffff" />

          {/* Interactive Elements Placeholder */}
          <Text
            position={[0, -0.5, -1.8]}
            fontSize={0.2}
            color="#666666"
            anchorX="center"
            anchorY="middle"
          >
            Project Details
          </Text>

          {/* Hotspot Indicators */}
          <mesh position={[-1.5, 0.5, -1.8]}>
            <sphereGeometry args={[0.05]} />
            <meshBasicMaterial color="#ddff00" />
          </mesh>

          <mesh position={[1.5, 0.5, -1.8]}>
            <sphereGeometry args={[0.05]} />
            <meshBasicMaterial color="#ddff00" />
          </mesh>
        </group>
      )}

      {/* Entrance Effect */}
      {!isOpen && (
        <mesh position={[0, 1.5, 2]}>
          <planeGeometry args={[3, 2.5]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Interaction Hint */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.2}
        color="#ddff00"
        anchorX="center"
        anchorY="middle"
        visible={!isOpen}
      >
        Click to Enter
      </Text>

      {/* HTML Overlay for Complex UI */}
      {showDetails && (
        <Html
          position={[0, 3, 3]}
          transform
          occlude
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            maxWidth: '200px',
          }}
        >
          <div>
            <h3>{project.title}</h3>
            <p>
              Category:
              {project.category}
            </p>
            <p>
              Year:
              {project.year}
            </p>
            <button onClick={(e) => {
              e.stopPropagation();
              setShowDetails(false);
            }}
            >
              Close
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};
