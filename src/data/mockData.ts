export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  bio: string;
  avatar_url: string;
  github_url?: string;
  twitter_url?: string;
  website_url?: string;
  location?: string;
  created_at: string;
  followers_count: number;
  following_count: number;
  snippets_count: number;
  docs_count: number;
}

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  is_public: boolean;
  author: User;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  views_count: number;
  tags: string[];
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Bug {
  id: string;
  title: string;
  description: string;
  code?: string;
  language?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'solved' | 'closed';
  author: User;
  created_at: string;
  expires_at: string;
  likes_count: number;
  comments_count: number;
  tags: string[];
}

export interface Documentation {
  id: string;
  title: string;
  content: string;
  description: string;
  thumbnail_url: string;
  category: string;
  author: User;
  created_at: string;
  updated_at: string;
  likes_count: number;
  views_count: number;
  tags: string[];
  is_public: boolean;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alexdev',
    email: 'alex@example.com',
    full_name: 'Alex Johnson',
    bio: 'Frontend developer passionate about React and beautiful UI components. Building the future one component at a time.',
    avatar_url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    github_url: 'https://github.com/alexdev',
    twitter_url: 'https://twitter.com/alexdev',
    location: 'San Francisco, CA',
    created_at: '2024-01-15T10:30:00Z',
    followers_count: 1234,
    following_count: 567,
    snippets_count: 89,
    docs_count: 23
  },
  {
    id: '2',
    username: 'sarah_ui',
    email: 'sarah@example.com',
    full_name: 'Sarah Chen',
    bio: 'UI/UX designer & React developer. Love creating beautiful, accessible components with Tailwind CSS.',
    avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    github_url: 'https://github.com/sarahui',
    location: 'New York, NY',
    created_at: '2024-02-20T14:15:00Z',
    followers_count: 892,
    following_count: 234,
    snippets_count: 156,
    docs_count: 45
  },
  {
    id: '3',
    username: 'mike_frontend',
    email: 'mike@example.com',
    full_name: 'Mike Rodriguez',
    bio: 'Frontend wizard specializing in React, Vue, and modern CSS. Design systems advocate.',
    avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    website_url: 'https://mikerodriguez.dev',
    location: 'Austin, TX',
    created_at: '2024-03-10T09:45:00Z',
    followers_count: 2156,
    following_count: 445,
    snippets_count: 234,
    docs_count: 67
  }
];

// Mock Snippets - Only HTML+Tailwind and React+Tailwind
export const mockSnippets: Snippet[] = [
  {
    id: '1',
    title: 'Beautiful Gradient Button Component',
    description: 'A stunning gradient button with hover effects and multiple variants using Tailwind CSS.',
    code: `<button class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 group">
  <span class="absolute top-0 right-0 w-8 h-8 -mt-1 -mr-1 transition-all duration-1000 ease-in-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-10"></span>
  <span class="relative">Get Started</span>
</button>

<!-- Variant with icon -->
<button class="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:from-blue-600 hover:to-cyan-600 group">
  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
  </svg>
  <span class="relative">Add Item</span>
</button>`,
    language: 'html',
    is_public: true,
    author: mockUsers[0],
    created_at: '2024-06-28T10:30:00Z',
    updated_at: '2024-06-28T10:30:00Z',
    likes_count: 142,
    comments_count: 18,
    views_count: 834,
    tags: ['button', 'gradient', 'tailwind', 'ui', 'component'],
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '2',
    title: 'React Card Component with Tailwind',
    description: 'A flexible and reusable card component built with React and styled with Tailwind CSS.',
    code: `import React from 'react';

const Card = ({ 
  title, 
  description, 
  image, 
  badge, 
  onAction, 
  actionText = "Learn More" 
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {image && (
        <div className="relative">
          <img 
            className="w-full h-48 object-cover" 
            src={image} 
            alt={title} 
          />
          {badge && (
            <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {badge}
            </span>
          )}
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        
        <button 
          onClick={onAction}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
};

// Usage Example
const App = () => {
  return (
    <Card
      title="Amazing Product"
      description="This is an amazing product that will change your life forever. Get it now!"
      image="https://via.placeholder.com/400x200"
      badge="New"
      onAction={() => alert('Action clicked!')}
      actionText="Buy Now"
    />
  );
};

export default Card;`,
    language: 'jsx',
    is_public: true,
    author: mockUsers[1],
    created_at: '2024-06-27T15:45:00Z',
    updated_at: '2024-06-27T15:45:00Z',
    likes_count: 89,
    comments_count: 12,
    views_count: 456,
    tags: ['react', 'card', 'component', 'tailwind', 'ui'],
    isLiked: true,
    isBookmarked: false
  },
  {
    id: '3',
    title: 'Responsive Navigation Menu',
    description: 'A beautiful responsive navigation menu with mobile hamburger toggle using pure HTML and Tailwind CSS.',
    code: `<nav class="bg-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
        <span class="text-xl font-bold text-gray-800">Brand</span>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
        <button class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
          Get Started
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button id="mobile-menu-button" class="text-gray-700 hover:text-blue-600 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="md:hidden hidden pb-4">
      <div class="flex flex-col space-y-4">
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
        <button class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 w-full">
          Get Started
        </button>
      </div>
    </div>
  </div>
</nav>

<script>
  // Mobile menu toggle
  document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
  });
</script>`,
    language: 'html',
    is_public: true,
    author: mockUsers[2],
    created_at: '2024-06-26T09:20:00Z',
    updated_at: '2024-06-26T09:20:00Z',
    likes_count: 156,
    comments_count: 24,
    views_count: 1023,
    tags: ['navigation', 'responsive', 'menu', 'tailwind', 'mobile'],
    isLiked: false,
    isBookmarked: true
  },
  {
    id: '4',
    title: 'React Modal Component',
    description: 'A beautiful and accessible modal component with backdrop blur and smooth animations.',
    code: `import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Usage Example
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Action"
      >
        <p className="text-gray-600">
          Are you sure you want to perform this action? This cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default Modal;`,
    language: 'jsx',
    is_public: true,
    author: mockUsers[0],
    created_at: '2024-06-25T14:10:00Z',
    updated_at: '2024-06-25T14:10:00Z',
    likes_count: 203,
    comments_count: 31,
    views_count: 1456,
    tags: ['react', 'modal', 'component', 'tailwind', 'accessibility'],
    isLiked: true,
    isBookmarked: true
  }
];

// Mock Bugs
export const mockBugs: Bug[] = [
  {
    id: '1',
    title: 'React useEffect infinite loop with dependency array',
    description: 'I\'m experiencing an infinite loop in my useEffect hook even though I have a dependency array. The effect keeps running continuously.',
    code: `useEffect(() => {
  fetchUserData(userId).then(data => {
    setUser(data);
    setPreferences(data.preferences);
  });
}, [userId, setUser, setPreferences]);`,
    language: 'javascript',
    priority: 'medium',
    status: 'open',
    author: mockUsers[2],
    created_at: '2024-06-28T16:30:00Z',
    expires_at: '2024-06-29T16:30:00Z',
    likes_count: 12,
    comments_count: 8,
    tags: ['react', 'hooks', 'infinite-loop', 'useeffect']
  },
  {
    id: '2',
    title: 'Tailwind CSS not applying hover styles',
    description: 'My hover styles are not working in production build even though they work in development.',
    code: `<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>`,
    language: 'jsx',
    priority: 'high',
    status: 'solved',
    author: mockUsers[1],
    created_at: '2024-06-28T12:15:00Z',
    expires_at: '2024-06-29T12:15:00Z',
    likes_count: 25,
    comments_count: 15,
    tags: ['tailwind', 'css', 'hover', 'production']
  }
];

// Mock Documentation
export const mockDocumentation: Documentation[] = [
  {
    id: '1',
    title: 'Building Beautiful UI Components with Tailwind CSS',
    content: `# Building Beautiful UI Components with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.

## Getting Started

### Installation

\`\`\`bash
npm install -D tailwindcss
npx tailwindcss init
\`\`\`

### Configuration

\`\`\`js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

## Core Concepts

### Utility Classes
Tailwind provides thousands of utility classes that map to CSS properties:

- \`text-center\` → \`text-align: center\`
- \`bg-blue-500\` → \`background-color: #3b82f6\`
- \`p-4\` → \`padding: 1rem\`

### Responsive Design
Use responsive prefixes to apply styles at different breakpoints:

\`\`\`html
<div class="text-center md:text-left lg:text-right">
  Responsive text alignment
</div>
\`\`\`

## Best Practices

1. **Use component extraction** for repeated patterns
2. **Leverage @apply directive** for complex components
3. **Customize your design system** in the config file
4. **Use JIT mode** for better performance

## Example Component

\`\`\`html
<div class="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" src="/img/building.jpg" alt="Building">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
      <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
    </div>
  </div>
</div>
\`\`\`

This creates a beautiful card component with responsive design and hover effects.`,
    description: 'A comprehensive guide to building beautiful UI components using Tailwind CSS utility classes.',
    thumbnail_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'CSS',
    author: mockUsers[0],
    created_at: '2024-06-20T10:00:00Z',
    updated_at: '2024-06-25T14:30:00Z',
    likes_count: 234,
    views_count: 1567,
    tags: ['tailwind', 'css', 'ui', 'components', 'design'],
    is_public: true
  }
];

// Current user (for demo purposes)
export const currentUser: User = mockUsers[0];