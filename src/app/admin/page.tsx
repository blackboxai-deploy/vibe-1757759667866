"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { getStoredUser, User } from "@/lib/auth";

interface Report {
  id: string;
  postId: string;
  reason: string;
  description?: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reviewedBy?: string;
  adminNotes?: string;
}

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalReactions: number;
  pendingReports: number;
  totalReports: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    totalReactions: 0,
    pendingReports: 0,
    totalReports: 0
  });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }

    if (!storedUser.isAdmin) {
      router.push('/dashboard');
      return;
    }

    setUser(storedUser);
    loadAdminData();
  }, [router]);

  const loadAdminData = async () => {
    try {
      // Load admin statistics
      const statsResponse = await fetch('/api/admin/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setAdminStats(statsData);
      }

      // Load reports
      const reportsResponse = await fetch('/api/admin/reports');
      if (reportsResponse.ok) {
        const reportsData = await reportsResponse.json();
        setReports(reportsData.reports || []);
      }
    } catch (error) {
      console.error('Failed to load admin data:', error);
      // Set mock data for demo
      setAdminStats({
        totalUsers: 152,
        activeUsers: 134,
        totalPosts: 543,
        totalReactions: 2847,
        pendingReports: 7,
        totalReports: 23
      });
      
      setReports([
        {
          id: '1',
          postId: 'post_123',
          reason: 'harassment',
          description: 'User is targeting other members with hostile comments',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          status: 'pending',
          priority: 'high'
        },
        {
          id: '2', 
          postId: 'post_456',
          reason: 'spam',
          description: 'Repetitive promotional content',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          status: 'pending',
          priority: 'low'
        },
        {
          id: '3',
          postId: 'post_789',
          reason: 'self-harm',
          description: 'Content encouraging dangerous behavior',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          status: 'pending',
          priority: 'urgent'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewReport = async (reportId: string, action: 'resolve' | 'dismiss') => {
    try {
      const response = await fetch('/api/admin/reports/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId,
          action,
          adminId: user?.id,
          notes: adminNotes
        }),
      });

      if (response.ok) {
        // Update local state
        setReports(prev => prev.map(report => 
          report.id === reportId 
            ? { 
                ...report, 
                status: action === 'resolve' ? 'resolved' : 'dismissed',
                reviewedBy: user?.id?.toString(),
                adminNotes 
              }
            : report
        ));
        setSelectedReport(null);
        setAdminNotes("");
        
        // Update stats
        setAdminStats(prev => ({
          ...prev,
          pendingReports: prev.pendingReports - 1
        }));
      }
    } catch (error) {
      console.error('Failed to review report:', error);
      alert('Failed to process report. Please try again.');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'dismissed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const filteredReports = reports.filter(report => {
    if (filterStatus !== 'all' && report.status !== filterStatus) return false;
    if (filterPriority !== 'all' && report.priority !== filterPriority) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-6">You don&apos;t have permission to access the admin dashboard.</p>
            <Button asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ConfessHub
                </span>
              </Link>
              <Badge variant="destructive">Admin Panel</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Admin Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage ConfessHub platform, users, and content moderation
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {adminStats.totalUsers}
                  </div>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {adminStats.activeUsers}
                  </div>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {adminStats.totalPosts}
                  </div>
                  <p className="text-xs text-muted-foreground">Total Posts</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {adminStats.totalReactions}
                  </div>
                  <p className="text-xs text-muted-foreground">Total Reactions</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                    {adminStats.pendingReports}
                  </div>
                  <p className="text-xs text-muted-foreground">Pending Reports</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-1">
                    {adminStats.totalReports}
                  </div>
                  <p className="text-xs text-muted-foreground">Total Reports</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="reports" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="reports">Reports ({adminStats.pendingReports})</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="mt-6">
              <div className="space-y-6">
                {/* Filters */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="dismissed">Dismissed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={filterPriority} onValueChange={setFilterPriority}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priority</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Reports List */}
                <div className="grid gap-4">
                  {filteredReports.length === 0 ? (
                    <Card>
                      <CardContent className="pt-6 text-center py-12">
                        <p className="text-muted-foreground">No reports match your filters.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredReports.map(report => (
                      <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getPriorityColor(report.priority)}>
                                  {report.priority.toUpperCase()}
                                </Badge>
                                <Badge className={getStatusColor(report.status)}>
                                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  Report #{report.id}
                                </span>
                              </div>
                              
                              <h3 className="font-semibold mb-1">
                                {report.reason.charAt(0).toUpperCase() + report.reason.slice(1).replace('-', ' ')}
                              </h3>
                              
                              {report.description && (
                                <p className="text-sm text-muted-foreground mb-2">
                                  {report.description}
                                </p>
                              )}
                              
                              <div className="text-xs text-muted-foreground">
                                Post ID: {report.postId} • Reported {new Date(report.timestamp).toLocaleString()}
                              </div>
                            </div>

                            {report.status === 'pending' && (
                              <div className="flex gap-2 ml-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedReport(report)}
                                >
                                  Review
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      User management interface will be implemented in the next phase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Management</CardTitle>
                  <CardDescription>
                    Monitor and manage platform content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Post management interface will be implemented in the next phase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>
                    Detailed insights and statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Advanced analytics dashboard will be implemented in the next phase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Report Review Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Review Report #{selectedReport.id}</CardTitle>
              <CardDescription>
                Take action on this reported content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Report Details</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Reason:</strong> {selectedReport.reason.replace('-', ' ')}</p>
                  <p><strong>Priority:</strong> <Badge className={getPriorityColor(selectedReport.priority)}>{selectedReport.priority}</Badge></p>
                  <p><strong>Post ID:</strong> {selectedReport.postId}</p>
                  <p><strong>Reported:</strong> {new Date(selectedReport.timestamp).toLocaleString()}</p>
                  {selectedReport.description && (
                    <p><strong>Description:</strong> {selectedReport.description}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Admin Notes</h4>
                <Textarea
                  placeholder="Add notes about your decision..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardContent className="pt-0">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedReport(null);
                    setAdminNotes("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleReviewReport(selectedReport.id, 'dismiss')}
                  className="flex-1"
                >
                  Dismiss Report
                </Button>
                <Button
                  onClick={() => handleReviewReport(selectedReport.id, 'resolve')}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Resolve & Take Action
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}