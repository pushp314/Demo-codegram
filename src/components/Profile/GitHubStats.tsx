import React from 'react';
import { GitHubUser, GitHubLanguageStats } from '../../types/github';
import { 
  Star, 
  GitFork, 
  Users, 
  BookOpen, 
  Calendar,
  MapPin,
  Link as LinkIcon,
  Building,
  Mail
} from 'lucide-react';

interface GitHubStatsProps {
  user: GitHubUser;
  languageStats: GitHubLanguageStats;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ user, languageStats }) => {
  // Calculate top languages
  const topLanguages = Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);

  const getLanguageColor = (language: string): string => {
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
      React: '#61DAFB',
      Angular: '#DD0031',
    };
    return colors[language] || '#8b5cf6';
  };

  return (
    <div className="space-y-6">
      {/* GitHub Profile Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gray-900 dark:bg-white p-2 rounded-lg">
            <svg className="h-5 w-5 text-white dark:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            GitHub Profile
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {user.public_repos}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Repositories
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {user.followers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Followers
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {user.following}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Following
            </div>
          </div>

          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {user.public_gists}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Gists
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-3 text-sm">
          {user.company && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Building className="h-4 w-4" />
              <span>{user.company}</span>
            </div>
          )}
          
          {user.location && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
          )}
          
          {user.email && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          )}
          
          {user.blog && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <LinkIcon className="h-4 w-4" />
              <a 
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {user.blog}
              </a>
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>
              Joined {new Date(user.created_at).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Language Statistics */}
      {topLanguages.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Languages
          </h3>
          
          <div className="space-y-3">
            {topLanguages.map(([language, bytes]) => {
              const percentage = ((bytes / totalBytes) * 100).toFixed(1);
              return (
                <div key={language} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(language) }}
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {language}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: getLanguageColor(language)
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubStats;