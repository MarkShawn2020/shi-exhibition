'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type PerformanceOptimizerProps = {
  children: React.ReactNode;
};

export const PerformanceOptimizer = ({ children }: PerformanceOptimizerProps) => {
  const { camera: _camera, gl } = useThree();

  // Performance monitoring
  useFrame(() => {
    // Adaptive quality based on frame rate
    const currentFPS = 1000 / gl.info.render.frame;

    if (currentFPS < 30) {
      // Reduce quality
      gl.setPixelRatio(Math.min(window.devicePixelRatio * 0.75, 1));
    } else if (currentFPS > 50) {
      // Increase quality
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  });

  return (
    <group>
      {children}
    </group>
  );
};

// LOD Component for models
type LODModelProps = {
  position: [number, number, number];
  highDetail: React.ReactNode;
  mediumDetail: React.ReactNode;
  lowDetail: React.ReactNode;
};

export const LODModel = ({ position, highDetail, mediumDetail, lowDetail }: LODModelProps) => {
  const lodRef = useRef<THREE.LOD>(null);

  const lod = useMemo(() => {
    const lodObject = new THREE.LOD();
    return lodObject;
  }, []);

  return (
    <primitive object={lod} position={position} ref={lodRef}>
      <group userData={{ lodLevel: 'high', distance: 20 }}>
        {highDetail}
      </group>
      <group userData={{ lodLevel: 'medium', distance: 50 }}>
        {mediumDetail}
      </group>
      <group userData={{ lodLevel: 'low', distance: 100 }}>
        {lowDetail}
      </group>
    </primitive>
  );
};

// Frustum culling component
export const FrustumCuller = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Simple frustum culling
      const frustum = new THREE.Frustum();
      const matrix = new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse,
      );
      frustum.setFromProjectionMatrix(matrix);

      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.visible = frustum.intersectsBox(
            new THREE.Box3().setFromObject(child),
          );
        }
      });
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

// Instanced rendering for repeated elements
type InstancedElementsProps = {
  count: number;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  positions: Float32Array;
};

export const InstancedElements = ({ count, geometry, material, positions }: InstancedElementsProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useMemo(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const matrix = new THREE.Matrix4();
        matrix.setPosition(
          positions[i * 3] || 0,
          positions[i * 3 + 1] || 0,
          positions[i * 3 + 2] || 0,
        );
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count, positions]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={true}
    />
  );
};

// Texture streaming based on distance
export const useTextureStreaming = (baseTexture: string, distances: number[]) => {
  const { camera } = useThree();
  const textures = useMemo(() => {
    // In a real implementation, you would load different resolution textures
    return distances.map(distance => ({
      distance,
      texture: new THREE.TextureLoader().load(baseTexture),
    }));
  }, [baseTexture, distances]);

  const getCurrentTexture = (objectPosition: THREE.Vector3) => {
    const distance = camera.position.distanceTo(objectPosition);

    // Find appropriate texture based on distance
    for (let i = textures.length - 1; i >= 0; i--) {
      if (distance >= textures[i]!.distance) {
        return textures[i]!.texture;
      }
    }

    return textures[0]!.texture;
  };

  return getCurrentTexture;
};

// Performance metrics hook
export const usePerformanceMetrics = () => {
  const { gl } = useThree();

  const getMetrics = () => ({
    drawCalls: gl.info.render.calls,
    triangles: gl.info.render.triangles,
    geometries: gl.info.memory.geometries,
    textures: gl.info.memory.textures,
  });

  return getMetrics;
};
