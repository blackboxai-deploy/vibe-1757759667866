"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  content: string;
  anonymousName: string;
  timestamp: string;
  reactions: {
    support: number;
    relate: number;
  };
  replies: Comment[];
}

interface CommentSystemProps {
  postId: string;
  comments: Comment[];
  onAddComment?: (postId: string, content: string, parentId?: string) => void;
  onReactToComment?: (commentId: string, reactionType: 'support' | 'relate') => void;
}

export function CommentSystem({ postId, comments, onAddComment, onReactToComment }: CommentSystemProps) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userReactions, setUserReactions] = useState<Record<string, { support?: boolean; relate?: boolean }>>({});

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onAddComment) {
        onAddComment(postId, newComment.trim());
      }
      setNewComment("");
    } catch (error) {
      console.error('Failed to post comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onAddComment) {
        onAddComment(postId, replyContent.trim(), parentId);
      }
      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
      console.error('Failed to post reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentReaction = (commentId: string, reactionType: 'support' | 'relate') => {
    setUserReactions(prev => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        [reactionType]: !prev[commentId]?.[reactionType]
      }
    }));

    if (onReactToComment) {
      onReactToComment(commentId, reactionType);
    }
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`space-y-3 ${isReply ? 'ml-6 border-l-2 border-muted pl-4' : ''}`}>
      <Card className="bg-muted/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {comment.anonymousName.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm">{comment.anonymousName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
            {!isReply && (
              <Badge variant="outline" className="text-xs">
                Comment
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm leading-relaxed mb-3 break-words whitespace-pre-wrap">
            {comment.content}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant={userReactions[comment.id]?.support ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCommentReaction(comment.id, "support")}
                className="gap-1 text-xs h-7"
              >
                <span>🤗</span>
                <span>{comment.reactions.support + (userReactions[comment.id]?.support ? 1 : 0)}</span>
              </Button>
              <Button
                variant={userReactions[comment.id]?.relate ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCommentReaction(comment.id, "relate")}
                className="gap-1 text-xs h-7"
              >
                <span>🫂</span>
                <span>{comment.reactions.relate + (userReactions[comment.id]?.relate ? 1 : 0)}</span>
              </Button>
            </div>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-xs h-7"
              >
                {replyingTo === comment.id ? "Cancel" : "Reply"}
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-4 pt-4 border-t space-y-3">
              <Textarea
                placeholder="Write a supportive reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
                className="resize-none text-sm"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {replyContent.length}/500 characters
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyContent("");
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim() || isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Reply"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <Separator />
      
      {/* Comments Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold flex items-center gap-2">
          <span>💬</span>
          Comments ({comments.length})
        </h4>
      </div>

      {/* Add Comment Form */}
      <Card className="bg-muted/20">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Share your thoughts or offer support... Remember to be kind and respectful."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {newComment.length}/1000 characters
              </span>
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-2">No comments yet</p>
            <p className="text-sm text-muted-foreground">
              Be the first to offer support or share your thoughts
            </p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}