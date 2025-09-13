import { NextRequest, NextResponse } from 'next/server';
import { postsStore } from '@/lib/posts-store';

interface PostRequest {
  content: string;
  category: string;
  tags: string[];
  userId?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'recent';

    const posts = postsStore.getAllPosts({
      category: category || undefined,
      search: search || undefined,
      sort: sort
    });

    return NextResponse.json({
      success: true,
      posts,
      total: posts.length,
      analytics: {
        totalPosts: postsStore.getTotalPosts(),
        totalReactions: postsStore.getTotalReactions(),
        categoryBreakdown: postsStore.getPostsByCategory()
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PostRequest = await request.json();
    const { content, category, tags, userId } = body;

    // Validation
    if (!content || !category) {
      return NextResponse.json(
        { error: 'Content and category are required' },
        { status: 400 }
      );
    }

    if (content.length < 10) {
      return NextResponse.json(
        { error: 'Content must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: 'Content must be less than 1000 characters' },
        { status: 400 }
      );
    }

    // Create new post using the store
    const newPost = postsStore.createPost({
      content,
      category,
      tags: tags || [],
      userId
    });

    return NextResponse.json({
      success: true,
      post: newPost,
      message: 'Post created successfully'
    });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}