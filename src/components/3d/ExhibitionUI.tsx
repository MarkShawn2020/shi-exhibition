'use client';

import { useEffect, useState } from 'react';

// Digital Clock Component
const DigitalClock = () => {
  const [time, setTime] = useState('');

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

  return <span>{time}</span>;
};

// Performance monitoring component
const PerformanceInfo = () => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;

    const calculateFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(calculateFPS);
    };

    requestAnimationFrame(calculateFPS);
  }, []);

  return (
    <div>
      <div>
        FPS:
        {fps}
      </div>
      <div>
        Memory:
        {(performance as any).memory ? `${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)}MB` : 'N/A'}
      </div>
    </div>
  );
};

type ExhibitionUIProps = {
  onCommentSubmit: (comment: string) => void;
  currentProject?: string;
  onNavigate: (projectId: string) => void;
  projects: Array<{
    id: string;
    title: string;
    category: string;
    year: string;
  }>;
};

export const ExhibitionUI = ({
  onCommentSubmit,
  currentProject: _currentProject,
  onNavigate,
  projects,
}: ExhibitionUIProps) => {
  const [comment, setComment] = useState('');
  const [showProjectIndex, setShowProjectIndex] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Hide instructions after 10 seconds
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onCommentSubmit(comment.trim());
      setComment('');
    }
  };

  return (
    <>
      {/* Top Navigation Bar - dorsa.cc inspired */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-white font-bold text-xl pointer-events-auto">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-amber-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                石
              </div>
              <span>石藝苑 3D Exhibition</span>
            </div>
          </div>

          {/* Digital Clock inspired by dorsa.cc */}
          <div className="text-white text-center pointer-events-auto">
            <div className="bg-black bg-opacity-80 px-4 py-2 rounded font-mono text-sm border border-yellow-400">
              <DigitalClock />
            </div>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => setShowProjectIndex(!showProjectIndex)}
            className="text-white hover:text-yellow-400 transition-colors pointer-events-auto bg-black bg-opacity-50 px-4 py-2 rounded"
          >
            {showProjectIndex ? '关闭目录' : '项目目录'}
          </button>
        </div>
      </div>

      {/* Project Index Overlay - dorsa.cc style */}
      {showProjectIndex && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="flex h-full">
            {/* Content */}
            <div className="flex-1 p-12 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-white text-3xl font-bold mb-8">项目目录</h2>

                <div className="grid grid-cols-1 gap-4">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        onNavigate(project.id);
                        setShowProjectIndex(false);
                      }}
                      className="text-left p-4 bg-white bg-opacity-5 hover:bg-opacity-10 rounded transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <span className="text-yellow-400 font-mono text-sm">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-white text-xl font-medium group-hover:text-yellow-400 transition-colors">
                              {project.title}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-6 mt-2 ml-8">
                            <span className="text-gray-400 text-sm">{project.category}</span>
                            <span className="text-gray-400 text-sm">{project.year}</span>
                          </div>
                        </div>
                        <div className="text-gray-400 group-hover:text-yellow-400 transition-colors">
                          →
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowProjectIndex(false)}
              className="absolute top-6 right-6 text-white hover:text-yellow-400 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Comment Input */}
      <div className="fixed bottom-6 left-6 right-6 z-50 pointer-events-none">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmitComment} className="pointer-events-auto">
            <div className="bg-black bg-opacity-80 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-400 text-sm">💬</span>
                <span className="text-white text-sm">发表弹幕评论</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="输入你的想法..."
                  className="flex-1 bg-gray-800 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  maxLength={50}
                />
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  发送
                </button>
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {comment.length}
                /50 • 评论将以弹幕形式在3D空间中显示
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Instructions Overlay */}
      {showInstructions && (
        <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-black bg-opacity-90 rounded-lg p-4 text-white text-sm max-w-xs border border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-yellow-400">导航指南</h3>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-400 hover:text-white pointer-events-auto"
              >
                ×
              </button>
            </div>
            <ul className="space-y-1 text-xs">
              <li>• 拖拽鼠标旋转视角</li>
              <li>• 滚轮缩放视距</li>
              <li>• 点击白色展馆进入</li>
              <li>• 悬停查看项目信息</li>
              <li>• 点击项目目录快速导航</li>
            </ul>
          </div>
        </div>
      )}

      {/* Performance Info (Development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
          <div className="bg-black bg-opacity-80 rounded p-2 text-white text-xs">
            <PerformanceInfo />
          </div>
        </div>
      )}
    </>
  );
};
