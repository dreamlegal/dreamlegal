import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    // Get post ID from query parameter
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Increment the view count in the database
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        views: { increment: 1 }
      },
      select: {
        id: true,
        views: true
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      postId: updatedPost.id,
      views: updatedPost.views
    });
    
  } catch (error) {
    console.error('Error incrementing post view:', error);
    
    // Check for common errors
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(
      { error: 'Failed to increment view: ' + error.message },
      { status: 500 }
    );
  }
}