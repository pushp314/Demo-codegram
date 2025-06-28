import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Eye, 
  Code2, 
  Copy,
  Check,
  Play,
  MoreHorizontal
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Snippet } from '../../data/mockData';
import toast from 'react-hot-toast';

interface SnippetCardProps {
  snippet: Snippet;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet }) => {
  const [isLiked, setIsLiked] = useState(snippet.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(snippet.isBookmarked || false);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [likesCount, setLikesCount] = useState(snippet.likes_count);
  const [showMoreCaption, setShowMoreCaption] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
      toast.error('Failed to copy code');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: snippet.title,
        text: snippet.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Create a working preview for HTML/CSS/React components
  const createPreview = () => {
    if (snippet.language.toLowerCase() === 'html') {
      // Create a complete HTML document with Tailwind CSS
      const htmlWithTailwind = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
          </style>
        </head>
        <body>
          ${snippet.code}
        </body>
        </html>
      `;
      
      return (
        <div className="bg-white border rounded-lg overflow-hidden min-h-[300px]">
          <iframe
            srcDoc={htmlWithTailwind}
            className="w-full h-full min-h-[300px] border-0"
            sandbox="allow-scripts"
            title="HTML Preview"
          />
        </div>
      );
    }
    
    if (snippet.language.toLowerCase() === 'jsx' || snippet.language.toLowerCase() === 'tsx') {
      // For React components, show a mock preview with the actual button styles
      if (snippet.code.includes('button') && snippet.code.includes('gradient')) {
        return (
          <div className="bg-gray-50 border rounded-lg p-8 min-h-[300px] flex items-center justify-center">
            <div className="space-y-4">
              <button className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 group">
                <span className="absolute top-0 right-0 w-8 h-8 -mt-1 -mr-1 transition-all duration-1000 ease-in-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-10"></span>
                <span className="relative">Get Started</span>
              </button>
              <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 group">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="relative">Add Item</span>
              </button>
            </div>
          </div>
        );
      }
      
      if (snippet.code.includes('Card') || snippet.code.includes('card')) {
        return (
          <div className="bg-gray-50 border rounded-lg p-8 min-h-[300px] flex items-center justify-center">
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  New
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Amazing Product
                </h3>
                <p className="text-gray-600 mb-4">
                  This is an amazing product that will change your life forever.
                </p>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (snippet.code.includes('Modal') || snippet.code.includes('modal')) {
        return (
          <div className="bg-gray-50 border rounded-lg p-8 min-h-[300px] flex items-center justify-center">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Confirm Action
                </h2>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Are you sure you want to perform this action? This cannot be undone.
                </p>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Default React component preview
      return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              React Component Preview
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <Code2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Code Output Preview
          </p>
        </div>
      </div>
    );
  };

  const truncatedDescription = snippet.description && snippet.description.length > 100 
    ? snippet.description.substring(0, 100) + '...' 
    : snippet.description;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${snippet.author.username}`}>
              <img
                src={snippet.author.avatar_url}
                alt={snippet.author.username}
                className="h-8 w-8 rounded-full object-cover"
              />
            </Link>
            <div>
              <Link 
                to={`/profile/${snippet.author.username}`}
                className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
              >
                {snippet.author.username}
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Preview/Code Toggle */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(false)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                !showCode
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Play className="h-3 w-3" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showCode
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Code2 className="h-3 w-3" />
              <span>Code</span>
            </button>
          </div>
          {showCode && (
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>

        {/* Content Display */}
        {showCode ? (
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language={snippet.language.toLowerCase()}
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: 'transparent',
                  fontSize: '0.875rem',
                }}
                showLineNumbers={false}
              >
                {snippet.code}
              </SyntaxHighlighter>
            </div>
          </div>
        ) : (
          createPreview()
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`transition-colors ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400'
              }`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <Link
              to={`/snippet/${snippet.id}#comments`}
              className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
            </Link>
            
            <button 
              onClick={handleShare}
              className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              <Share2 className="h-6 w-6" />
            </button>
          </div>
          
          <button
            onClick={handleBookmark}
            className={`transition-colors ${
              isBookmarked 
                ? 'text-blue-500' 
                : 'text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
          >
            <Bookmark className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Likes count */}
        <div className="mb-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {likesCount} likes
          </span>
        </div>

        {/* Caption */}
        <div className="mb-2">
          <span className="text-sm">
            <Link 
              to={`/profile/${snippet.author.username}`}
              className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mr-2"
            >
              {snippet.author.username}
            </Link>
            <span className="text-gray-900 dark:text-white">
              {snippet.title}
            </span>
          </span>
          {snippet.description && (
            <div className="mt-1">
              <span className="text-gray-900 dark:text-white text-sm">
                {showMoreCaption ? snippet.description : truncatedDescription}
                {snippet.description && snippet.description.length > 100 && (
                  <button
                    onClick={() => setShowMoreCaption(!showMoreCaption)}
                    className="text-gray-500 dark:text-gray-400 ml-1 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showMoreCaption ? 'less' : 'more'}
                  </button>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {snippet.tags.map((tag) => (
              <Link
                key={tag}
                to={`/search?tag=${encodeURIComponent(tag)}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* View comments */}
        {snippet.comments_count > 0 && (
          <Link
            to={`/snippet/${snippet.id}#comments`}
            className="text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300"
          >
            View all {snippet.comments_count} comments
          </Link>
        )}
      </div>
    </div>
  );
};

export default SnippetCard;