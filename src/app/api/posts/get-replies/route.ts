// app/api/posts/get-replies/route.js
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
    
    // Fetch all direct replies to this post
    const replies = await prisma.post.findMany({
      where: {
        parentId: postId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
    
    // For each reply, fetch its own direct replies (level 2)
    const repliesWithChildren = await Promise.all(
      replies.map(async (reply) => {
        const childReplies = await prisma.post.findMany({
          where: {
            parentId: reply.id
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        });
        
        return {
          ...reply,
          replies: childReplies
        };
      })
    );
    
    return NextResponse.json({ replies: repliesWithChildren });
    
  } catch (error) {
    console.error('Error fetching replies:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch replies: ' + error.message },
      { status: 500 }
    );
  }
}