import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockSnippets, Snippet } from '../data/mockData';
import { 
  Code2, 
  TrendingUp, 
  Clock, 
  Star,
  Heart,
  MessageCircle,
  Eye,
  Plus
} from 'lucide-react';
import LoadingDots from '../components/UI/LoadingDots';

const Snippets: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'latest' | 'trending' | 'popular'>('latest');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  const languages = ['all', 'javascript', 'typescript', 'python', 'css', 'html', 'jsx'];

  const fetchSnippets = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      let filteredSnippets = [...mockSnippets];

      // Apply language filter
      if (selectedLanguage !== 'all') {
        filteredSnippets = filteredSnippets.filter(snippet => 
          snippet.language.toLowerCase() === selectedLanguage
        );
      }

      // Apply sorting based on filter
      switch (filter) {
        case 'trending':
          filteredSnippets.sort((a, b) => b.likes_count - a.likes_count);
          break;
        case 'popular':
          filteredSnippets.sort((a, b) => b.views_count - a.views_count);
          break;
        default:
          filteredSnippets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }

      setSnippets(filteredSnippets);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [filter, selectedLanguage]);

  const filterOptions = [
    { key: 'latest', label: 'Latest', icon: Clock },
    { key: 'trending', label: 'Trending', icon: TrendingUp },
    { key: 'popular', label: 'Popular', icon: Star },
  ];

  // Create masonry-style grid layout
  const createMasonryGrid = () => {
    const gridItems = snippets.map((snippet, index) => {
      const isLarge = index % 7 === 0 || index % 7 === 3; // Make some items larger
      const aspectRatio = isLarge ? 'aspect-[4/5]' : 'aspect-square';
      
      return (
        <div
          key={snippet.id}
          className={`${aspectRatio} ${isLarge ? 'row-span-2' : ''} group cursor-pointer relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900`}
        >
          {/* Preview Content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm mb-3 max-w-full">
                  <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg inline-flex items-center space-x-2">
                  <Code2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                    {snippet.language}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                {snippet.title}
              </h3>
              <div className="flex items-center space-x-2">
                <img
                  src={snippet.author.avatar_url}
                  alt={snippet.author.username}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {snippet.author.username}
                </span>
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-1">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm font-medium">{snippet.likes_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{snippet.comments_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-5 w-5" />
                  <span className="text-sm font-medium">{snippet.views_count}</span>
                </div>
              </div>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                View Code
              </button>
            </div>
          </div>
        </div>
      );
    });

    return gridItems;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Explore Code 🚀
            </h1>
            <p className="text-blue-100">
              Discover amazing code snippets from the community
            </p>
          </div>
          <Link
            to="/create/snippet"
            className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-200 border border-white/20"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Create</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Sort Filter */}
          <div className="flex items-center space-x-1">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.key}
                  onClick={() => setFilter(option.key as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === option.key
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Language Filter */}
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedLanguage === language
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Code2 className="h-3 w-3" />
                <span>{language === 'all' ? 'All' : language}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div>
        {snippets.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 w-20 h-20 mx-auto mb-6">
              <Code2 className="h-8 w-8 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              No snippets found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try changing your filters or check back later for new content.
            </p>
            <Link
              to="/create/snippet"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Snippet</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 auto-rows-max">
            {createMasonryGrid()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Snippets;