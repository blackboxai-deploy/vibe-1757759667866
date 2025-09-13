"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CommentSystem } from "./CommentSystem";

interface PostReactions {
  support: number;
  relate: number;
  care: number;
}

interface Post {
  id: string;
  content: string;
  category: string;
  anonymousName: string;
  timestamp: string;
  reactions: PostReactions;
  comments: number;
  tags: string[];
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    {
      id: "1",
      content: "Thank you for sharing this. You're not alone in feeling this way. Many of us struggle with similar thoughts, and it takes courage to reach out.",
      anonymousName: "SupportiveFriend",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      reactions: { support: 12, relate: 8 },
      replies: [
        {
          id: "2",
          content: "I completely agree. This community is here for you. Please consider speaking with a professional who can provide proper support.",
          anonymousName: "CaringListener",
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          reactions: { support: 5, relate: 3 },
          replies: []
        }
      ]
    }
  ]);

  const handleReaction = (type: keyof PostReactions) => {
    setUserReactions(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      general: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      relationships: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
      work: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      family: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      health: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      personal: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      secrets: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      regrets: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
    };
    return colors[category] || colors.general;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {post.anonymousName.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-sm">{post.anonymousName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Badge className={`text-xs ${getCategoryColor(post.category)}`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm leading-relaxed text-foreground/90 mb-4 break-words whitespace-pre-wrap">
          {post.content}
        </p>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="pt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Button
              variant={userReactions.support ? "default" : "ghost"}
              size="sm"
              onClick={() => handleReaction("support")}
              className="gap-2 text-xs"
            >
              <span>🤗</span>
              <span>Support</span>
              <span className="text-muted-foreground">
                {post.reactions.support + (userReactions.support ? 1 : 0)}
              </span>
            </Button>

            <Button
              variant={userReactions.relate ? "default" : "ghost"}
              size="sm"
              onClick={() => handleReaction("relate")}
              className="gap-2 text-xs"
            >
              <span>🫂</span>
              <span>Relate</span>
              <span className="text-muted-foreground">
                {post.reactions.relate + (userReactions.relate ? 1 : 0)}
              </span>
            </Button>

            <Button
              variant={userReactions.care ? "default" : "ghost"}
              size="sm"
              onClick={() => handleReaction("care")}
              className="gap-2 text-xs"
            >
              <span>💙</span>
              <span>Care</span>
              <span className="text-muted-foreground">
                {post.reactions.care + (userReactions.care ? 1 : 0)}
              </span>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant={showComments ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="gap-2 text-xs"
            >
              <span>💬</span>
              <span>{comments.length} Comments</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs hover:text-red-600 dark:hover:text-red-400"
              onClick={async () => {
                const reason = prompt("Why are you reporting this post?\n\nOptions: harassment, hate-speech, spam, self-harm, inappropriate, misinformation, privacy, other");
                if (reason) {
                  try {
                    const response = await fetch('/api/reports', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        postId: post.id,
                        reason: reason.toLowerCase(),
                        description: `Reported via post card interface`,
                        reporterId: localStorage.getItem('confess_user') ? JSON.parse(localStorage.getItem('confess_user')!).id : undefined
                      }),
                    });

                    const data = await response.json();
                    if (data.success) {
                      alert("Thank you for your report. Our moderation team has been notified and will review this content within 24 hours.");
                    } else {
                      alert("Report submission failed: " + (data.error || "Please try again"));
                    }
                  } catch (error) {
                    alert("Failed to submit report. Please try again.");
                  }
                }
              }}
            >
              <span>⚠️</span>
              <span>Report</span>
            </Button>
          </div>
        </div>
      </CardFooter>

      {showComments && (
        <div className="px-6 pb-6">
          <CommentSystem
            postId={post.id}
            comments={comments}
            onAddComment={(postId, content, parentId) => {
              const newComment = {
                id: Date.now().toString(),
                content,
                anonymousName: `Anonymous${Math.floor(Math.random() * 1000)}`,
                timestamp: new Date().toISOString(),
                reactions: { support: 0, relate: 0 },
                replies: []
              };
              
              if (parentId) {
                // Add as reply
                setComments(prev => prev.map(comment => {
                  if (comment.id === parentId) {
                    return {
                      ...comment,
                      replies: [...comment.replies, newComment]
                    };
                  }
                  return comment;
                }));
              } else {
                // Add as new comment
                setComments(prev => [...prev, newComment]);
              }
            }}
            onReactToComment={(commentId, reactionType) => {
              setComments(prev => prev.map(comment => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    reactions: {
                      ...comment.reactions,
                      [reactionType]: comment.reactions[reactionType] + 1
                    }
                  };
                }
                // Check replies
                return {
                  ...comment,
                  replies: comment.replies.map(reply => {
                    if (reply.id === commentId) {
                      return {
                        ...reply,
                        reactions: {
                          ...reply.reactions,
                          [reactionType]: reply.reactions[reactionType] + 1
                        }
                      };
                    }
                    return reply;
                  })
                };
              }));
            }}
          />
        </div>
      )}
    </Card>
  );
}