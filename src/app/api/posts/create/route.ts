
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json();

    // Validate required fields
    if (!data.userId || !data.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        userId: data.userId,
        username: data.username || 'anonymous',
        content: data.content,
        poll: data.poll || null,
        // Handle categories as a string array
        categories: Array.isArray(data.categories) ? data.categories : 
                    (data.categories ? [data.categories] : []),
        // Don't include replyIds as it's not in the schema
        // Instead, we'll handle replies through the parent-child relationship
        upvotes: [],
        downvotes: [],
        views: 0,
      }
    });

    return NextResponse.json({ success: true, post });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post: ' + error.message },
      { status: 500 }
    );
  }
}