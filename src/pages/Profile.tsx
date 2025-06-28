import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, mockSnippets } from '../data/mockData';
import { 
  Grid3X3, 
  Bookmark, 
  User, 
  Settings, 
  MoreHorizontal,
  Heart,
  MessageCircle,
  MapPin,
  Link as LinkIcon,
  Github,
  Twitter,
  Calendar,
  Code2,
  FileText,
  Star,
  Eye,
  Plus,
  UserPlus,
  UserCheck
} from 'lucide-react';
import LoadingDots from '../components/UI/LoadingDots';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { profile: currentUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Find the profile user
  const profileUser = mockUsers.find(user => user.username === username) || currentUserProfile;
  const isOwnProfile = currentUserProfile?.username === username;

  // Get user's snippets
  const userSnippets = mockSnippets.filter(snippet => snippet.author.username === username);

  if (!profileUser) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 w-20 h-20 mx-auto mb-6">
            <User className="h-8 w-8 text-gray-400 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            User not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The profile you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleFollow = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFollowing(!isFollowing);
    setLoading(false);
  };

  const tabs = [
    { key: 'posts', label: 'Posts', icon: Grid3X3, count: userSnippets.length },
    { key: 'saved', label: 'Saved', icon: Bookmark, count: 0 },
    { key: 'tagged', label: 'Tagged', icon: User, count: 0 },
  ];

  const stats = [
    { label: 'Posts', value: profileUser.snippets_count, icon: Code2 },
    { label: 'Followers', value: profileUser.followers_count, icon: UserPlus },
    { label: 'Following', value: profileUser.following_count, icon: UserCheck },
    { label: 'Docs', value: profileUser.docs_count, icon: FileText },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="px-6 pb-6">
          {/* Profile Picture */}
          <div className="flex items-end justify-between -mt-16 mb-6">
            <div className="relative">
              <img
                src={profileUser.avatar_url}
                alt={profileUser.username}
                className="h-32 w-32 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 shadow-lg"
              />
              {!isOwnProfile && (
                <div className="absolute -bottom-2 -right-2">
                  <button
                    onClick={handleFollow}
                    disabled={loading}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                      isFollowing
                        ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : isFollowing ? (
                      <UserCheck className="h-5 w-5" />
                    ) : (
                      <UserPlus className="h-5 w-5" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {isOwnProfile ? (
                <>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Edit profile</span>
                  </Link>
                  <Link
                    to="/create/snippet"
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create</span>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleFollow}
                    disabled={loading}
                    className={`flex items-center space-x-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isFollowing
                        ? 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                    }`}
                  >
                    {loading ? (
                      <LoadingDots />
                    ) : (
                      <>
                        {isFollowing ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                        <span>{isFollowing ? 'Following' : 'Follow'}</span>
                      </>
                    )}
                  </button>
                  <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors">
                    Message
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {profileUser.full_name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">@{profileUser.username}</p>
            </div>

            {/* Bio */}
            <p className="text-gray-900 dark:text-white leading-relaxed">
              {profileUser.bio}
            </p>

            {/* Links and Location */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {profileUser.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profileUser.location}</span>
                </div>
              )}
              {profileUser.website_url && (
                <a
                  href={profileUser.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>Website</span>
                </a>
              )}
              {profileUser.github_url && (
                <a
                  href={profileUser.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              )}
              {profileUser.twitter_url && (
                <a
                  href={profileUser.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(profileUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {stat.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <nav className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label.toUpperCase()}</span>
                {tab.count > 0 && (
                  <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <div>
              {userSnippets.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                    <Grid3X3 className="h-8 w-8 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                    No Posts Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {isOwnProfile ? "When you share code snippets, they'll appear here." : "No posts to show."}
                  </p>
                  {isOwnProfile && (
                    <Link
                      to="/create/snippet"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create your first post</span>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {userSnippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden group cursor-pointer relative rounded-lg"
                    >
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <div className="text-center">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm mb-3">
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-1/2"></div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {snippet.title}
                          </p>
                        </div>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center space-x-6 text-white">
                          <div className="flex items-center space-x-2">
                            <Heart className="h-5 w-5" />
                            <span className="text-sm font-semibold">{snippet.likes_count}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-sm font-semibold">{snippet.comments_count}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-5 w-5" />
                            <span className="text-sm font-semibold">{snippet.views_count}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-16">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                <Bookmark className="h-8 w-8 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                No Saved Posts
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Save posts to see them here.
              </p>
            </div>
          )}

          {activeTab === 'tagged' && (
            <div className="text-center py-16">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                <User className="h-8 w-8 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                No Tagged Posts
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Posts where you're tagged will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;