// app/api/posts/update-post/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    // Get post ID from query parameter
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Get updated data from request body
    const updatedData = await request.json();
    
    // Find the post to update
    const existingPost = await prisma.post.findUnique({
      where: { id: postId }
    });
    
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Prepare update payload
    const updatePayload = {};
    
    // If updated data is an array, it's likely content blocks
    if (Array.isArray(updatedData)) {
      updatePayload.content = JSON.stringify(updatedData);
    } 
    // Otherwise, it's direct fields to update
    else {
      if (updatedData.content) {
        // If content is an array, stringify it
        if (Array.isArray(updatedData.content)) {
          updatePayload.content = JSON.stringify(updatedData.content);
        } else {
          updatePayload.content = updatedData.content;
        }
      }
      
      // Copy any other fields that need to be updated
      ['poll', 'categories', 'upvotes', 'downvotes'].forEach(field => {
        if (updatedData[field] !== undefined) {
          updatePayload[field] = updatedData[field];
        }
      });
    }
    
    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: updatePayload,
      select: {
        id: true,
        userId: true,
        username: true,
        content: true,
        poll: true,
        views: true,
        upvotes: true,
        downvotes: true,
        categories: true,
        replyIds: true,
        parentId: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    });
    
    return NextResponse.json({ success: true, post: updatedPost });
    
  } catch (error) {
    console.error('Error updating post:', error);
    
    return NextResponse.json(
      { error: 'Failed to update post: ' + error.message },
      { status: 500 }
    );
  }
}