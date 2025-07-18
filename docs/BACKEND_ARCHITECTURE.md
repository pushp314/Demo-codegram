# Backend Architecture Documentation

## 🏗️ System Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │     CDN         │    │   File Storage  │
│   (Nginx/ALB)   │    │  (CloudFlare)   │    │   (AWS S3)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Auth      │  │   Rate      │  │   CORS      │            │
│  │ Middleware  │  │  Limiting   │  │ Middleware  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Application Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Auth      │  │   Users     │  │  Snippets   │            │
│  │  Service    │  │  Service    │  │   Service   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │    Docs     │  │   GitHub    │  │   Social    │            │
│  │  Service    │  │  Service    │  │  Service    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Data Layer                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ PostgreSQL  │  │    Redis    │  │ Elasticsearch│            │
│  │ (Primary)   │  │  (Cache)    │  │  (Search)   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  External Services                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  GitHub     │  │   Email     │  │  Analytics  │            │
│  │    API      │  │  Service    │  │  Service    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Technology Stack

### Core Technologies
```typescript
// Backend Framework
Express.js / Fastify + TypeScript

// Database & ORM
PostgreSQL + Prisma ORM

// Authentication
JWT + GitHub OAuth

// Caching
Redis

// Search
Elasticsearch (optional)

// File Storage
AWS S3 / Cloudinary

// Real-time
Socket.io

// Queue System
Bull Queue + Redis

// Monitoring
Winston (Logging) + Prometheus (Metrics)
```

---

## 📁 Project Structure

```
src/
├── config/                 # Configuration files
│   ├── database.ts
│   ├── redis.ts
│   ├── github.ts
│   └── index.ts
├── controllers/            # Route controllers
│   ├── auth.controller.ts
│   ├── users.controller.ts
│   ├── snippets.controller.ts
│   ├── docs.controller.ts
│   └── github.controller.ts
├── services/              # Business logic
│   ├── auth.service.ts
│   ├── users.service.ts
│   ├── snippets.service.ts
│   ├── docs.service.ts
│   ├── github.service.ts
│   └── notification.service.ts
├── repositories/          # Data access layer
│   ├── base.repository.ts
│   ├── users.repository.ts
│   ├── snippets.repository.ts
│   └── docs.repository.ts
├── middleware/            # Express middleware
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   ├── rateLimit.middleware.ts
│   └── error.middleware.ts
├── routes/               # API routes
│   ├── auth.routes.ts
│   ├── users.routes.ts
│   ├── snippets.routes.ts
│   └── docs.routes.ts
├── types/                # TypeScript types
│   ├── auth.types.ts
│   ├── user.types.ts
│   └── api.types.ts
├── utils/                # Utility functions
│   ├── jwt.utils.ts
│   ├── validation.utils.ts
│   └── github.utils.ts
├── jobs/                 # Background jobs
│   ├── github-sync.job.ts
│   └── email.job.ts
├── websocket/            # WebSocket handlers
│   ├── connection.handler.ts
│   └── notification.handler.ts
└── app.ts               # Application entry point
```

---

## 🔧 Core Services Architecture

### 1. Authentication Service
```typescript
// src/services/auth.service.ts
export class AuthService {
  async githubOAuth(code: string): Promise<AuthResult> {
    // 1. Exchange code for GitHub access token
    // 2. Fetch user data from GitHub
    // 3. Create or update user in database
    // 4. Generate JWT tokens
    // 5. Return user data and tokens
  }

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    // 1. Validate refresh token
    // 2. Generate new access token
    // 3. Return new token pair
  }

  async validateToken(token: string): Promise<User> {
    // 1. Verify JWT signature
    // 2. Check token expiration
    // 3. Return user data
  }
}
```

### 2. GitHub Integration Service
```typescript
// src/services/github.service.ts
export class GitHubService {
  async syncUserRepositories(userId: string): Promise<SyncResult> {
    // 1. Fetch repositories from GitHub API
    // 2. Compare with existing database records
    // 3. Update/create/delete repositories
    // 4. Calculate language statistics
    // 5. Update user statistics
  }

  async syncUserProfile(userId: string): Promise<User> {
    // 1. Fetch user profile from GitHub
    // 2. Update user record in database
    // 3. Return updated user data
  }

  async getContributions(username: string): Promise<Contribution[]> {
    // 1. Fetch contribution data from GitHub
    // 2. Process and format data
    // 3. Cache results
  }
}
```

### 3. Content Management Service
```typescript
// src/services/snippets.service.ts
export class SnippetsService {
  async createSnippet(data: CreateSnippetData): Promise<Snippet> {
    // 1. Validate input data
    // 2. Process code content
    // 3. Extract metadata (language, tags)
    // 4. Save to database
    // 5. Index for search
  }

  async getSnippets(filters: SnippetFilters): Promise<PaginatedResult<Snippet>> {
    // 1. Build query with filters
    // 2. Apply pagination
    // 3. Execute database query
    // 4. Return formatted results
  }

  async likeSnippet(userId: string, snippetId: string): Promise<LikeResult> {
    // 1. Check if already liked
    // 2. Toggle like status
    // 3. Update like count
    // 4. Create notification
    // 5. Return updated status
  }
}
```

---

## 🗄️ Repository Pattern

### Base Repository
```typescript
// src/repositories/base.repository.ts
export abstract class BaseRepository<T> {
  constructor(protected prisma: PrismaClient) {}

  abstract create(data: any): Promise<T>;
  abstract findById(id: string): Promise<T | null>;
  abstract update(id: string, data: any): Promise<T>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(filters: any): Promise<T[]>;
}
```

### User Repository
```typescript
// src/repositories/users.repository.ts
export class UsersRepository extends BaseRepository<User> {
  async create(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findByGithubId(githubId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { github_id: githubId }
    });
  }

  async updateGithubData(userId: string, data: GitHubUserData): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        github_followers: data.followers,
        github_following: data.following,
        github_public_repos: data.public_repos,
        // ... other GitHub fields
      }
    });
  }
}
```

---

## 🔐 Authentication & Authorization

### JWT Strategy
```typescript
// src/utils/jwt.utils.ts
export class JWTUtils {
  static generateTokens(user: User): TokenPair {
    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  static verifyAccessToken(token: string): JWTPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  }
}
```

### Auth Middleware
```typescript
// src/middleware/auth.middleware.ts
export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const payload = JWTUtils.verifyAccessToken(token);
    const user = await usersRepository.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

## 📊 Database Layer

### Prisma Configuration
```typescript
// src/config/database.ts
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

// Connection management
export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await prisma.$disconnect();
};
```

### Query Optimization
```typescript
// src/repositories/snippets.repository.ts
export class SnippetsRepository extends BaseRepository<Snippet> {
  async findWithFilters(filters: SnippetFilters): Promise<PaginatedResult<Snippet>> {
    const where: Prisma.SnippetWhereInput = {
      is_public: true,
      ...(filters.language && { language: filters.language }),
      ...(filters.tags && { tags: { hasSome: filters.tags } }),
      ...(filters.author && { 
        author: { username: { contains: filters.author, mode: 'insensitive' } }
      }),
    };

    const [snippets, total] = await Promise.all([
      this.prisma.snippet.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              full_name: true,
              avatar_url: true,
            }
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            }
          }
        },
        orderBy: this.buildOrderBy(filters.sort),
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
      }),
      this.prisma.snippet.count({ where }),
    ]);

    return {
      data: snippets,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(total / filters.limit),
      }
    };
  }
}
```

---

## 🚀 Background Jobs

### Job Queue Setup
```typescript
// src/jobs/queue.ts
import Bull from 'bull';
import { redisConfig } from '../config/redis';

export const githubSyncQueue = new Bull('github-sync', {
  redis: redisConfig,
  defaultJobOptions: {
    removeOnComplete: 10,
    removeOnFail: 5,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
});

// Job processors
githubSyncQueue.process('sync-repositories', async (job) => {
  const { userId } = job.data;
  await githubService.syncUserRepositories(userId);
});

githubSyncQueue.process('sync-profile', async (job) => {
  const { userId } = job.data;
  await githubService.syncUserProfile(userId);
});
```

### Scheduled Jobs
```typescript
// src/jobs/scheduler.ts
import cron from 'node-cron';

// Daily repository sync for active users
cron.schedule('0 2 * * *', async () => {
  const activeUsers = await usersRepository.findActiveUsers();
  
  for (const user of activeUsers) {
    await githubSyncQueue.add('sync-repositories', { userId: user.id });
  }
});

// Weekly full profile sync
cron.schedule('0 3 * * 0', async () => {
  const users = await usersRepository.findUsersWithGithub();
  
  for (const user of users) {
    await githubSyncQueue.add('sync-profile', { userId: user.id });
  }
});
```

---

## 🔄 Real-time Features

### WebSocket Setup
```typescript
// src/websocket/server.ts
import { Server } from 'socket.io';
import { authenticateSocket } from './middleware';

export const setupWebSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.use(authenticateSocket);

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.username} connected`);

    // Join user-specific room
    socket.join(`user:${socket.user.id}`);

    // Handle real-time events
    socket.on('join-room', (room) => {
      socket.join(room);
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.user.username} disconnected`);
    });
  });

  return io;
};
```

### Notification System
```typescript
// src/services/notification.service.ts
export class NotificationService {
  constructor(private io: Server) {}

  async createNotification(data: CreateNotificationData): Promise<void> {
    // 1. Save notification to database
    const notification = await this.prisma.notification.create({ data });

    // 2. Send real-time notification
    this.io.to(`user:${data.user_id}`).emit('notification', notification);

    // 3. Send push notification (if enabled)
    await this.sendPushNotification(notification);
  }

  async notifyNewFollower(followerId: string, followingId: string): Promise<void> {
    const follower = await usersRepository.findById(followerId);
    
    await this.createNotification({
      user_id: followingId,
      type: 'follow',
      title: 'New Follower',
      message: `${follower.username} started following you`,
      data: { follower_id: followerId },
    });
  }
}
```

---

## 🔍 Search Implementation

### Elasticsearch Integration
```typescript
// src/services/search.service.ts
import { Client } from '@elastic/elasticsearch';

export class SearchService {
  private client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
    });
  }

  async indexSnippet(snippet: Snippet): Promise<void> {
    await this.client.index({
      index: 'snippets',
      id: snippet.id,
      body: {
        title: snippet.title,
        description: snippet.description,
        code: snippet.code,
        language: snippet.language,
        tags: snippet.tags,
        author: snippet.author.username,
        created_at: snippet.created_at,
        likes_count: snippet.likes_count,
      },
    });
  }

  async searchContent(query: string, filters: SearchFilters): Promise<SearchResult> {
    const searchQuery = {
      index: ['snippets', 'documentation'],
      body: {
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query,
                  fields: ['title^3', 'description^2', 'content', 'tags'],
                  type: 'best_fields',
                },
              },
            ],
            filter: this.buildFilters(filters),
          },
        },
        highlight: {
          fields: {
            title: {},
            description: {},
            content: { fragment_size: 150 },
          },
        },
        sort: this.buildSort(filters.sort),
        from: (filters.page - 1) * filters.limit,
        size: filters.limit,
      },
    };

    const response = await this.client.search(searchQuery);
    return this.formatSearchResults(response);
  }
}
```

---

## 📈 Monitoring & Logging

### Logging Setup
```typescript
// src/utils/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'codegram-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

### Error Handling
```typescript
// src/middleware/error.middleware.ts
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Unhandled error:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    user: req.user?.id,
  });

  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message,
        details: error.details,
      },
    });
  }

  if (error instanceof AuthenticationError) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      },
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    },
  });
};
```

---

## 🚀 Deployment Architecture

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@postgres:5432/codegram
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: codegram
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

This comprehensive backend architecture provides a scalable, maintainable foundation for the CodeGram platform with proper separation of concerns, error handling, and monitoring capabilities.