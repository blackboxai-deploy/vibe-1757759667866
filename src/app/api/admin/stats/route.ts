import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '@/lib/users-store';
import { postsStore } from '@/lib/posts-store';
import { reportsStore } from '@/lib/reports-store';

export async function GET() {
  try {
    // Get stats from all stores
    const userStats = usersStore.getUserStats();
    const reportStats = reportsStore.getReportStats();
    
    const adminStats = {
      // User statistics
      totalUsers: userStats.totalUsers,
      activeUsers: userStats.activeUsers,
      newUsersToday: userStats.newUsersToday,
      adminUsers: userStats.adminUsers,
      
      // Post statistics
      totalPosts: postsStore.getTotalPosts(),
      totalReactions: postsStore.getTotalReactions(),
      categoryBreakdown: postsStore.getPostsByCategory(),
      
      // Report statistics
      totalReports: reportStats.totalReports,
      pendingReports: reportStats.pendingReports,
      resolvedReports: reportStats.resolvedReports,
      dismissedReports: reportStats.dismissedReports,
      urgentReports: reportStats.urgentReports,
      reportsByCategory: reportStats.reportsByCategory,
      averageResponseTime: reportStats.averageResponseTime,
      
      // Platform health
      lastUpdated: new Date().toISOString(),
      uptime: 0 // Simplified for demo
    };

    return NextResponse.json({
      success: true,
      stats: adminStats
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}