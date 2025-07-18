# CodeGram - Core Features Documentation

## 🎯 Project Overview
CodeGram is a social platform for developers that integrates with GitHub to showcase coding activity, share code snippets, create documentation, and build a community around programming knowledge sharing.

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express/Fastify + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: GitHub OAuth + JWT
- **File Storage**: AWS S3 / Cloudinary
- **Real-time**: Socket.io / WebSockets
- **Caching**: Redis
- **Search**: Elasticsearch (optional)

---

## 🔐 1. Authentication & User Management

### 1.1 GitHub OAuth Integration
```typescript
// Required OAuth Scopes
const GITHUB_SCOPES = [
  'user:email',        // Access user email
  'read:user',         // Read user profile
  'public_repo',       // Access public repositories
  'repo'               // Access private repositories (optional)
];
```

**API Endpoints:**
- `POST /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - Handle OAuth callback
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - Logout user
- `DELETE /auth/revoke` - Revoke GitHub access

**Features:**
- GitHub OAuth flow with proper error handling
- JWT token generation and validation
- Automatic user profile creation from GitHub data
- Token refresh mechanism
- Account linking/unlinking

### 1.2 User Profile Management
**API Endpoints:**
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile
- `GET /users/:username` - Get user by username
- `POST /users/sync-github` - Sync GitHub data
- `PUT /users/settings` - Update user settings
- `DELETE /users/me` - Delete user account

**Database Fields:**
```sql
-- From Prisma schema
users (
  id, email, username, full_name, bio, avatar_url,
  github_id, github_username, github_url,
  github_followers, github_following, github_public_repos,
  location, website_url, company, twitter_username,
  created_at, updated_at, last_login, is_active
)
```

---

## 📊 2. GitHub Integration & Data Sync

### 2.1 Repository Synchronization
**API Endpoints:**
- `POST /github/sync/repositories` - Sync user repositories
- `GET /github/repositories` - Get user repositories
- `PUT /github/repositories/:id` - Update repository visibility
- `DELETE /github/repositories/:id` - Remove repository from profile

**Sync Process:**
1. Fetch repositories from GitHub API
2. Compare with existing database records
3. Update/create/delete repositories as needed
4. Calculate language statistics
5. Update user's repository count

**Background Jobs:**
- Daily repository sync for active users
- Weekly full profile sync
- Real-time webhook handling for repository changes

### 2.2 GitHub Statistics & Analytics
**Features:**
- Language usage statistics
- Contribution activity tracking
- Repository performance metrics
- Follower/following growth tracking
- Commit frequency analysis

**API Endpoints:**
- `GET /github/stats/languages` - Get language statistics
- `GET /github/stats/contributions` - Get contribution data
- `GET /github/stats/activity` - Get recent activity
- `GET /github/stats/overview` - Get overview statistics

---

## 💻 3. Code Snippets System

### 3.1 Snippet Management
**API Endpoints:**
- `POST /snippets` - Create new snippet
- `GET /snippets` - List snippets (with filters)
- `GET /snippets/:id` - Get snippet by ID
- `PUT /snippets/:id` - Update snippet
- `DELETE /snippets/:id` - Delete snippet
- `POST /snippets/:id/fork` - Fork snippet

**Features:**
- Code syntax highlighting (server-side)
- Multiple programming languages support
- Live preview for HTML/CSS/JS snippets
- Version control for snippets
- Snippet templates and boilerplates
- Code execution sandbox (optional)

### 3.2 Snippet Interactions
**API Endpoints:**
- `POST /snippets/:id/like` - Like/unlike snippet
- `POST /snippets/:id/bookmark` - Bookmark snippet
- `POST /snippets/:id/comments` - Add comment
- `GET /snippets/:id/comments` - Get comments
- `POST /snippets/:id/share` - Share snippet
- `GET /snippets/:id/analytics` - Get snippet analytics

**Database Relations:**
```sql
snippets -> users (author)
snippets -> likes (many-to-many)
snippets -> comments (one-to-many)
snippets -> bookmarks (many-to-many)
```

---

## 📚 4. Documentation System

### 4.1 Documentation Management
**API Endpoints:**
- `POST /docs` - Create documentation
- `GET /docs` - List documentation (with search/filter)
- `GET /docs/:id` - Get documentation by ID
- `PUT /docs/:id` - Update documentation
- `DELETE /docs/:id` - Delete documentation
- `POST /docs/:id/publish` - Publish documentation

**Features:**
- Markdown support with live preview
- Rich text editor with code blocks
- Table of contents generation
- Cross-referencing between docs
- Version history and drafts
- Collaborative editing (optional)

### 4.2 Documentation Organization
**Features:**
- Categories and subcategories
- Tag-based organization
- Search functionality (full-text search)
- Related documentation suggestions
- Documentation templates
- Export to PDF/HTML

---

## 👥 5. Social Features

### 5.1 Following System
**API Endpoints:**
- `POST /users/:id/follow` - Follow/unfollow user
- `GET /users/:id/followers` - Get user followers
- `GET /users/:id/following` - Get users being followed
- `GET /users/me/feed` - Get personalized feed

**Features:**
- Follow/unfollow users
- Follower/following lists
- Activity feed from followed users
- Follow suggestions based on interests
- Mutual connections

### 5.2 Engagement System
**API Endpoints:**
- `POST /content/:type/:id/like` - Like content
- `POST /content/:type/:id/comment` - Comment on content
- `POST /content/:type/:id/share` - Share content
- `GET /content/:type/:id/engagement` - Get engagement stats

**Features:**
- Like/unlike posts, snippets, documentation
- Nested comments with replies
- Content sharing with custom messages
- Reaction types (like, love, helpful, etc.)
- Engagement analytics

---

## 🔍 6. Search & Discovery

### 6.1 Search System
**API Endpoints:**
- `GET /search` - Global search
- `GET /search/users` - Search users
- `GET /search/snippets` - Search snippets
- `GET /search/docs` - Search documentation
- `GET /search/repositories` - Search repositories

**Features:**
- Full-text search across all content
- Advanced filtering (language, date, author, etc.)
- Search suggestions and autocomplete
- Trending searches
- Search analytics and insights

### 6.2 Discovery Features
**API Endpoints:**
- `GET /discover/trending` - Trending content
- `GET /discover/featured` - Featured content
- `GET /discover/recommendations` - Personalized recommendations
- `GET /discover/topics/:topic` - Content by topic

**Features:**
- Trending algorithms based on engagement
- Personalized content recommendations
- Topic-based content discovery
- Featured content curation
- "Explore" page with curated content

---

## 📱 7. Real-time Features

### 7.1 Live Updates
**WebSocket Events:**
- `new_follower` - New follower notification
- `content_liked` - Content liked notification
- `new_comment` - New comment notification
- `mention` - User mentioned notification
- `repository_updated` - Repository updated

**Features:**
- Real-time notifications
- Live comment updates
- Activity status indicators
- Real-time collaboration on docs
- Live coding sessions (optional)

### 7.2 Notification System
**API Endpoints:**
- `GET /notifications` - Get user notifications
- `PUT /notifications/:id/read` - Mark notification as read
- `PUT /notifications/read-all` - Mark all as read
- `DELETE /notifications/:id` - Delete notification
- `PUT /notifications/settings` - Update notification preferences

**Notification Types:**
- New followers
- Content interactions (likes, comments)
- Mentions in comments
- Repository updates
- System announcements

---

## 📈 8. Analytics & Insights

### 8.1 User Analytics
**API Endpoints:**
- `GET /analytics/profile` - Profile analytics
- `GET /analytics/content` - Content performance
- `GET /analytics/engagement` - Engagement metrics
- `GET /analytics/growth` - Growth statistics

**Metrics:**
- Profile views and visitor analytics
- Content performance (views, likes, shares)
- Follower growth and demographics
- Repository statistics and trends
- Engagement rates and patterns

### 8.2 Platform Analytics (Admin)
**Features:**
- User acquisition and retention
- Content creation trends
- Popular programming languages
- Platform usage statistics
- Performance monitoring

---

## 🛡️ 9. Security & Privacy

### 9.1 Security Features
- JWT token validation and refresh
- Rate limiting on all endpoints
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS protection
- CORS configuration
- Helmet.js security headers

### 9.2 Privacy Controls
**API Endpoints:**
- `PUT /privacy/profile` - Update profile privacy
- `PUT /privacy/repositories` - Update repository visibility
- `PUT /privacy/activity` - Update activity visibility
- `GET /privacy/data` - Export user data
- `DELETE /privacy/data` - Delete user data (GDPR)

**Features:**
- Private/public profile settings
- Repository visibility controls
- Activity privacy settings
- Data export (GDPR compliance)
- Account deletion with data cleanup

---

## 🔧 10. Admin & Moderation

### 10.1 Content Moderation
**API Endpoints:**
- `GET /admin/reports` - Get content reports
- `POST /admin/reports/:id/action` - Take moderation action
- `GET /admin/users` - Manage users
- `PUT /admin/users/:id/status` - Update user status

**Features:**
- Content reporting system
- Automated content filtering
- Manual moderation tools
- User suspension/banning
- Content removal and warnings

### 10.2 Platform Management
**Features:**
- User management dashboard
- Content analytics and insights
- System health monitoring
- Feature flag management
- Announcement system

---

## 🚀 11. Performance & Scalability

### 11.1 Caching Strategy
- Redis for session storage
- API response caching
- Database query optimization
- CDN for static assets
- Image optimization and compression

### 11.2 Database Optimization
- Proper indexing on frequently queried fields
- Database connection pooling
- Query optimization with Prisma
- Read replicas for scaling
- Database backup and recovery

---

## 📋 12. API Design Patterns

### 12.1 RESTful API Standards
```typescript
// Standard response format
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### 12.2 Error Handling
```typescript
// Standard error codes
enum ErrorCodes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  GITHUB_API_ERROR = 'GITHUB_API_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}
```

---

## 🧪 13. Testing Strategy

### 13.1 Testing Types
- Unit tests for business logic
- Integration tests for API endpoints
- Database tests with test containers
- GitHub API mocking for tests
- End-to-end testing with Playwright

### 13.2 Test Coverage
- Authentication flows
- CRUD operations for all entities
- GitHub integration and sync
- Real-time features
- Error handling scenarios

---

## 🚀 14. Deployment & DevOps

### 14.1 Environment Setup
- Development, staging, production environments
- Environment-specific configurations
- Database migrations and seeding
- CI/CD pipeline setup
- Docker containerization

### 14.2 Monitoring & Logging
- Application performance monitoring
- Error tracking and alerting
- Database performance monitoring
- API usage analytics
- Log aggregation and analysis

---

## 📝 15. Development Phases

### Phase 1: Core Foundation (Weeks 1-2)
- Authentication system with GitHub OAuth
- User management and profiles
- Basic GitHub data sync
- Database setup and migrations

### Phase 2: Content Management (Weeks 3-4)
- Code snippets CRUD operations
- Documentation system
- File upload and management
- Basic search functionality

### Phase 3: Social Features (Weeks 5-6)
- Following system
- Likes, comments, and sharing
- Activity feed
- Notification system

### Phase 4: Advanced Features (Weeks 7-8)
- Real-time updates
- Advanced search and discovery
- Analytics and insights
- Admin panel and moderation

### Phase 5: Polish & Launch (Weeks 9-10)
- Performance optimization
- Security hardening
- Testing and bug fixes
- Documentation and deployment

---

This comprehensive feature set provides a solid foundation for building a professional developer social platform with GitHub integration. Each feature is designed to be modular and scalable, allowing for iterative development and future enhancements.