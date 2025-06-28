import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Code2, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  const handleGithubLogin = () => {
    // In a real app, this would redirect to GitHub OAuth
    // For demo purposes, we'll redirect to profile setup
    window.location.href = '/profile-setup';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-10 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
            <Code2 className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            CodeGram
          </h1>
        </div>

        {/* Hero Text */}
        <div className="space-y-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Where Developers
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Share & Connect
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Join the social platform built for developers to share code, discover projects, and build community.
          </p>
        </div>

        {/* CTA Button */}
        <div className="space-y-8">
          <button
            onClick={handleGithubLogin}
            className="group inline-flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
          >
            <Github className="h-8 w-8" />
            <span>Continue with GitHub</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Simple Info */}
          <p className="text-gray-500 dark:text-gray-400">
            Free to join • 10k+ developers • Open source
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-20 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              Learn More
            </Link>
          </div>
          <p className="text-center text-gray-400 dark:text-gray-500 mt-4 text-sm">
            © 2025 CodeGram. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;