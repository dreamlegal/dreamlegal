// app/api/posts/create-reply/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json();

    // Validate required fields
    console.log("Received reply data:", data);

    // Validate required fields with more specific error
    if (!data.userId) {
      return NextResponse.json({ error: 'Missing userId field' }, { status: 400 });
    }
    if (!data.content) {
      return NextResponse.json({ error: 'Missing content field' }, { status: 400 });
    }
    if (!data.parentId) {
      return NextResponse.json({ error: 'Missing parentId field' }, { status: 400 });
    }
    if (!data.userId || !data.content || !data.parentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the reply post
    const reply = await prisma.post.create({
      data: {
        userId: data.userId,
        username: data.username || 'anonymous',
        content: data.content,
        parentId: data.parentId, // Store reference to parent post
        categories: Array.isArray(data.categories) ? data.categories : 
                    (data.categories ? [data.categories] : ['REPLY']),
        upvotes: [],
        downvotes: [],
        views: 0,
        replyIds: [], // Initialize with empty array
      }
    });

    // Update the parent post's replyIds array
    await prisma.post.update({
      where: { id: data.parentId },
      data: {
        replyIds: {
          push: reply.id
        }
      }
    });

    return NextResponse.json({ success: true, reply });

  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: 'Failed to create reply: ' + error.message },
      { status: 500 }
    );
  }
}