'use client';

import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { BarrageSystem } from './BarrageSystem';
import { DigitalClock } from './DigitalClock';
import { ExhibitionHub } from './ExhibitionHub';
import { FrustumCuller, PerformanceOptimizer } from './PerformanceOptimizer';
import { ProjectPavilion } from './ProjectPavilion';

type SceneProps = {
  projects?: Array<{
    id: string;
    title: string;
    category: string;
    year: string;
    position: [number, number, number];
  }>;
  onCommentAdd?: (comment: string) => void;
};

export const Scene = ({ projects = [], onCommentAdd: _onCommentAdd }: SceneProps) => {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas
        camera={{
          position: [0, 10, 20],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true }}
        shadows
      >
        <Suspense fallback={null}>
          <PerformanceOptimizer>
            <FrustumCuller>
              {/* Lighting */}
              <ambientLight intensity={0.1} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={0.3}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[0, 20, 0]} intensity={0.2} color="#ddff00" />

              {/* Environment */}
              <Environment preset="night" />
              <ContactShadows opacity={0.2} scale={50} blur={2} far={20} />

              {/* 3D Content */}
              <ExhibitionHub projects={projects} />

              {/* Floating Digital Clock - inspired by dorsa.cc */}
              <DigitalClock position={[0, 15, 0]} />

              {/* Individual Project Pavilions */}
              {projects.map((project, _index) => (
                <ProjectPavilion
                  key={project.id}
                  project={project}
                  position={project.position}
                />
              ))}

              {/* Barrage Comment System */}
              <BarrageSystem position={[0, 8, 0]} />
            </FrustumCuller>
          </PerformanceOptimizer>

          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxDistance={100}
            minDistance={5}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
