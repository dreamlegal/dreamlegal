// app/api/posts/get-replies/route.js
import { NextResponse } from 'next/server';
import prisma  from '@/lib/prisma';

export async function GET(request) {
  try {
    // Get postId from URL query parameter
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    // Get direct replies for this post with their direct replies (limited)
    const replies = await prisma.post.findMany({
      where: {
        parentId: postId,
      },
      include: {
        // Include vote data to compute total score
        replies: {
          take: 3, // Limit to 3 nested replies
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            replies: {
              take: 3,
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ replies });
  } catch (error) {
    console.error('Error fetching replies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch replies' },
      { status: 500 }
    );
  }
}