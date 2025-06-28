import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../data/mockData';

const RightSidebar: React.FC = () => {
  const { profile } = useAuth();
  
  // Get suggested users (excluding current user)
  const suggestedUsers = mockUsers.filter(user => user.id !== profile?.id).slice(0, 3);

  return (
    <div className="w-80 bg-white dark:bg-gray-900 p-6 space-y-6">
      {/* Current User Profile */}
      {profile && (
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${profile.username}`}>
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="h-14 w-14 rounded-full object-cover"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link 
              to={`/profile/${profile.username}`}
              className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
            >
              {profile.username}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {profile.full_name}
            </p>
          </div>
          <Link
            to="/settings"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
          >
            Switch
          </Link>
        </div>
      )}

      {/* Suggested Users */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Suggested for you
          </h3>
          <Link
            to="/explore"
            className="text-xs font-semibold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            See All
          </Link>
        </div>

        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-3">
              <Link to={`/profile/${user.username}`}>
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="h-8 w-8 rounded-full object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/profile/${user.username}`}
                  className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm block truncate"
                >
                  {user.username}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Followed by {user.followers_count > 1000 ? `${Math.floor(user.followers_count / 1000)}k` : user.followers_count} others
                </p>
              </div>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-semibold">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
          <div className="flex flex-wrap gap-2">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/help" className="hover:underline">Help</Link>
            <Link to="/press" className="hover:underline">Press</Link>
            <Link to="/api" className="hover:underline">API</Link>
            <Link to="/jobs" className="hover:underline">Jobs</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/locations" className="hover:underline">Locations</Link>
            <Link to="/language" className="hover:underline">Language</Link>
            <Link to="/verified" className="hover:underline">Meta Verified</Link>
          </div>
          <div className="pt-4">
            <p>© 2025 DEVCONNECT FROM META</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;