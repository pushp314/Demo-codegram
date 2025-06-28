import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle, Send, MoreHorizontal, Pause, Play } from 'lucide-react';
import { Bug } from '../../data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface StoryViewerProps {
  stories: Bug[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialIndex, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');

  const currentStory = stories[currentIndex];
  const STORY_DURATION = 5000; // 5 seconds per story

  const nextStory = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const prevStory = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextStory();
          return 0;
        }
        return prev + (100 / (STORY_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, nextStory]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
    setIsPaused(false);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextStory();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevStory();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, nextStory, prevStory, onClose]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'high': return 'from-orange-500 to-orange-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      case 'low': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      // Handle comment submission
      setComment('');
    }
  };

  const handleStoryClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    
    if (clickX < width / 3) {
      prevStory();
    } else if (clickX > (2 * width) / 3) {
      nextStory();
    } else {
      setIsPaused(prev => !prev);
    }
  };

  if (!isOpen || !currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ 
                width: index < currentIndex ? '100%' : 
                       index === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <img
            src={currentStory.author.avatar_url}
            alt={currentStory.author.username}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
          />
          <div>
            <h3 className="text-white font-semibold">{currentStory.author.username}</h3>
            <p className="text-white/80 text-sm">
              {formatDistanceToNow(new Date(currentStory.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          </button>
          <button className="p-2 text-white/80 hover:text-white transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevStory}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors z-10"
        disabled={currentIndex === 0}
        style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      <button
        onClick={nextStory}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors z-10"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Story Content */}
      <div 
        className="w-full max-w-md mx-4 h-full max-h-[80vh] relative rounded-2xl overflow-hidden cursor-pointer"
        onClick={handleStoryClick}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${getPriorityColor(currentStory.priority)} opacity-90`} />
        
        <div className="relative h-full p-8 flex flex-col justify-center text-white">
          <div className="text-center space-y-6">
            {/* Priority Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="text-sm font-semibold uppercase tracking-wide">
                {currentStory.priority} Priority
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold leading-tight">
              {currentStory.title}
            </h2>

            {/* Description */}
            <p className="text-white/90 leading-relaxed">
              {currentStory.description}
            </p>

            {/* Code Preview */}
            {currentStory.code && (
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 text-left">
                <pre className="text-sm text-white/90 overflow-x-auto">
                  <code>{currentStory.code.slice(0, 200)}...</code>
                </pre>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {currentStory.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{currentStory.likes_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{currentStory.comments_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`p-3 rounded-full transition-colors ${
              isLiked ? 'text-red-500' : 'text-white/80 hover:text-white'
            }`}
          >
            <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          <div className="flex-1 flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Send message..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation();
                  handleSendComment();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSendComment();
              }}
              disabled={!comment.trim()}
              className="p-1 text-white/80 hover:text-white disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
            <Pause className="h-8 w-8 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;