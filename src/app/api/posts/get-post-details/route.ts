// app/api/posts/get-post-details/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // Get post ID from query parameter
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Find the post by ID
    // The error is in the include statement - 'categories' is not a valid relation
    // Let's remove it if it's not defined in your schema
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        // Increment view count
        views: { increment: 1 }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
        // Removed 'categories' as it appears to not be a valid relation field
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ post });
    
  } catch (error) {
    console.error('Error fetching post details:', error);
    
    // Check for common errors
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch post details: ' + error.message },
      { status: 500 }
    );
  }
}