import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, User, X, Tag, Hash, Code2, FileText } from 'lucide-react';
import { mockUsers, mockSnippets, mockDocumentation } from '../../data/mockData';

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'users' | 'snippets' | 'docs'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'alexdev',
    'react hooks',
    'tailwind components'
  ]);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      
      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 10);
        return updated;
      });
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSelectedTags([]);
  };

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearches(prev => prev.filter(s => s !== searchToRemove));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Get all unique tags
  const allTags = Array.from(new Set([
    ...mockSnippets.flatMap(s => s.tags),
    ...mockDocumentation.flatMap(d => d.tags)
  ])).slice(0, 15);

  // Filter results based on query and selected tags
  const filteredUsers = mockUsers.filter(user =>
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    user.full_name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSnippets = mockSnippets.filter(snippet => {
    const matchesQuery = !query || 
      snippet.title.toLowerCase().includes(query.toLowerCase()) ||
      snippet.description.toLowerCase().includes(query.toLowerCase()) ||
      snippet.author.username.toLowerCase().includes(query.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => snippet.tags.includes(tag));
    
    return matchesQuery && matchesTags;
  });

  const filteredDocs = mockDocumentation.filter(doc => {
    const matchesQuery = !query || 
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.description.toLowerCase().includes(query.toLowerCase()) ||
      doc.author.username.toLowerCase().includes(query.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => doc.tags.includes(tag));
    
    return matchesQuery && matchesTags;
  });

  const tabs = [
    { key: 'all', label: 'All', count: filteredUsers.length + filteredSnippets.length + filteredDocs.length },
    { key: 'users', label: 'Users', count: filteredUsers.length },
    { key: 'snippets', label: 'Snippets', count: filteredSnippets.length },
    { key: 'docs', label: 'Docs', count: filteredDocs.length },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Search Sidebar - positioned next to the collapsed sidebar */}
      <div 
        ref={sidebarRef}
        className="w-96 bg-white dark:bg-gray-900 h-full shadow-2xl overflow-y-auto border-r border-gray-200 dark:border-gray-700 ml-20"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative mb-6">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search everything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
              autoFocus
            />
            {(query || selectedTags.length > 0) && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Tags */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular tags</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Hash className="h-3 w-3 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
            
            {selectedTags.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Active filters</span>
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                    >
                      {tag}
                      <button
                        onClick={() => toggleTag(tag)}
                        className="ml-1 hover:text-blue-600 dark:hover:text-blue-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          {(query || selectedTags.length > 0) && (
            <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Search Results */}
          {query || selectedTags.length > 0 ? (
            <div className="space-y-4">
              {(activeTab === 'all' || activeTab === 'users') && filteredUsers.length > 0 && (
                <div>
                  {activeTab === 'all' && <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Users</h3>}
                  <div className="space-y-2">
                    {filteredUsers.slice(0, activeTab === 'all' ? 3 : 10).map((user) => (
                      <Link
                        key={user.id}
                        to={`/profile/${user.username}`}
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <img
                          src={user.avatar_url}
                          alt={user.username}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {user.username}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {user.full_name}
                          </p>
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.followers_count} followers
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'snippets') && filteredSnippets.length > 0 && (
                <div>
                  {activeTab === 'all' && <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Snippets</h3>}
                  <div className="space-y-2">
                    {filteredSnippets.slice(0, activeTab === 'all' ? 3 : 10).map((snippet) => (
                      <div
                        key={snippet.id}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                            <Code2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                              {snippet.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {snippet.description}
                            </p>
                            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                              <span>by {snippet.author.username}</span>
                              <span>{snippet.likes_count} likes</span>
                              <span className="bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">
                                {snippet.language}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'docs') && filteredDocs.length > 0 && (
                <div>
                  {activeTab === 'all' && <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Documentation</h3>}
                  <div className="space-y-2">
                    {filteredDocs.slice(0, activeTab === 'all' ? 3 : 10).map((doc) => (
                      <Link
                        key={doc.id}
                        to={`/docs/${doc.id}`}
                        onClick={onClose}
                        className="block p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
                            <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                              {doc.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                              {doc.description}
                            </p>
                            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                              <span>by {doc.author.username}</span>
                              <span>{doc.views_count} views</span>
                              <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                                {doc.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredUsers.length === 0 && filteredSnippets.length === 0 && filteredDocs.length === 0 && (
                <div className="text-center py-12">
                  <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try different keywords or remove some filters.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Recent Searches */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent</h2>
                {recentSearches.length > 0 && (
                  <button 
                    onClick={() => setRecentSearches([])}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              {recentSearches.length > 0 ? (
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer group"
                      onClick={() => handleSearch(search)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                          <SearchIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <span className="text-gray-900 dark:text-white">{search}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(search);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Start typing to search for users, snippets, and documentation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;