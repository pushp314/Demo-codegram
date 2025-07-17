import React, { useState } from 'react';
import { GitHubRepository } from '../../types/github';
import { 
  Star, 
  GitFork, 
  Eye, 
  Code2, 
  ExternalLink,
  Calendar,
  Lock,
  Archive,
  Search
} from 'lucide-react';

interface GitHubRepositoriesProps {
  repositories: GitHubRepository[];
  loading?: boolean;
}

const GitHubRepositories: React.FC<GitHubRepositoriesProps> = ({ 
  repositories, 
  loading = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'forks' | 'name'>('updated');
  const [filterBy, setFilterBy] = useState<'all' | 'source' | 'forks'>('all');

  // Filter repositories
  const filteredRepos = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'source' && !repo.fork) ||
                         (filterBy === 'forks' && repo.fork);
    
    return matchesSearch && matchesFilter;
  });

  // Sort repositories
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stargazers_count - a.stargazers_count;
      case 'forks':
        return b.forks_count - a.forks_count;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  const getLanguageColor = (language: string | null): string => {
    if (!language) return '#8b5cf6';
    
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      C: '#555555',
      'C#': '#239120',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Vue: '#4FC08D',
    };
    return colors[language] || '#8b5cf6';
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Repositories ({repositories.length})
        </h3>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="updated">Recently updated</option>
            <option value="stars">Most stars</option>
            <option value="forks">Most forks</option>
            <option value="name">Name</option>
          </select>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="source">Source</option>
            <option value="forks">Forks</option>
          </select>
        </div>
      </div>

      {/* Repository List */}
      <div className="space-y-4">
        {sortedRepos.length === 0 ? (
          <div className="text-center py-8">
            <Code2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No repositories found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search terms.' : 'No repositories to display.'}
            </p>
          </div>
        ) : (
          sortedRepos.map((repo) => (
            <div
              key={repo.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate"
                    >
                      {repo.name}
                    </a>
                    
                    {repo.private && (
                      <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    )}
                    
                    {repo.fork && (
                      <GitFork className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    )}
                    
                    {repo.archived && (
                      <Archive className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  
                  {repo.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                </div>
                
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Topics */}
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {repo.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{repo.topics.length - 5} more
                    </span>
                  )}
                </div>
              )}

              {/* Stats and Language */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  {repo.language && (
                    <div className="flex items-center space-x-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stargazers_count.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {repo.forks_count > 0 && (
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks_count.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {repo.license && (
                    <span>{repo.license.name}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GitHubRepositories;