import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { 
  Eye, 
  Heart, 
  BookOpen, 
  ExternalLink,
  User,
  Calendar,
  Clock,
  Tag,
  Star,
  MessageCircle
} from 'lucide-react';
import { Documentation } from '../../data/mockData';

interface DocCardProps {
  doc: Documentation;
  viewMode?: 'grid' | 'list';
}

const DocCard: React.FC<DocCardProps> = ({ doc, viewMode = 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200 group">
        <div className="flex">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-48 h-32 relative bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <img
              src={doc.thumbnail_url}
              alt={doc.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 backdrop-blur-sm">
                <BookOpen className="h-3 w-3 mr-1" />
                {doc.category}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <Link to={`/docs/${doc.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-tight">
                  {doc.title}
                </h3>
              </Link>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm leading-relaxed">
              {doc.description}
            </p>

            {/* Author and Meta */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Link to={`/profile/${doc.author.username}`}>
                  <img
                    src={doc.author.avatar_url}
                    alt={doc.author.username}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                  />
                </Link>
                <div>
                  <Link 
                    to={`/profile/${doc.author.username}`}
                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    {doc.author.username}
                  </Link>
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {doc.tags && doc.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {doc.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag}
                    to={`/search?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Link>
                ))}
                {doc.tags.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    +{doc.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Footer Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">{doc.likes_count}</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">{doc.views_count}</span>
                </div>

                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">12</span>
                </div>
              </div>
              
              <Link
                to={`/docs/${doc.id}`}
                className="flex items-center space-x-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors group/link"
              >
                <span className="text-sm font-medium">Read</span>
                <ExternalLink className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <img
          src={doc.thumbnail_url}
          alt={doc.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 backdrop-blur-sm">
            <BookOpen className="h-3 w-3 mr-1" />
            {doc.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Content */}
      <div className="p-6">
        <Link to={`/docs/${doc.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
            {doc.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
          {doc.description}
        </p>

        {/* Tags */}
        {doc.tags && doc.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {doc.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                to={`/search?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
            {doc.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                +{doc.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Author and Meta */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${doc.author.username}`}>
              <img
                src={doc.author.avatar_url}
                alt={doc.author.username}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
              />
            </Link>
            <div>
              <Link 
                to={`/profile/${doc.author.username}`}
                className="text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {doc.author.username}
              </Link>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(doc.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">{doc.likes_count}</span>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">{doc.views_count}</span>
            </div>
          </div>
          
          <Link
            to={`/docs/${doc.id}`}
            className="flex items-center space-x-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors group/link"
          >
            <span className="text-sm font-medium">Read More</span>
            <ExternalLink className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocCard;