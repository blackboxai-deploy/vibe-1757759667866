export interface Post {
  id: string;
  content: string;
  category: string;
  anonymousName: string;
  timestamp: string;
  reactions: {
    support: number;
    relate: number;
    care: number;
  };
  comments: number;
  tags: string[];
  userId?: string; // For internal tracking (not exposed)
}

// In-memory store for demo purposes
// In production, this would be a proper database
class PostsStore {
  private posts: Post[] = [
    {
      id: "1",
      content: "I've been struggling with anxiety for months but haven't told anyone. Sometimes I feel like I'm drowning in my own thoughts and I don't know how to reach out for help.",
      category: "health",
      anonymousName: "QuietSoul",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      reactions: { support: 24, relate: 18, care: 12 },
      comments: 8,
      tags: ["anxiety", "mental-health", "support"]
    },
    {
      id: "2", 
      content: "I secretly wish my parents would be proud of me just once. I've achieved so much but they never seem to notice or care.",
      category: "family",
      anonymousName: "HopefulHeart",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      reactions: { support: 31, relate: 45, care: 28 },
      comments: 15,
      tags: ["family", "validation", "parents"]
    },
    {
      id: "3",
      content: "I quit my high-paying job to pursue my passion and I'm terrified I made a huge mistake. Everyone thinks I'm crazy.",
      category: "work",
      anonymousName: "DreamChaser", 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      reactions: { support: 67, relate: 23, care: 19 },
      comments: 22,
      tags: ["career", "passion", "courage"]
    },
    {
      id: "4",
      content: "I've never felt truly loved by anyone and I'm starting to think there's something fundamentally wrong with me.",
      category: "relationships",
      anonymousName: "LonelyWanderer",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      reactions: { support: 89, relate: 34, care: 56 },
      comments: 31,
      tags: ["loneliness", "self-worth", "love"]
    },
    {
      id: "5",
      content: "I pretend to be happy all the time but inside I feel empty. I don't want to burden others with my problems.",
      category: "personal",
      anonymousName: "MaskedSmile",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      reactions: { support: 76, relate: 92, care: 41 },
      comments: 28,
      tags: ["depression", "facade", "authenticity"]
    }
  ];

  private generateAnonymousName(): string {
    const adjectives = [
      "Brave", "Kind", "Wise", "Gentle", "Strong", "Peaceful", "Hopeful",
      "Caring", "Thoughtful", "Quiet", "Bold", "Sincere", "Honest", "True",
      "Deep", "Bright", "Calm", "Free", "Open", "Pure"
    ];
    
    const nouns = [
      "Heart", "Soul", "Mind", "Spirit", "Voice", "Light", "Hope", "Dream",
      "Journey", "Path", "Story", "Truth", "Seeker", "Wanderer", "Explorer",
      "Guardian", "Healer", "Listener", "Friend", "Companion"
    ];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 1000);
    
    return `${adjective}${noun}${number}`;
  }

  getAllPosts(filters: {
    category?: string;
    search?: string;
    sort?: string;
  } = {}): Post[] {
    let filtered = [...this.posts];

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(post => post.category === filters.category);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort posts
    switch (filters.sort) {
      case 'popular':
        filtered.sort((a, b) => 
          (b.reactions.support + b.reactions.relate + b.reactions.care) - 
          (a.reactions.support + a.reactions.relate + a.reactions.care)
        );
        break;
      case 'discussed':
        filtered.sort((a, b) => b.comments - a.comments);
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
    }

    return filtered;
  }

  createPost(postData: {
    content: string;
    category: string;
    tags: string[];
    userId?: string;
  }): Post {
    const newPost: Post = {
      id: Date.now().toString(),
      content: postData.content.trim(),
      category: postData.category,
      tags: postData.tags.slice(0, 5), // Limit to 5 tags
      anonymousName: this.generateAnonymousName(),
      timestamp: new Date().toISOString(),
      reactions: { support: 0, relate: 0, care: 0 },
      comments: 0,
      userId: postData.userId
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  updatePostReactions(postId: string, reactionType: 'support' | 'relate' | 'care'): boolean {
    const postIndex = this.posts.findIndex(p => p.id === postId);
    if (postIndex !== -1) {
      this.posts[postIndex].reactions[reactionType]++;
      return true;
    }
    return false;
  }

  getPostById(postId: string): Post | undefined {
    return this.posts.find(p => p.id === postId);
  }

  deletePost(postId: string): boolean {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(p => p.id !== postId);
    return this.posts.length < initialLength;
  }

  // Analytics methods
  getTotalPosts(): number {
    return this.posts.length;
  }

  getPostsByCategory(): Record<string, number> {
    const categoryCounts: Record<string, number> = {};
    this.posts.forEach(post => {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    });
    return categoryCounts;
  }

  getTotalReactions(): number {
    return this.posts.reduce((total, post) => 
      total + post.reactions.support + post.reactions.relate + post.reactions.care, 0
    );
  }
}

// Singleton instance
export const postsStore = new PostsStore();