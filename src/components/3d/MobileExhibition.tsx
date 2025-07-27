'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  position: [number, number, number];
};

type MobileExhibitionProps = {
  projects: Project[];
};

export const MobileExhibition = ({ projects }: MobileExhibitionProps) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject(prev => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments(prev => [...prev, newComment.trim()]);
      setNewComment('');
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-amber-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            石
          </div>
          <span className="font-bold">石藝苑 3D展廳</span>
        </div>
        <div className="text-xs text-gray-400">
          移動端預覽
        </div>
      </div>

      {/* Project Carousel */}
      <div className="relative h-1/2">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>

        {/* Project Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Card className="bg-black/80 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-yellow-400">
                  {projects[currentProject]?.title}
                </h2>
                <span className="text-xs text-gray-400">
                  {currentProject + 1}
                  /
                  {projects.length}
                </span>
              </div>
              <div className="flex space-x-4 text-sm text-gray-300">
                <span>{projects[currentProject]?.category}</span>
                <span>•</span>
                <span>{projects[currentProject]?.year}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentProject ? 'bg-yellow-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Mock 3D View */}
        <div className="h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🏛️</div>
            <div className="text-lg text-gray-400">3D模型區域</div>
            <div className="text-sm text-gray-500 mt-2">
              請在桌面端訪問完整3D體驗
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="h-1/2 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">實時評論</h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="發表你的想法..."
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                maxLength={50}
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-yellow-400 text-black px-4 py-2 rounded text-sm font-medium hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                發送
              </button>
            </div>
            <div className="text-gray-400 text-xs mt-1">
              {newComment.length}
              /50
            </div>
          </form>
        </div>

        {/* Comments Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {comments.length === 0
            ? (
                <div className="text-center text-gray-500 py-8">
                  <div className="text-4xl mb-2">💬</div>
                  <div>還沒有評論，來發表第一條吧！</div>
                </div>
              )
            : (
                comments.map((comment, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-yellow-400 text-sm font-medium">訪客</span>
                      <span className="text-gray-500 text-xs">剛剛</span>
                    </div>
                    <p className="text-white text-sm">{comment}</p>
                  </div>
                ))
              )}
        </div>
      </div>

      {/* Upgrade Notice */}
      <div className="absolute bottom-4 left-4 right-4">
        <Card className="bg-blue-900/50 border-blue-700">
          <CardContent className="p-3 text-center">
            <div className="text-blue-300 text-sm">
              💻 在桌面端體驗完整的3D沉浸式展廳
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
