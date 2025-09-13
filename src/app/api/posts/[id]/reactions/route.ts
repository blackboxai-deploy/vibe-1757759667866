import { NextRequest, NextResponse } from 'next/server';
import { postsStore } from '@/lib/posts-store';

interface ReactionRequest {
  type: 'support' | 'relate' | 'care';
  userId?: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const postId = resolvedParams.id;
    const body: ReactionRequest = await request.json();
    const { type, userId } = body;

    // Validation
    if (!type || !['support', 'relate', 'care'].includes(type)) {
      return NextResponse.json(
        { error: 'Valid reaction type is required (support, relate, care)' },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = postsStore.getPostById(postId);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Update reaction
    const success = postsStore.updatePostReactions(postId, type);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update reaction' },
        { status: 500 }
      );
    }

    // Get updated post
    const updatedPost = postsStore.getPostById(postId);

    return NextResponse.json({
      success: true,
      message: 'Reaction added successfully',
      reactions: updatedPost?.reactions,
      post: updatedPost
    });
  } catch (error) {
    console.error('Reaction error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const postId = resolvedParams.id;
    const post = postsStore.getPostById(postId);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      reactions: post.reactions,
      total: post.reactions.support + post.reactions.relate + post.reactions.care
    });
  } catch (error) {
    console.error('Get reactions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}