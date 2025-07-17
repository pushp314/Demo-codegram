import { GitHubUser, GitHubRepository, GitHubLanguageStats } from '../types/github';

class GitHubService {
  private baseUrl = 'https://api.github.com';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'CodeGram-App',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUser(username?: string): Promise<GitHubUser> {
    const endpoint = username ? `/users/${username}` : '/user';
    return this.makeRequest<GitHubUser>(endpoint);
  }

  async getUserRepositories(username: string, options: {
    type?: 'all' | 'owner' | 'member';
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  } = {}): Promise<GitHubRepository[]> {
    const params = new URLSearchParams();
    
    Object.entries(options).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    const endpoint = `/users/${username}/repos${queryString ? `?${queryString}` : ''}`;
    
    return this.makeRequest<GitHubRepository[]>(endpoint);
  }

  async getRepositoryLanguages(owner: string, repo: string): Promise<GitHubLanguageStats> {
    return this.makeRequest<GitHubLanguageStats>(`/repos/${owner}/${repo}/languages`);
  }

  async getUserLanguageStats(username: string): Promise<GitHubLanguageStats> {
    const repos = await this.getUserRepositories(username, { 
      type: 'owner', 
      per_page: 100 
    });
    
    const languageStats: GitHubLanguageStats = {};
    
    // Get language stats for each repository
    const languagePromises = repos.map(async (repo) => {
      try {
        const repoLanguages = await this.getRepositoryLanguages(repo.owner.login, repo.name);
        return repoLanguages;
      } catch (error) {
        console.warn(`Failed to fetch languages for ${repo.name}:`, error);
        return {};
      }
    });

    const allLanguages = await Promise.all(languagePromises);
    
    // Aggregate language statistics
    allLanguages.forEach((repoLanguages) => {
      Object.entries(repoLanguages).forEach(([language, bytes]) => {
        languageStats[language] = (languageStats[language] || 0) + bytes;
      });
    });

    return languageStats;
  }

  async getRepositoryContributors(owner: string, repo: string): Promise<any[]> {
    return this.makeRequest<any[]>(`/repos/${owner}/${repo}/contributors`);
  }

  async getUserEvents(username: string, per_page: number = 30): Promise<any[]> {
    return this.makeRequest<any[]>(`/users/${username}/events/public?per_page=${per_page}`);
  }

  // Mock contribution data since GitHub's contribution graph API is not public
  generateMockContributions(): { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] {
    const contributions = [];
    const today = new Date();
    
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const count = Math.floor(Math.random() * 10);
      const level = count === 0 ? 0 : 
                   count <= 2 ? 1 : 
                   count <= 4 ? 2 : 
                   count <= 6 ? 3 : 4;
      
      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
        level: level as 0 | 1 | 2 | 3 | 4
      });
    }
    
    return contributions;
  }
}

export const githubService = new GitHubService();