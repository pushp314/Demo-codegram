# API Endpoints Documentation

## Base URL
```
Development: http://localhost:3000/api/v1
Production: https://api.codegram.dev/v1
```

## Authentication Headers
```typescript
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 🔐 Authentication Endpoints

### GitHub OAuth
```typescript
POST /auth/github
// Initiate GitHub OAuth flow
Response: { authUrl: string }

GET /auth/github/callback?code=<code>&state=<state>
// Handle GitHub OAuth callback
Response: { 
  user: User, 
  token: string, 
  refreshToken: string 
}

POST /auth/refresh
Body: { refreshToken: string }
Response: { token: string, refreshToken: string }

POST /auth/logout
Headers: Authorization required
Response: { success: boolean }

DELETE /auth/revoke
Headers: Authorization required
Response: { success: boolean }
```

---

## 👤 User Management

### Profile Operations
```typescript
GET /users/me
Headers: Authorization required
Response: User

PUT /users/me
Headers: Authorization required
Body: {
  full_name?: string;
  bio?: string;
  location?: string;
  website_url?: string;
  twitter_username?: string;
}
Response: User

GET /users/:username
Response: PublicUser

DELETE /users/me
Headers: Authorization required
Response: { success: boolean }
```

### GitHub Integration
```typescript
POST /users/sync-github
Headers: Authorization required
Response: { 
  repositories: number;
  languages: Record<string, number>;
  updated_at: string;
}

GET /users/:username/github-stats
Response: {
  repositories: Repository[];
  languages: Record<string, number>;
  contributions: Contribution[];
  stats: {
    public_repos: number;
    followers: number;
    following: number;
    public_gists: number;
  };
}
```

---

## 💻 Code Snippets

### CRUD Operations
```typescript
POST /snippets
Headers: Authorization required
Body: {
  title: string;
  description?: string;
  code: string;
  language: string;
  tags?: string[];
  is_public?: boolean;
}
Response: Snippet

GET /snippets
Query: {
  page?: number;
  limit?: number;
  language?: string;
  tags?: string[];
  author?: string;
  sort?: 'latest' | 'popular' | 'trending';
}
Response: {
  snippets: Snippet[];
  pagination: PaginationInfo;
}

GET /snippets/:id
Response: SnippetWithDetails

PUT /snippets/:id
Headers: Authorization required
Body: Partial<SnippetCreateData>
Response: Snippet

DELETE /snippets/:id
Headers: Authorization required
Response: { success: boolean }
```

### Snippet Interactions
```typescript
POST /snippets/:id/like
Headers: Authorization required
Response: { liked: boolean, likes_count: number }

POST /snippets/:id/bookmark
Headers: Authorization required
Response: { bookmarked: boolean }

POST /snippets/:id/fork
Headers: Authorization required
Body: { title?: string, description?: string }
Response: Snippet

GET /snippets/:id/comments
Query: { page?: number, limit?: number }
Response: {
  comments: Comment[];
  pagination: PaginationInfo;
}

POST /snippets/:id/comments
Headers: Authorization required
Body: { content: string, parent_id?: string }
Response: Comment
```

---

## 📚 Documentation

### Document Management
```typescript
POST /docs
Headers: Authorization required
Body: {
  title: string;
  content: string;
  description?: string;
  category: string;
  tags?: string[];
  is_public?: boolean;
  thumbnail_url?: string;
}
Response: Documentation

GET /docs
Query: {
  page?: number;
  limit?: number;
  category?: string;
  tags?: string[];
  author?: string;
  sort?: 'latest' | 'popular' | 'trending';
  search?: string;
}
Response: {
  docs: Documentation[];
  pagination: PaginationInfo;
}

GET /docs/:id
Response: DocumentationWithDetails

PUT /docs/:id
Headers: Authorization required
Body: Partial<DocumentationCreateData>
Response: Documentation

DELETE /docs/:id
Headers: Authorization required
Response: { success: boolean }
```

### Documentation Interactions
```typescript
POST /docs/:id/like
Headers: Authorization required
Response: { liked: boolean, likes_count: number }

POST /docs/:id/comments
Headers: Authorization required
Body: { content: string, parent_id?: string }
Response: Comment

GET /docs/:id/comments
Query: { page?: number, limit?: number }
Response: {
  comments: Comment[];
  pagination: PaginationInfo;
}
```

---

## 👥 Social Features

### Following System
```typescript
POST /users/:id/follow
Headers: Authorization required
Response: { following: boolean, followers_count: number }

GET /users/:id/followers
Query: { page?: number, limit?: number }
Response: {
  users: PublicUser[];
  pagination: PaginationInfo;
}

GET /users/:id/following
Query: { page?: number, limit?: number }
Response: {
  users: PublicUser[];
  pagination: PaginationInfo;
}

GET /users/me/feed
Headers: Authorization required
Query: { page?: number, limit?: number }
Response: {
  activities: Activity[];
  pagination: PaginationInfo;
}
```

### Activity Feed
```typescript
GET /activities
Headers: Authorization required
Query: {
  page?: number;
  limit?: number;
  type?: 'snippet' | 'documentation' | 'follow' | 'like' | 'comment';
  user_id?: string;
}
Response: {
  activities: Activity[];
  pagination: PaginationInfo;
}
```

---

## 🔍 Search & Discovery

### Search Endpoints
```typescript
GET /search
Query: {
  q: string;
  type?: 'all' | 'users' | 'snippets' | 'docs' | 'repositories';
  page?: number;
  limit?: number;
  filters?: {
    language?: string;
    tags?: string[];
    date_range?: 'day' | 'week' | 'month' | 'year';
  };
}
Response: {
  results: SearchResult[];
  pagination: PaginationInfo;
  facets: SearchFacets;
}

GET /search/suggestions
Query: { q: string }
Response: { suggestions: string[] }
```

### Discovery
```typescript
GET /discover/trending
Query: {
  type?: 'snippets' | 'docs' | 'users';
  timeframe?: 'day' | 'week' | 'month';
  language?: string;
}
Response: TrendingContent[]

GET /discover/featured
Response: FeaturedContent[]

GET /discover/recommendations
Headers: Authorization required
Query: { type?: 'snippets' | 'docs' | 'users' }
Response: RecommendedContent[]
```

---

## 🔔 Notifications

### Notification Management
```typescript
GET /notifications
Headers: Authorization required
Query: {
  page?: number;
  limit?: number;
  type?: NotificationType;
  read?: boolean;
}
Response: {
  notifications: Notification[];
  pagination: PaginationInfo;
  unread_count: number;
}

PUT /notifications/:id/read
Headers: Authorization required
Response: { success: boolean }

PUT /notifications/read-all
Headers: Authorization required
Response: { success: boolean }

DELETE /notifications/:id
Headers: Authorization required
Response: { success: boolean }
```

### Notification Settings
```typescript
GET /notifications/settings
Headers: Authorization required
Response: NotificationSettings

PUT /notifications/settings
Headers: Authorization required
Body: Partial<NotificationSettings>
Response: NotificationSettings
```

---

## 📊 Analytics

### User Analytics
```typescript
GET /analytics/profile
Headers: Authorization required
Query: { period?: 'week' | 'month' | 'year' }
Response: {
  profile_views: number;
  followers_growth: number[];
  content_performance: {
    snippets: { views: number, likes: number };
    docs: { views: number, likes: number };
  };
}

GET /analytics/content/:type/:id
Headers: Authorization required
Response: {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  view_history: { date: string, views: number }[];
}
```

---

## 🛡️ Privacy & Security

### Privacy Settings
```typescript
GET /privacy/settings
Headers: Authorization required
Response: PrivacySettings

PUT /privacy/settings
Headers: Authorization required
Body: Partial<PrivacySettings>
Response: PrivacySettings

GET /privacy/data-export
Headers: Authorization required
Response: { download_url: string, expires_at: string }

DELETE /privacy/data
Headers: Authorization required
Body: { confirmation: string }
Response: { success: boolean }
```

---

## 🔧 Admin Endpoints

### Content Moderation
```typescript
GET /admin/reports
Headers: Admin Authorization required
Query: {
  status?: 'pending' | 'resolved' | 'dismissed';
  type?: 'spam' | 'inappropriate' | 'copyright';
  page?: number;
  limit?: number;
}
Response: {
  reports: Report[];
  pagination: PaginationInfo;
}

POST /admin/reports/:id/action
Headers: Admin Authorization required
Body: {
  action: 'dismiss' | 'remove_content' | 'warn_user' | 'suspend_user';
  reason?: string;
}
Response: { success: boolean }
```

### User Management
```typescript
GET /admin/users
Headers: Admin Authorization required
Query: {
  status?: 'active' | 'suspended' | 'banned';
  search?: string;
  page?: number;
  limit?: number;
}
Response: {
  users: AdminUser[];
  pagination: PaginationInfo;
}

PUT /admin/users/:id/status
Headers: Admin Authorization required
Body: {
  status: 'active' | 'suspended' | 'banned';
  reason?: string;
  duration?: number; // days
}
Response: { success: boolean }
```

---

## 📱 WebSocket Events

### Real-time Events
```typescript
// Client -> Server
'join_room': { room: string }
'leave_room': { room: string }
'typing_start': { room: string }
'typing_stop': { room: string }

// Server -> Client
'notification': Notification
'new_follower': { user: PublicUser }
'content_liked': { content_type: string, content_id: string, user: PublicUser }
'new_comment': { comment: Comment, content_type: string, content_id: string }
'user_online': { user_id: string }
'user_offline': { user_id: string }
'typing': { user: PublicUser, room: string }
```

---

## 📋 Response Types

### Standard Response Format
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: PaginationInfo;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### Error Codes
```typescript
enum ErrorCodes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  GITHUB_API_ERROR = 'GITHUB_API_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}
```

---

## 🚀 Rate Limiting

### Rate Limits by Endpoint Type
```typescript
// Authentication endpoints: 5 requests per minute
// Search endpoints: 100 requests per minute
// CRUD operations: 1000 requests per hour
// Real-time endpoints: 10000 requests per hour
// GitHub sync: 10 requests per hour per user
```

### Rate Limit Headers
```typescript
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
X-RateLimit-RetryAfter: 60 // seconds (only when rate limited)
```

This comprehensive API documentation provides all the endpoints needed to build the complete CodeGram platform with GitHub integration.