'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/3d/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="text-4xl mb-4">石藝苑</div>
        <div className="text-lg text-gray-400">Loading 3D Exhibition...</div>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
        </div>
      </div>
    </div>
  ),
});

const ExhibitionUI = dynamic(() => import('@/components/3d/ExhibitionUI').then(mod => ({ default: mod.ExhibitionUI })), {
  ssr: false,
});

const MobileExhibition = dynamic(() => import('@/components/3d/MobileExhibition').then(mod => ({ default: mod.MobileExhibition })), {
  ssr: false,
});

export const ExhibitionClient = () => {
  const [_comments, setComments] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth < 768
        || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Sample project data - will be replaced with real data from your portfolio
  const projects = [
    {
      id: 'jingshan',
      title: '井山小學重建',
      category: 'Education',
      year: '2023',
      position: [5, 0, 5] as [number, number, number],
    },
    {
      id: 'yuanling',
      title: '沅陵學校改造',
      category: 'Renovation',
      year: '2022',
      position: [-5, 0, 5] as [number, number, number],
    },
    {
      id: 'longsheng',
      title: '龍勝教學樓',
      category: 'New Construction',
      year: '2024',
      position: [0, 0, -8] as [number, number, number],
    },
    {
      id: 'community-center',
      title: '社區活動中心',
      category: 'Community',
      year: '2023',
      position: [8, 0, 0] as [number, number, number],
    },
    {
      id: 'library',
      title: '鄉村圖書館',
      category: 'Cultural',
      year: '2024',
      position: [-8, 0, 0] as [number, number, number],
    },
  ];

  const handleCommentAdd = (comment: string) => {
    setComments(prev => [...prev, comment]);
  };

  const handleNavigate = (_projectId: string) => {
    // Implementation for camera navigation to project
  };

  // Mobile fallback
  if (isMobile) {
    return <MobileExhibition projects={projects} />;
  }

  return (
    <>
      {/* 3D Scene */}
      <Scene projects={projects} onCommentAdd={handleCommentAdd} />

      {/* UI Overlay */}
      <ExhibitionUI
        onCommentSubmit={handleCommentAdd}
        onNavigate={handleNavigate}
        projects={projects}
      />
    </>
  );
};
