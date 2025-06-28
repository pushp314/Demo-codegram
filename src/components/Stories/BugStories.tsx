import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { mockBugs } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import StoryViewer from './StoryViewer';

const BugStories: React.FC = () => {
  const { profile } = useAuth();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'ring-red-500';
      case 'high':
        return 'ring-orange-500';
      case 'medium':
        return 'ring-yellow-500';
      case 'low':
        return 'ring-green-500';
      default:
        return 'ring-gray-300';
    }
  };

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
    setIsStoryViewerOpen(true);
  };

  const handleCloseStoryViewer = () => {
    setIsStoryViewerOpen(false);
    setSelectedStoryIndex(null);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        {/* Stories Container */}
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {/* Your Story */}
          <div className="flex-shrink-0 cursor-pointer group">
            <div className="relative w-16 h-16 rounded-full ring-2 ring-gray-300 dark:ring-gray-600 p-0.5 group-hover:ring-blue-500 transition-all duration-200">
              <img
                src={profile?.avatar_url}
                alt="Your story"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1.5 ring-2 ring-white dark:ring-gray-800">
                <Plus className="h-3 w-3 text-white" />
              </div>
            </div>
            <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400 truncate w-16 font-medium">
              Your story
            </p>
          </div>

          {/* Other Stories */}
          {mockBugs.map((bug, index) => {
            return (
              <div
                key={bug.id}
                onClick={() => handleStoryClick(index)}
                className="flex-shrink-0 cursor-pointer group"
              >
                <div className={`relative w-16 h-16 rounded-full p-0.5 ring-2 ${getPriorityColor(bug.priority)} group-hover:scale-105 transition-all duration-200`}>
                  <img
                    src={bug.author.avatar_url}
                    alt={bug.author.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                  {/* Priority indicator */}
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                    bug.priority === 'critical' ? 'bg-red-500' :
                    bug.priority === 'high' ? 'bg-orange-500' :
                    bug.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  } ring-2 ring-white dark:ring-gray-800`} />
                </div>
                <p className="text-xs text-center mt-2 text-gray-600 dark:text-gray-400 truncate w-16 font-medium">
                  {bug.author.username}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={mockBugs}
          initialIndex={selectedStoryIndex}
          isOpen={isStoryViewerOpen}
          onClose={handleCloseStoryViewer}
        />
      )}
    </>
  );
};

export default BugStories;