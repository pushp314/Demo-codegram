import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  Search,
  Compass,
  Plus,
  User,
  Settings,
  Bookmark,
  LogOut,
  FileText,
  Code2,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import SearchSidebar from './SearchSidebar';

const Sidebar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Search, label: 'Search', path: '/search', isSearch: true },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: FileText, label: 'Docs', path: '/docs' },
  ];

  const moreMenuItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
  ];

  const createMenuItems = [
    { icon: Code2, label: 'Code Snippet', path: '/create/snippet' },
    { icon: FileText, label: 'Documentation', path: '/create/docs' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowMoreMenu(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleNavClick = (item: any) => {
    if (item.isSearch) {
      setShowSearchSidebar(true);
      if (!isCollapsed) {
        setIsCollapsed(true);
      }
    }
  };

  const handleSearchClose = () => {
    setShowSearchSidebar(false);
    setIsCollapsed(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div className="p-4 flex-1 flex flex-col">
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center">
            {!isCollapsed && (
              <Link to="/home" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  CodeGram
                </span>
              </Link>
            )}
            {isCollapsed && (
              <Link to="/home" className="flex justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
              </Link>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="space-y-2 flex-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return item.isSearch ? (
                <button
                  key="search"
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-4 px-4'} py-3 rounded-xl transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-6 w-6 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium text-base">{item.label}</span>}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-4 px-4'} py-3 rounded-xl transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`h-6 w-6 flex-shrink-0 ${isActive(item.path) ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  {!isCollapsed && <span className="font-medium text-base">{item.label}</span>}
                </Link>
              );
            })}

            {/* Create Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCreateMenu(!showCreateMenu)}
                className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-4 px-4'} py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 w-full`}
                title={isCollapsed ? 'Create' : undefined}
              >
                <Plus className="h-6 w-6 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium text-base flex-1 text-left">Create</span>}
              </button>

              {showCreateMenu && (
                <div className={`absolute ${isCollapsed ? 'left-full ml-2' : 'top-full mt-2'} ${isCollapsed ? 'bottom-0' : 'left-0 right-0'} bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50`}>
                  {createMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setShowCreateMenu(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Profile Link */}
            <Link
              to={`/profile/${profile?.username}`}
              className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-4 px-4'} py-3 rounded-xl transition-all duration-200 ${
                isActive(`/profile/${profile?.username}`)
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={isCollapsed ? 'Profile' : undefined}
            >
              {profile ? (
                <div className="flex items-center">
                  <img
                    src={profile.avatar_url}
                    alt={profile.username}
                    className={`${isCollapsed ? 'h-8 w-8' : 'h-6 w-6'} rounded-full object-cover flex-shrink-0`}
                  />
                  {!isCollapsed && <span className="font-medium text-base ml-4">Profile</span>}
                </div>
              ) : (
                <>
                  <User className={`h-6 w-6 flex-shrink-0 ${isActive(`/profile/${profile?.username}`) ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  {!isCollapsed && <span className="font-medium text-base">Profile</span>}
                </>
              )}
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="space-y-2">
            {/* More Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-4 px-4'} py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 w-full`}
                title={isCollapsed ? 'More' : undefined}
              >
                <Menu className="h-6 w-6 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium text-base">More</span>}
              </button>

              {showMoreMenu && (
                <div className={`absolute ${isCollapsed ? 'left-full ml-2' : 'bottom-full mb-2'} ${isCollapsed ? 'bottom-0' : 'left-0 right-0'} bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50`}>
                  {moreMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setShowMoreMenu(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Collapse Toggle */}
            {!showSearchSidebar && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'space-x-4 px-4'} py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 w-full`}
                title={isCollapsed ? 'Expand' : 'Collapse'}
              >
                {isCollapsed ? <ChevronRight className="h-6 w-6 flex-shrink-0" /> : <ChevronLeft className="h-6 w-6 flex-shrink-0" />}
                {!isCollapsed && <span className="font-medium text-base">Collapse</span>}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex items-center justify-around py-2">
          {mainNavItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return item.isSearch ? (
              <button
                key="search-mobile"
                onClick={() => setShowSearchSidebar(true)}
                className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Mobile Create Button */}
          <div className="relative">
            <button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
            >
              <Plus className="h-6 w-6" />
              <span className="text-xs font-medium">Create</span>
            </button>

            {showCreateMenu && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[160px]">
                {createMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowCreateMenu(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile Link */}
          <Link
            to={`/profile/${profile?.username}`}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              isActive(`/profile/${profile?.username}`)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {profile ? (
              <img
                src={profile.avatar_url}
                alt={profile.username}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6" />
            )}
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </div>

      {/* Search Sidebar */}
      {showSearchSidebar && (
        <SearchSidebar 
          isOpen={showSearchSidebar} 
          onClose={handleSearchClose} 
        />
      )}
    </>
  );
};

export default Sidebar;