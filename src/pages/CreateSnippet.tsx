import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Code2, 
  Eye, 
  Hash, 
  Send, 
  Save, 
  X, 
  Plus, 
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Palette,
  Layout
} from 'lucide-react';
import toast from 'react-hot-toast';

const CreateSnippet: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'html' | 'react' | null>(null);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [uiMode, setUiMode] = useState<'standard' | 'advanced'>('standard');

  const snippetTypes = [
    {
      id: 'html',
      title: 'HTML + Tailwind CSS',
      description: 'Create beautiful UI components with HTML and Tailwind CSS',
      icon: '🎨',
      defaultCode: `<div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
  <div class="relative">
    <img class="w-full h-48 object-cover" src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Card image">
    <span class="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
      Featured
    </span>
  </div>
  
  <div class="p-6">
    <h3 class="text-xl font-bold text-gray-900 mb-2">
      Beautiful Card Component
    </h3>
    
    <p class="text-gray-600 mb-4">
      This is a beautiful card component built with Tailwind CSS. Perfect for showcasing content.
    </p>
    
    <button class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
      Learn More
    </button>
  </div>
</div>`
    },
    {
      id: 'react',
      title: 'React + Tailwind CSS',
      description: 'Build interactive React components with Tailwind styling',
      icon: '⚛️',
      defaultCode: `function InteractiveCard({ title, description, image }) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(42);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          className="w-full h-48 object-cover" 
          src={image} 
          alt={title} 
        />
        <button
          onClick={handleLike}
          className={\`absolute top-4 right-4 p-2 rounded-full transition-colors \${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }\`}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {likes} likes
          </span>
          
          <button 
            onClick={() => alert('View details clicked!')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Render the component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <InteractiveCard
    title="Amazing Product"
    description="This is an amazing product with interactive features."
    image="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400"
  />
);`
    }
  ];

  const createPreview = () => {
    if (!code || !selectedType) return null;

    const getViewportWidth = () => {
      switch (viewMode) {
        case 'mobile': return '375px';
        case 'tablet': return '768px';
        default: return '100%';
      }
    };

    if (selectedType === 'html') {
      const htmlWithTailwind = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; background: #f9fafb; }
          </style>
        </head>
        <body>
          <div class="min-h-screen flex items-center justify-center">
            ${code}
          </div>
        </body>
        </html>
      `;
      
      return (
        <div className="bg-gray-50 border rounded-lg overflow-hidden h-full flex items-center justify-center">
          <div style={{ width: getViewportWidth(), height: '100%' }}>
            <iframe
              srcDoc={htmlWithTailwind}
              className="w-full h-full border-0"
              sandbox="allow-scripts"
              title="HTML Preview"
            />
          </div>
        </div>
      );
    }

    if (selectedType === 'react') {
      const reactWithTailwind = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React Preview</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; background: #f9fafb; }
            #root { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${code}
          </script>
        </body>
        </html>
      `;
      
      return (
        <div className="bg-gray-50 border rounded-lg overflow-hidden h-full flex items-center justify-center">
          <div style={{ width: getViewportWidth(), height: '100%' }}>
            <iframe
              srcDoc={reactWithTailwind}
              className="w-full h-full border-0"
              sandbox="allow-scripts"
              title="React Preview"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const handleTypeSelect = (type: 'html' | 'react') => {
    setSelectedType(type);
    const selectedSnippet = snippetTypes.find(t => t.id === type);
    if (selectedSnippet) {
      setCode(selectedSnippet.defaultCode);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handlePublish = () => {
    if (!title.trim() || !code.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Snippet published successfully!');
    // Here you would typically save to your backend
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
    // Here you would typically save as draft to your backend
  };

  if (!selectedType) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Code Snippet
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose the type of code snippet you want to create
          </p>
        </div>

        {/* Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {snippetTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type.id as 'html' | 'react')}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-left hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {type.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {type.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedType(null)}
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create {selectedType === 'html' ? 'HTML + Tailwind' : 'React + Tailwind'} Snippet
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* UI Mode Toggle */}
            <button
              onClick={() => setUiMode(uiMode === 'standard' ? 'advanced' : 'standard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                uiMode === 'advanced'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>{uiMode === 'standard' ? 'Advanced Mode' : 'Standard Mode'}</span>
            </button>

            <button
              onClick={handleSaveDraft}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
            
            <button
              onClick={handlePublish}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
            >
              <Send className="h-4 w-4" />
              <span>Publish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`grid gap-6 h-[calc(100vh-200px)] ${
        uiMode === 'advanced' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'
      }`}>
        {/* Code Editor */}
        <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col ${
          uiMode === 'advanced' ? 'lg:col-span-2' : ''
        }`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Code2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Code Editor</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedType === 'html' ? 'HTML + Tailwind CSS' : 'React + Tailwind CSS'}
              </span>
              {uiMode === 'advanced' && (
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button className="p-1 rounded text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-600 transition-colors">
                    <Palette className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-600 transition-colors">
                    <Layout className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Live Preview</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Viewport Controls */}
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'desktop'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'tablet'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'mobile'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            {createPreview()}
          </div>
        </div>
      </div>

      {/* Snippet Details */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Snippet Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter snippet title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="space-y-3">
              {/* Tags Display */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/20 dark:to-purple-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                    >
                      <Hash className="h-3 w-3 mr-1" />
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Tag Input */}
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Add a tag..."
                  />
                </div>
                <button
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Press Enter or comma to add a tag. Use relevant keywords to help others discover your snippet.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            placeholder="Describe your snippet and what it does..."
          />
        </div>
        
        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublic" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Make this snippet public</span>
            <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">
              Public snippets can be discovered and used by other developers
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreateSnippet;