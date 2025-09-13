export interface Report {
  id: string;
  postId: string;
  reporterId?: string; // Optional - anonymous reporting
  reason: string;
  description?: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reviewedBy?: string; // Admin user ID
  reviewedAt?: string;
  adminNotes?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface ReportCategory {
  id: string;
  name: string;
  description: string;
}

class ReportsStore {
  private reports: Report[] = [];
  
  private categories: ReportCategory[] = [
    {
      id: 'harassment',
      name: 'Harassment or Bullying',
      description: 'Content that targets, intimidates, or harms others'
    },
    {
      id: 'hate-speech',
      name: 'Hate Speech',
      description: 'Content promoting hatred or discrimination'
    },
    {
      id: 'spam',
      name: 'Spam or Commercial',
      description: 'Unwanted promotional content or repetitive posts'
    },
    {
      id: 'self-harm',
      name: 'Self-Harm Content',
      description: 'Content promoting or encouraging self-harm'
    },
    {
      id: 'inappropriate',
      name: 'Inappropriate Content',
      description: 'Sexually explicit or disturbing content'
    },
    {
      id: 'misinformation',
      name: 'Misinformation',
      description: 'False or misleading information'
    },
    {
      id: 'privacy',
      name: 'Privacy Violation',
      description: 'Sharing personal information without consent'
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Other policy violations not listed above'
    }
  ];

  // Create Report
  createReport(data: {
    postId: string;
    reporterId?: string;
    reason: string;
    description?: string;
  }): { success: boolean; report?: Report; error?: string } {
    
    // Check if user already reported this post (prevent spam)
    if (data.reporterId) {
      const existingReport = this.reports.find(r => 
        r.postId === data.postId && 
        r.reporterId === data.reporterId &&
        r.status !== 'dismissed'
      );
      
      if (existingReport) {
        return { success: false, error: 'You have already reported this post' };
      }
    }

    // Determine priority based on reason
    let priority: Report['priority'] = 'medium';
    if (data.reason === 'self-harm') {
      priority = 'urgent';
    } else if (['harassment', 'hate-speech'].includes(data.reason)) {
      priority = 'high';
    } else if (data.reason === 'spam') {
      priority = 'low';
    }

    const newReport: Report = {
      id: Date.now().toString(),
      postId: data.postId,
      reporterId: data.reporterId,
      reason: data.reason,
      description: data.description,
      timestamp: new Date().toISOString(),
      status: 'pending',
      priority
    };

    this.reports.push(newReport);
    return { success: true, report: newReport };
  }

  // Get Reports (for admin)
  getAllReports(filters?: {
    status?: Report['status'];
    priority?: Report['priority'];
    reason?: string;
    limit?: number;
  }): Report[] {
    let filtered = [...this.reports];

    if (filters?.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    if (filters?.priority) {
      filtered = filtered.filter(r => r.priority === filters.priority);
    }

    if (filters?.reason) {
      filtered = filtered.filter(r => r.reason === filters.reason);
    }

    // Sort by priority and timestamp
    filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  // Review Report (admin action)
  reviewReport(
    reportId: string, 
    adminId: string, 
    action: 'resolve' | 'dismiss',
    notes?: string
  ): { success: boolean; error?: string } {
    
    const report = this.reports.find(r => r.id === reportId);
    
    if (!report) {
      return { success: false, error: 'Report not found' };
    }

    if (report.status === 'reviewed' || report.status === 'resolved' || report.status === 'dismissed') {
      return { success: false, error: 'Report has already been reviewed' };
    }

    report.status = action === 'resolve' ? 'resolved' : 'dismissed';
    report.reviewedBy = adminId;
    report.reviewedAt = new Date().toISOString();
    report.adminNotes = notes;

    return { success: true };
  }

  // Get Report by ID
  getReportById(reportId: string): Report | undefined {
    return this.reports.find(r => r.id === reportId);
  }

  // Get Reports for a specific post
  getReportsForPost(postId: string): Report[] {
    return this.reports.filter(r => r.postId === postId);
  }

  // Get Report Categories
  getCategories(): ReportCategory[] {
    return [...this.categories];
  }

  // Analytics
  getReportStats(): {
    totalReports: number;
    pendingReports: number;
    resolvedReports: number;
    dismissedReports: number;
    urgentReports: number;
    reportsByCategory: Record<string, number>;
    averageResponseTime: number; // in hours
  } {
    const total = this.reports.length;
    const pending = this.reports.filter(r => r.status === 'pending').length;
    const resolved = this.reports.filter(r => r.status === 'resolved').length;
    const dismissed = this.reports.filter(r => r.status === 'dismissed').length;
    const urgent = this.reports.filter(r => r.priority === 'urgent' && r.status === 'pending').length;

    // Calculate reports by category
    const reportsByCategory: Record<string, number> = {};
    this.reports.forEach(report => {
      reportsByCategory[report.reason] = (reportsByCategory[report.reason] || 0) + 1;
    });

    // Calculate average response time
    const reviewedReports = this.reports.filter(r => r.reviewedAt);
    const totalResponseTime = reviewedReports.reduce((sum, report) => {
      const created = new Date(report.timestamp).getTime();
      const reviewed = new Date(report.reviewedAt!).getTime();
      return sum + (reviewed - created);
    }, 0);

    const averageResponseTime = reviewedReports.length > 0 
      ? totalResponseTime / reviewedReports.length / (1000 * 60 * 60) // Convert to hours
      : 0;

    return {
      totalReports: total,
      pendingReports: pending,
      resolvedReports: resolved,
      dismissedReports: dismissed,
      urgentReports: urgent,
      reportsByCategory,
      averageResponseTime
    };
  }

  // Get recent activity
  getRecentActivity(limit: number = 10): Report[] {
    return this.reports
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Bulk operations for admin
  bulkResolve(reportIds: string[], adminId: string, notes?: string): { success: number; failed: number } {
    let success = 0;
    let failed = 0;

    reportIds.forEach(id => {
      const result = this.reviewReport(id, adminId, 'resolve', notes);
      if (result.success) success++;
      else failed++;
    });

    return { success, failed };
  }
}

// Singleton instance
export const reportsStore = new ReportsStore();