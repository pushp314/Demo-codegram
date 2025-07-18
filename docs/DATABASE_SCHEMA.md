# Database Schema Documentation

## 🗄️ Database Overview

**Database**: PostgreSQL 14+  
**ORM**: Prisma  
**Migration Tool**: Prisma Migrate  

---

## 📊 Entity Relationship Diagram

```
Users (1) ←→ (M) Repositories
Users (1) ←→ (M) Snippets
Users (1) ←→ (M) Documentation
Users (M) ←→ (M) Follows
Users (M) ←→ (M) Likes
Users (1) ←→ (M) Comments

Snippets (1) ←→ (M) Likes
Snippets (1) ←→ (M) Comments
Documentation (1) ←→ (M) Likes
Documentation (1) ←→ (M) Comments
```

---

## 🏗️ Table Structures

### Users Table
```sql
CREATE TABLE users (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  email               TEXT UNIQUE NOT NULL,
  username            TEXT UNIQUE NOT NULL,
  full_name           TEXT,
  bio                 TEXT,
  avatar_url          TEXT,
  location            TEXT,
  website_url         TEXT,
  company             TEXT,
  blog                TEXT,
  twitter_username    TEXT,
  
  -- GitHub Integration
  github_id           INTEGER UNIQUE,
  github_username     TEXT UNIQUE,
  github_url          TEXT,
  github_followers    INTEGER DEFAULT 0,
  github_following    INTEGER DEFAULT 0,
  github_public_repos INTEGER DEFAULT 0,
  github_public_gists INTEGER DEFAULT 0,
  github_created_at   TIMESTAMP,
  github_updated_at   TIMESTAMP,
  github_hireable     BOOLEAN DEFAULT false,
  github_type         TEXT DEFAULT 'User',
  
  -- App Metadata
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW(),
  last_login          TIMESTAMP,
  is_active           BOOLEAN DEFAULT true,
  
  -- Indexes
  INDEX idx_users_username (username),
  INDEX idx_users_github_id (github_id),
  INDEX idx_users_github_username (github_username),
  INDEX idx_users_email (email),
  INDEX idx_users_created_at (created_at)
);
```

### Repositories Table
```sql
CREATE TABLE repositories (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  github_id           INTEGER UNIQUE NOT NULL,
  name                TEXT NOT NULL,
  full_name           TEXT NOT NULL,
  description         TEXT,
  html_url            TEXT NOT NULL,
  clone_url           TEXT NOT NULL,
  ssh_url             TEXT NOT NULL,
  homepage            TEXT,
  language            TEXT,
  languages_url       TEXT,
  size                INTEGER DEFAULT 0,
  stargazers_count    INTEGER DEFAULT 0,
  watchers_count      INTEGER DEFAULT 0,
  forks_count         INTEGER DEFAULT 0,
  open_issues_count   INTEGER DEFAULT 0,
  is_private          BOOLEAN DEFAULT false,
  is_fork             BOOLEAN DEFAULT false,
  is_archived         BOOLEAN DEFAULT false,
  is_disabled         BOOLEAN DEFAULT false,
  default_branch      TEXT DEFAULT 'main',
  topics              TEXT[] DEFAULT '{}',
  license_name        TEXT,
  license_key         TEXT,
  
  -- GitHub Timestamps
  github_created_at   TIMESTAMP NOT NULL,
  github_updated_at   TIMESTAMP NOT NULL,
  github_pushed_at    TIMESTAMP,
  
  -- App Metadata
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW(),
  
  -- Foreign Keys
  user_id             TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Indexes
  INDEX idx_repositories_user_id (user_id),
  INDEX idx_repositories_github_id (github_id),
  INDEX idx_repositories_language (language),
  INDEX idx_repositories_stargazers_count (stargazers_count),
  INDEX idx_repositories_updated_at (github_updated_at)
);
```

### Snippets Table
```sql
CREATE TABLE snippets (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  description     TEXT,
  code            TEXT NOT NULL,
  language        TEXT NOT NULL,
  is_public       BOOLEAN DEFAULT true,
  tags            TEXT[] DEFAULT '{}',
  
  -- Statistics
  likes_count     INTEGER DEFAULT 0,
  views_count     INTEGER DEFAULT 0,
  comments_count  INTEGER DEFAULT 0,
  
  -- Metadata
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW(),
  
  -- Foreign Keys
  author_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Indexes
  INDEX idx_snippets_author_id (author_id),
  INDEX idx_snippets_language (language),
  INDEX idx_snippets_is_public (is_public),
  INDEX idx_snippets_created_at (created_at),
  INDEX idx_snippets_likes_count (likes_count),
  INDEX idx_snippets_tags (tags) USING GIN
);
```

### Documentation Table
```sql
CREATE TABLE documentation (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  content         TEXT NOT NULL,
  description     TEXT,
  thumbnail_url   TEXT,
  category        TEXT NOT NULL,
  tags            TEXT[] DEFAULT '{}',
  is_public       BOOLEAN DEFAULT true,
  
  -- Statistics
  likes_count     INTEGER DEFAULT 0,
  views_count     INTEGER DEFAULT 0,
  comments_count  INTEGER DEFAULT 0,
  
  -- Metadata
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW(),
  
  -- Foreign Keys
  author_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Indexes
  INDEX idx_documentation_author_id (author_id),
  INDEX idx_documentation_category (category),
  INDEX idx_documentation_is_public (is_public),
  INDEX idx_documentation_created_at (created_at),
  INDEX idx_documentation_likes_count (likes_count),
  INDEX idx_documentation_tags (tags) USING GIN,
  
  -- Full-text search
  INDEX idx_documentation_search (to_tsvector('english', title || ' ' || description || ' ' || content))
);
```

### Follows Table
```sql
CREATE TABLE follows (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id  TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at    TIMESTAMP DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(follower_id, following_id),
  CHECK(follower_id != following_id),
  
  -- Indexes
  INDEX idx_follows_follower_id (follower_id),
  INDEX idx_follows_following_id (following_id),
  INDEX idx_follows_created_at (created_at)
);
```

### Likes Table
```sql
CREATE TABLE likes (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  snippet_id        TEXT REFERENCES snippets(id) ON DELETE CASCADE,
  documentation_id  TEXT REFERENCES documentation(id) ON DELETE CASCADE,
  created_at        TIMESTAMP DEFAULT NOW(),
  
  -- Constraints
  CHECK(
    (snippet_id IS NOT NULL AND documentation_id IS NULL) OR
    (snippet_id IS NULL AND documentation_id IS NOT NULL)
  ),
  UNIQUE(user_id, snippet_id),
  UNIQUE(user_id, documentation_id),
  
  -- Indexes
  INDEX idx_likes_user_id (user_id),
  INDEX idx_likes_snippet_id (snippet_id),
  INDEX idx_likes_documentation_id (documentation_id),
  INDEX idx_likes_created_at (created_at)
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  content           TEXT NOT NULL,
  user_id           TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  snippet_id        TEXT REFERENCES snippets(id) ON DELETE CASCADE,
  documentation_id  TEXT REFERENCES documentation(id) ON DELETE CASCADE,
  parent_id         TEXT REFERENCES comments(id) ON DELETE CASCADE,
  created_at        TIMESTAMP DEFAULT NOW(),
  updated_at        TIMESTAMP DEFAULT NOW(),
  
  -- Constraints
  CHECK(
    (snippet_id IS NOT NULL AND documentation_id IS NULL) OR
    (snippet_id IS NULL AND documentation_id IS NOT NULL)
  ),
  
  -- Indexes
  INDEX idx_comments_user_id (user_id),
  INDEX idx_comments_snippet_id (snippet_id),
  INDEX idx_comments_documentation_id (documentation_id),
  INDEX idx_comments_parent_id (parent_id),
  INDEX idx_comments_created_at (created_at)
);
```

---

## 🔧 Additional Tables for Advanced Features

### Notifications Table
```sql
CREATE TABLE notifications (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL, -- 'follow', 'like', 'comment', 'mention'
  title       TEXT NOT NULL,
  message     TEXT NOT NULL,
  data        JSONB, -- Additional notification data
  is_read     BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_notifications_user_id (user_id),
  INDEX idx_notifications_is_read (is_read),
  INDEX idx_notifications_created_at (created_at),
  INDEX idx_notifications_type (type)
);
```

### User Sessions Table
```sql
CREATE TABLE user_sessions (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  TEXT NOT NULL,
  expires_at  TIMESTAMP NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW(),
  last_used   TIMESTAMP DEFAULT NOW(),
  ip_address  INET,
  user_agent  TEXT,
  
  -- Indexes
  INDEX idx_user_sessions_user_id (user_id),
  INDEX idx_user_sessions_token_hash (token_hash),
  INDEX idx_user_sessions_expires_at (expires_at)
);
```

### Activity Feed Table
```sql
CREATE TABLE activities (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type          TEXT NOT NULL, -- 'create_snippet', 'create_doc', 'follow', 'like'
  object_type   TEXT, -- 'snippet', 'documentation', 'user'
  object_id     TEXT,
  data          JSONB, -- Additional activity data
  created_at    TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_activities_user_id (user_id),
  INDEX idx_activities_type (type),
  INDEX idx_activities_created_at (created_at),
  INDEX idx_activities_object_type_id (object_type, object_id)
);
```

### Bookmarks Table
```sql
CREATE TABLE bookmarks (
  id                TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  snippet_id        TEXT REFERENCES snippets(id) ON DELETE CASCADE,
  documentation_id  TEXT REFERENCES documentation(id) ON DELETE CASCADE,
  created_at        TIMESTAMP DEFAULT NOW(),
  
  -- Constraints
  CHECK(
    (snippet_id IS NOT NULL AND documentation_id IS NULL) OR
    (snippet_id IS NULL AND documentation_id IS NOT NULL)
  ),
  UNIQUE(user_id, snippet_id),
  UNIQUE(user_id, documentation_id),
  
  -- Indexes
  INDEX idx_bookmarks_user_id (user_id),
  INDEX idx_bookmarks_snippet_id (snippet_id),
  INDEX idx_bookmarks_documentation_id (documentation_id),
  INDEX idx_bookmarks_created_at (created_at)
);
```

### Reports Table
```sql
CREATE TABLE reports (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id   TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  content_type  TEXT, -- 'snippet', 'documentation', 'comment'
  content_id    TEXT,
  reason        TEXT NOT NULL, -- 'spam', 'inappropriate', 'copyright'
  description   TEXT,
  status        TEXT DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
  resolved_by   TEXT REFERENCES users(id),
  resolved_at   TIMESTAMP,
  created_at    TIMESTAMP DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_reports_reporter_id (reporter_id),
  INDEX idx_reports_reported_user_id (reported_user_id),
  INDEX idx_reports_status (status),
  INDEX idx_reports_content_type_id (content_type, content_id),
  INDEX idx_reports_created_at (created_at)
);
```

---

## 🚀 Database Functions & Triggers

### Update Counters Function
```sql
-- Function to update like counts
CREATE OR REPLACE FUNCTION update_like_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.snippet_id IS NOT NULL THEN
      UPDATE snippets SET likes_count = likes_count + 1 WHERE id = NEW.snippet_id;
    ELSIF NEW.documentation_id IS NOT NULL THEN
      UPDATE documentation SET likes_count = likes_count + 1 WHERE id = NEW.documentation_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.snippet_id IS NOT NULL THEN
      UPDATE snippets SET likes_count = likes_count - 1 WHERE id = OLD.snippet_id;
    ELSIF OLD.documentation_id IS NOT NULL THEN
      UPDATE documentation SET likes_count = likes_count - 1 WHERE id = OLD.documentation_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for like counts
CREATE TRIGGER trigger_update_like_counts
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW EXECUTE FUNCTION update_like_counts();
```

### Update Comment Counts Function
```sql
-- Function to update comment counts
CREATE OR REPLACE FUNCTION update_comment_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.snippet_id IS NOT NULL THEN
      UPDATE snippets SET comments_count = comments_count + 1 WHERE id = NEW.snippet_id;
    ELSIF NEW.documentation_id IS NOT NULL THEN
      UPDATE documentation SET comments_count = comments_count + 1 WHERE id = NEW.documentation_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.snippet_id IS NOT NULL THEN
      UPDATE snippets SET comments_count = comments_count - 1 WHERE id = OLD.snippet_id;
    ELSIF OLD.documentation_id IS NOT NULL THEN
      UPDATE documentation SET comments_count = comments_count - 1 WHERE id = OLD.documentation_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for comment counts
CREATE TRIGGER trigger_update_comment_counts
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_comment_counts();
```

### Update Timestamps Function
```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_snippets_updated_at
  BEFORE UPDATE ON snippets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_documentation_updated_at
  BEFORE UPDATE ON documentation
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 📊 Views for Common Queries

### User Stats View
```sql
CREATE VIEW user_stats AS
SELECT 
  u.id,
  u.username,
  u.full_name,
  u.avatar_url,
  COUNT(DISTINCT s.id) as snippets_count,
  COUNT(DISTINCT d.id) as docs_count,
  COUNT(DISTINCT f1.id) as followers_count,
  COUNT(DISTINCT f2.id) as following_count,
  COUNT(DISTINCT r.id) as repositories_count
FROM users u
LEFT JOIN snippets s ON u.id = s.author_id AND s.is_public = true
LEFT JOIN documentation d ON u.id = d.author_id AND d.is_public = true
LEFT JOIN follows f1 ON u.id = f1.following_id
LEFT JOIN follows f2 ON u.id = f2.follower_id
LEFT JOIN repositories r ON u.id = r.user_id
GROUP BY u.id, u.username, u.full_name, u.avatar_url;
```

### Popular Content View
```sql
CREATE VIEW popular_content AS
SELECT 
  'snippet' as content_type,
  id,
  title,
  author_id,
  likes_count,
  views_count,
  created_at
FROM snippets
WHERE is_public = true

UNION ALL

SELECT 
  'documentation' as content_type,
  id,
  title,
  author_id,
  likes_count,
  views_count,
  created_at
FROM documentation
WHERE is_public = true

ORDER BY likes_count DESC, views_count DESC;
```

---

## 🔍 Search Indexes

### Full-Text Search Setup
```sql
-- Add search vectors to tables
ALTER TABLE snippets ADD COLUMN search_vector tsvector;
ALTER TABLE documentation ADD COLUMN search_vector tsvector;

-- Update search vectors
UPDATE snippets SET search_vector = to_tsvector('english', title || ' ' || description || ' ' || array_to_string(tags, ' '));
UPDATE documentation SET search_vector = to_tsvector('english', title || ' ' || description || ' ' || content || ' ' || array_to_string(tags, ' '));

-- Create GIN indexes for search
CREATE INDEX idx_snippets_search ON snippets USING GIN(search_vector);
CREATE INDEX idx_documentation_search ON documentation USING GIN(search_vector);

-- Function to update search vectors
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'snippets' THEN
    NEW.search_vector = to_tsvector('english', NEW.title || ' ' || COALESCE(NEW.description, '') || ' ' || array_to_string(NEW.tags, ' '));
  ELSIF TG_TABLE_NAME = 'documentation' THEN
    NEW.search_vector = to_tsvector('english', NEW.title || ' ' || COALESCE(NEW.description, '') || ' ' || NEW.content || ' ' || array_to_string(NEW.tags, ' '));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for search vectors
CREATE TRIGGER trigger_snippets_search_vector
  BEFORE INSERT OR UPDATE ON snippets
  FOR EACH ROW EXECUTE FUNCTION update_search_vector();

CREATE TRIGGER trigger_documentation_search_vector
  BEFORE INSERT OR UPDATE ON documentation
  FOR EACH ROW EXECUTE FUNCTION update_search_vector();
```

---

## 🔧 Database Maintenance

### Cleanup Old Sessions
```sql
-- Delete expired sessions (run daily)
DELETE FROM user_sessions WHERE expires_at < NOW();
```

### Update User Statistics
```sql
-- Update user follower counts (run hourly)
UPDATE users SET 
  github_followers = (
    SELECT COUNT(*) FROM follows WHERE following_id = users.id
  );
```

### Archive Old Activities
```sql
-- Archive activities older than 1 year
CREATE TABLE activities_archive AS 
SELECT * FROM activities WHERE created_at < NOW() - INTERVAL '1 year';

DELETE FROM activities WHERE created_at < NOW() - INTERVAL '1 year';
```

This comprehensive database schema provides a solid foundation for the CodeGram platform with proper indexing, constraints, and maintenance procedures.