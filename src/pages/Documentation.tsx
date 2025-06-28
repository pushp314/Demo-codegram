import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import DocCard from '../components/Documentation/DocCard';
import { mockDocumentation, Documentation } from '../data/mockData';
import { 
  Loader2, 
  Search, 
  FileText, 
  TrendingUp, 
  Clock, 
  BookOpen,
  Grid,
  List,
  Star,
  Eye,
  Plus
} from 'lucide-react';

const DocumentationPage: React.FC = () => {
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [page, setPage] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const categories = ['all', 'React', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'Python'];

  const fetchDocs = async (pageNum = 0, reset = false) => {
    if (pageNum === 0) setLoading(true);
    else setLoadingMore(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      let filteredDocs = [...mockDocumentation];

      // Apply search filter
      if (searchQuery) {
        filteredDocs = filteredDocs.filter(doc =>
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      // Apply category filter
      if (selectedCategory !== 'all') {
        filteredDocs = filteredDocs.filter(doc => 
          doc.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // Apply sorting based on filter
      switch (filter) {
        case 'popular':
          filteredDocs.sort((a, b) => b.views_count - a.views_count);
          break;
        case 'trending':
          filteredDocs.sort((a, b) => b.likes_count - a.likes_count);
          break;
        default:
          filteredDocs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }

      // Simulate pagination
      const startIndex = pageNum * 6;
      const endIndex = startIndex + 6;
      const pageData = filteredDocs.slice(startIndex, endIndex);

      if (reset) {
        setDocs(pageData);
      } else {
        setDocs(prev => [...prev, ...pageData]);
      }

      setHasMore(endIndex < filteredDocs.length);
    } catch (error) {
      console.error('Error fetching documentation:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchDocs(0, true);
  }, [filter, searchQuery, selectedCategory]);

  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchDocs(nextPage);
    }
  }, [inView, hasMore, loadingMore, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect when searchQuery changes
  };

  const filterOptions = [
    { key: 'latest', label: 'Latest', icon: Clock },
    { key: 'popular', label: 'Popular', icon: Eye },
    { key: 'trending', label: 'Trending', icon: TrendingUp },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Documentation Hub</h1>
                <p className="text-green-100 text-lg opacity-90">
                  Comprehensive guides, tutorials, and documentation created by developers, for developers.
                </p>
              </div>
            </div>
            
            <Link
              to="/create/docs"
              className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-200 border border-white/20"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Create Docs</span>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>{mockDocumentation.length}+ Docs</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Community Driven</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Always Updated</span>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation, guides, tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg transition-all"
          />
        </form>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Sort and Category Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort:</span>
              {filterOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.key}
                    onClick={() => setFilter(option.key as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === option.key
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <List className="h-4 w-4" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Grid className="h-4 w-4" />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Documentation Grid/List */}
      <div>
        {docs.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 w-20 h-20 mx-auto mb-6">
              <FileText className="h-8 w-8 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
              No documentation found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchQuery ? 'Try adjusting your search terms.' : 'Check back later for new content.'}
            </p>
            <Link
              to="/create/docs"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Create Documentation</span>
            </Link>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {docs.map((doc) => (
                <DocCard key={doc.id} doc={doc} viewMode={viewMode} />
              ))}
            </div>

            {/* Loading indicator for infinite scroll */}
            {hasMore && (
              <div ref={ref} className="flex items-center justify-center py-8 mt-8">
                {loadingMore && (
                  <Loader2 className="h-6 w-6 animate-spin text-green-500" />
                )}
              </div>
            )}
            
            {!hasMore && docs.length > 0 && (
              <div className="text-center py-8 mt-8 text-gray-500 dark:text-gray-400">
                <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                  <Star className="h-4 w-4" />
                  <span>You've reached the end! 🎉</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentationPage;