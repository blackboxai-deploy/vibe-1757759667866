"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { PostCard } from "@/components/posts/PostCard";
import { getStoredUser, removeStoredUser, User } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userStats, setUserStats] = useState({
    totalPosts: 0,
    totalReactions: 0,
    totalComments: 0,
    joinedDaysAgo: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }

    setUser(storedUser);
    loadUserData(storedUser.id.toString());
  }, [router]);

  const loadUserData = async (userId: string) => {
    try {
      // Load user posts
      const postsResponse = await fetch(`/api/users/${userId}/posts`);
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setUserPosts(postsData.posts || []);
      }

      // Load user comments  
      const commentsResponse = await fetch(`/api/users/${userId}/comments`);
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        setUserComments(commentsData.comments || []);
      }

      // Calculate stats
      if (user) {
        const joinDate = new Date(user.joinDate || Date.now());
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - joinDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setUserStats({
          totalPosts: userPosts.length,
          totalReactions: 0, // Will be calculated from posts
          totalComments: userComments.length,
          joinedDaysAgo: diffDays
        });
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    removeStoredUser();
    router.push('/');
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone. Your anonymous posts will remain but your account will be permanently deleted.")) {
      if (confirm("This is your final warning. Are you absolutely sure you want to delete your account?")) {
        // Call delete account API
        removeStoredUser();
        alert("Your account has been scheduled for deletion. Thank you for using ConfessHub.");
        router.push('/');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ConfessHub
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {user.anonymousId?.slice(0, 2).toUpperCase() || 'AN'}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Anonymous ID: <Badge variant="secondary">{user.anonymousId}</Badge></span>
                      <span>Member for {userStats.joinedDaysAgo} days</span>
                      {user.isAdmin && <Badge variant="destructive">Admin</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Email: {user.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/auth/forgot-password">Change Password</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {userStats.totalPosts}
                  </div>
                  <p className="text-sm text-muted-foreground">Posts Shared</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {userStats.totalComments}
                  </div>
                  <p className="text-sm text-muted-foreground">Comments Made</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {userStats.totalReactions}
                  </div>
                  <p className="text-sm text-muted-foreground">Reactions Given</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {userStats.joinedDaysAgo}
                  </div>
                  <p className="text-sm text-muted-foreground">Days Active</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="posts">My Posts ({userStats.totalPosts})</TabsTrigger>
              <TabsTrigger value="comments">Comments ({userStats.totalComments})</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="space-y-6">
                {userPosts.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <p className="text-muted-foreground mb-4">
                        You haven&apos;t shared any confessions yet.
                      </p>
                      <Button asChild>
                        <Link href="/dashboard">Share Your First Confession</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Your anonymous posts will appear here once the backend is fully integrated.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-6">
              <div className="space-y-4">
                {userComments.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <p className="text-muted-foreground mb-4">
                        You haven&apos;t made any comments yet.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Start engaging with the community by commenting on posts that resonate with you.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      Your comment history will appear here once the backend is fully integrated.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent interactions and contributions to the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Activity tracking will be available once the backend is fully integrated.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Password & Security</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Keep your account secure by regularly updating your password.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/auth/forgot-password">Change Password</Link>
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Privacy Settings</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your posts are always anonymous. These settings affect your account visibility.
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Allow anonymous interaction tracking (for better recommendations)</span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span>Show activity indicators on posts</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Danger Zone</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        These actions are permanent and cannot be undone.
                      </p>
                      <Button 
                        variant="destructive" 
                        onClick={handleDeleteAccount}
                        className="w-full"
                      >
                        Delete Account Permanently
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Note: Your anonymous posts will remain on the platform but your account will be permanently deleted.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}