import { generateAnonymousName } from "./auth";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  anonymousId: string;
  joinDate: string;
  lastLogin?: string;
  isAdmin?: boolean;
  isActive: boolean;
  posts: string[]; // Array of post IDs
  comments: string[]; // Array of comment IDs
  reactions: string[]; // Array of post IDs they've reacted to
}

export interface PasswordResetToken {
  id: string;
  userId: string;
  token: string;
  expires: string;
  used: boolean;
}

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  // This is a simple hash for demo purposes
  // In production, use bcrypt or similar
  return btoa(password) + '_hashed';
}

function verifyPassword(password: string, hash: string): boolean {
  const expectedHash = hashPassword(password);
  return expectedHash === hash;
}

class UsersStore {
  private users: User[] = [
    // Admin user for testing
    {
      id: 'admin_1',
      email: 'admin@confesshub.com',
      passwordHash: hashPassword('admin123'),
      anonymousId: 'AdminUser001',
      joinDate: new Date().toISOString(),
      isAdmin: true,
      isActive: true,
      posts: [],
      comments: [],
      reactions: []
    }
  ];
  
  private passwordResetTokens: PasswordResetToken[] = [];

  // User Management
  createUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
    // Check if user already exists
    const existingUser = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      anonymousId: generateAnonymousName(),
      joinDate: new Date().toISOString(),
      isActive: true,
      posts: [],
      comments: [],
      reactions: []
    };

    this.users.push(newUser);
    return { success: true, user: this.sanitizeUser(newUser) };
  }

  authenticateUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    if (!user.isActive) {
      return { success: false, error: 'Account is deactivated' };
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    
    return { success: true, user: this.sanitizeUser(user) };
  }

  getUserById(userId: string): User | undefined {
    const user = this.users.find(u => u.id === userId);
    return user ? this.sanitizeUser(user) : undefined;
  }

  getUserByEmail(email: string): User | undefined {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user ? this.sanitizeUser(user) : undefined;
  }

  // Password Reset
  createPasswordResetToken(email: string): { success: boolean; token?: string; error?: string } {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // Don't reveal if email exists or not for security
      return { success: true }; // Always return success
    }

    // Generate reset token
    const token = Math.random().toString(36).substr(2, 15) + Date.now().toString(36);
    const resetToken: PasswordResetToken = {
      id: Date.now().toString(),
      userId: user.id,
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      used: false
    };

    this.passwordResetTokens.push(resetToken);
    
    return { success: true, token };
  }

  resetPassword(token: string, newPassword: string): { success: boolean; error?: string } {
    const resetToken = this.passwordResetTokens.find(t => t.token === token && !t.used);
    
    if (!resetToken) {
      return { success: false, error: 'Invalid or expired reset token' };
    }

    if (new Date() > new Date(resetToken.expires)) {
      return { success: false, error: 'Reset token has expired' };
    }

    const user = this.users.find(u => u.id === resetToken.userId);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Update password
    user.passwordHash = hashPassword(newPassword);
    resetToken.used = true;

    return { success: true };
  }

  // User Activity Tracking
  addUserPost(userId: string, postId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user && !user.posts.includes(postId)) {
      user.posts.push(postId);
    }
  }

  addUserComment(userId: string, commentId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user && !user.comments.includes(commentId)) {
      user.comments.push(commentId);
    }
  }

  addUserReaction(userId: string, postId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user && !user.reactions.includes(postId)) {
      user.reactions.push(postId);
    }
  }

  // Admin Functions
  getAllUsers(): User[] {
    return this.users.map(u => this.sanitizeUser(u));
  }

  deactivateUser(userId: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.isActive = false;
      return true;
    }
    return false;
  }

  reactivateUser(userId: string): boolean {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.isActive = true;
      return true;
    }
    return false;
  }

  // Analytics
  getUserStats(): {
    totalUsers: number;
    activeUsers: number;
    newUsersToday: number;
    adminUsers: number;
  } {
    const today = new Date().toISOString().split('T')[0];
    
    return {
      totalUsers: this.users.length,
      activeUsers: this.users.filter(u => u.isActive).length,
      newUsersToday: this.users.filter(u => u.joinDate.startsWith(today)).length,
      adminUsers: this.users.filter(u => u.isAdmin).length
    };
  }

  // Utility
  private sanitizeUser(user: User): User {
    // Remove sensitive data before returning
    const { passwordHash, ...sanitizedUser } = user;
    return sanitizedUser as User;
  }
}

// Singleton instance
export const usersStore = new UsersStore();