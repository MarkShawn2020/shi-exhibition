'use client';

import type * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

// Global counter to ensure absolute uniqueness across all instances
let globalBarrageCounter = 0;

type Comment = {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  position: [number, number, number];
  velocity: [number, number, number];
  color: string;
  projectId?: string;
};

type BarrageSystemProps = {
  position: [number, number, number];
  projectId?: string;
};

export const BarrageSystem = ({ position, projectId: _projectId }: BarrageSystemProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [_newComment, _setNewComment] = useState('');

  // Generate unique component instance ID with global counter and extra randomness
  const componentId = useRef(`barrage-${++globalBarrageCounter}-${Math.random().toString(36).substring(2, 15)}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`).current;

  // Track if sample comments have been initialized to prevent React StrictMode duplicates
  const sampleCommentsInitialized = useRef(false);

  // Sample comments for demo
  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (sampleCommentsInitialized.current) {
      return;
    }

    sampleCommentsInitialized.current = true;
    const sampleComments: Comment[] = [
      {
        id: `${componentId}-comment-1-${Math.random().toString(36).substring(2, 9)}`,
        text: '这个设计真的很棒！',
        author: '建筑爱好者',
        timestamp: Date.now(),
        position: [10, 5, 0],
        velocity: [-0.02, 0, 0],
        color: '#ddff00',
      },
      {
        id: `${componentId}-comment-2-${Math.random().toString(36).substring(2, 9)}`,
        text: '社区参与的理念很好',
        author: '设计师小王',
        timestamp: Date.now() + 1000,
        position: [12, 3, 2],
        velocity: [-0.015, 0, 0],
        color: '#00ddff',
      },
      {
        id: `${componentId}-comment-3-${Math.random().toString(36).substring(2, 9)}`,
        text: '传统工艺与现代结合👍',
        author: '文化研究者',
        timestamp: Date.now() + 2000,
        position: [15, 4, -1],
        velocity: [-0.025, 0, 0],
        color: '#ff6b6b',
      },
      {
        id: `${componentId}-comment-4-${Math.random().toString(36).substring(2, 9)}`,
        text: 'PEER的项目总是很有意义',
        author: '教育工作者',
        timestamp: Date.now() + 3000,
        position: [8, 6, 3],
        velocity: [-0.018, 0, 0],
        color: '#4ecdc4',
      },
      {
        id: `${componentId}-comment-5-${Math.random().toString(36).substring(2, 9)}`,
        text: '希望能实地参观',
        author: '游客',
        timestamp: Date.now() + 4000,
        position: [14, 2, -2],
        velocity: [-0.012, 0, 0],
        color: '#45b7d1',
      },
    ];

    // Stagger the appearance of comments with proper cleanup
    const timeouts: NodeJS.Timeout[] = [];

    sampleComments.forEach((comment, index) => {
      const timeout = setTimeout(() => {
        setComments((prev) => {
          // Double-check to prevent duplicate additions
          const exists = prev.some(c => c.id === comment.id);
          if (exists) {
            return prev;
          }
          return [...prev, comment];
        });
      }, index * 2000);
      timeouts.push(timeout);
    });

    // Clean up old comments periodically
    const cleanup = setInterval(() => {
      setComments(prev => prev.filter(comment =>
        Date.now() - comment.timestamp < 30000, // Keep for 30 seconds
      ));
    }, 5000);

    return () => {
      // Clear all timeouts and intervals
      timeouts.forEach(timeout => clearTimeout(timeout));
      clearInterval(cleanup);
    };
  }, []);

  // Animate comments movement
  useFrame(() => {
    setComments(prev => prev.map(comment => ({
      ...comment,
      position: [
        comment.position[0] + comment.velocity[0],
        comment.position[1] + comment.velocity[1] + Math.sin(Date.now() * 0.001 + comment.timestamp) * 0.002,
        comment.position[2] + comment.velocity[2],
      ] as [number, number, number],
    })).filter(comment => comment.position[0] > -20)); // Remove when off-screen
  });

  return (
    <group ref={groupRef} position={position}>
      {comments.map(comment => (
        <group key={comment.id} position={comment.position}>
          {/* Comment Background */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[comment.text.length * 0.15 + 0.5, 0.6]} />
            <meshBasicMaterial
              color="#000000"
              transparent
              opacity={0.7}
            />
          </mesh>

          {/* Comment Text */}
          <Text
            fontSize={0.25}
            color={comment.color}
            anchorX="center"
            anchorY="middle"
            fontWeight="500"
            maxWidth={8}
          >
            {comment.text}
          </Text>

          {/* Author Badge */}
          <Text
            position={[0, -0.35, 0]}
            fontSize={0.12}
            color="#888888"
            anchorX="center"
            anchorY="middle"
          >
            -
            {' '}
            {comment.author}
          </Text>

          {/* Glow Effect */}
          <pointLight
            position={[0, 0, 0.5]}
            intensity={0.1}
            color={comment.color}
            distance={2}
          />
        </group>
      ))}

      {/* Comment Input UI (will be replaced with proper UI overlay) */}
      <group position={[0, -8, 0]}>
        <mesh>
          <planeGeometry args={[8, 1.5]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.8} />
        </mesh>

        <Text
          position={[0, 0.2, 0.01]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          发表评论 (按 Enter 键)
        </Text>

        <Text
          position={[0, -0.3, 0.01]}
          fontSize={0.15}
          color="#ddff00"
          anchorX="center"
          anchorY="middle"
        >
          输入框将在UI界面中实现
        </Text>
      </group>
    </group>
  );
};

// Hook for managing barrage comments
export const useBarrageComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const hookId = useRef(`hook-${Math.random().toString(36).substring(2, 15)}-${Date.now()}`).current;

  const addComment = (text: string, projectId?: string) => {
    const comment: Comment = {
      id: `${hookId}-comment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      text,
      author: '访客',
      timestamp: Date.now(),
      position: [15, Math.random() * 6 + 2, (Math.random() - 0.5) * 4],
      velocity: [-0.02, 0, 0],
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      projectId,
    };

    setComments(prev => [...prev, comment]);
  };

  const getCommentsForProject = (projectId: string) => {
    return comments.filter(comment => comment.projectId === projectId);
  };

  return {
    comments,
    addComment,
    getCommentsForProject,
  };
};
