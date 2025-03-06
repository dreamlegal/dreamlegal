import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

export async function POST(request) {
  try {
    const { userId , content, parentId, username } = await request.json();
    
    // Validate input
    if (!content || !parentId) {
      return NextResponse.json(
        { error: 'Content and parent ID are required' },
        { status: 400 }
      );
    }
    
    // Check if parent post exists
    const parentPost = await prisma.post.findUnique({
      where: { id: parentId },
    });
    
    if (!parentPost) {
      return NextResponse.json(
        { error: 'Parent post not found' },
        { status: 404 }
      );
    }
    
    // Create the reply (which is also a post)
    const newReply = await prisma.post.create({
      data: {
        content,
        username: username || 'anonymous',
        parentId,
        userId,
        upvotes: [],
        downvotes: [],
        categories: [], // Inherit parent categories or leave empty
        views: 0,
      },
    });
    
    // Return the new reply
    return NextResponse.json({ 
      success: true,
      post: newReply
    });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: 'Failed to create reply: ' + error.message },
      { status: 500 }
    );
  }
}