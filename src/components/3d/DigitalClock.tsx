'use client';

import type * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

type DigitalClockProps = {
  position: [number, number, number];
};

export const DigitalClock = ({ position }: DigitalClockProps) => {
  const clockRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState('');
  const clockId = useRef(`clock-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`).current;

  // Update time every 10ms for centiseconds
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const centiseconds = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');

      setTime(`${hours}:${minutes}:${seconds}:${centiseconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10);

    return () => clearInterval(interval);
  }, []);

  // Gentle floating animation
  useFrame((state) => {
    if (clockRef.current) {
      clockRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      clockRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={clockRef} position={position}>
      {/* Background Panel */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[8, 2]} />
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Time Display */}
      <Text
        fontSize={1.2}
        color="#ddff00"
        anchorX="center"
        anchorY="middle"
        fontWeight="300"
        letterSpacing={0.1}
      >
        {time}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="400"
      >
        Beijing Time
      </Text>

      {/* Glowing Effect */}
      <pointLight
        position={[0, 0, 1]}
        intensity={0.3}
        color="#ddff00"
        distance={10}
      />

      {/* Corner Decorations */}
      {[
        [-3.8, 0.8],
        [3.8, 0.8],
        [-3.8, -0.8],
        [3.8, -0.8],
      ].map(([x, y], index) => (
        <mesh key={`${clockId}-corner-${index}`} position={[x!, y!, 0.05]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#ddff00" emissive="#ddff00" emissiveIntensity={0.2} />
        </mesh>
      ))}

      {/* Frame Lines */}
      <mesh position={[0, 1, 0.05]}>
        <boxGeometry args={[8, 0.02, 0.02]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      <mesh position={[0, -1, 0.05]}>
        <boxGeometry args={[8, 0.02, 0.02]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      <mesh position={[-4, 0, 0.05]}>
        <boxGeometry args={[0.02, 2, 0.02]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      <mesh position={[4, 0, 0.05]}>
        <boxGeometry args={[0.02, 2, 0.02]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
};
