import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { postId, userId, voteType } = await request.json();
    
    if (!postId || !userId || !voteType) {
      return NextResponse.json(
        { error: 'Missing required fields: postId, userId, voteType' },
        { status: 400 }
      );
    }
    
    if (voteType !== 'upvote' && voteType !== 'downvote') {
      return NextResponse.json(
        { error: 'voteType must be either "upvote" or "downvote"' },
        { status: 400 }
      );
    }
    
    // Get the latest post data
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        upvotes: true,
        downvotes: true
      }
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Make sure we have arrays
    const upvotes = Array.isArray(post.upvotes) ? [...post.upvotes] : [];
    const downvotes = Array.isArray(post.downvotes) ? [...post.downvotes] : [];
    
    console.log(`VOTE - Post ${postId} - Before:`, {
      upvotes: upvotes,
      downvotes: downvotes,
      userId: userId,
      voteType: voteType
    });
    
    // Check current state of user's votes
    const hasUpvoted = upvotes.includes(userId);
    const hasDownvoted = downvotes.includes(userId);
    
    // Create new arrays for our updates
    let newUpvotes = [...upvotes];
    let newDownvotes = [...downvotes];
    
    if (voteType === 'upvote') {
      if (hasUpvoted) {
        // User already upvoted - remove their upvote (toggle off)
        console.log(`User ${userId} is removing their upvote`);
        newUpvotes = newUpvotes.filter(id => id !== userId);
      } else {
        // User is upvoting - add to upvotes
        console.log(`User ${userId} is adding an upvote`);
        newUpvotes.push(userId);
        
        // Remove from downvotes if they had downvoted
        if (hasDownvoted) {
          console.log(`User ${userId} had downvoted, removing their downvote`);
          newDownvotes = newDownvotes.filter(id => id !== userId);
        }
      }
    } else { // downvote
      if (hasDownvoted) {
        // User already downvoted - remove their downvote (toggle off)
        console.log(`User ${userId} is removing their downvote`);
        newDownvotes = newDownvotes.filter(id => id !== userId);
      } else {
        // User is downvoting - add to downvotes
        console.log(`User ${userId} is adding a downvote`);
        newDownvotes.push(userId);
        
        // Remove from upvotes if they had upvoted
        if (hasUpvoted) {
          console.log(`User ${userId} had upvoted, removing their upvote`);
          newUpvotes = newUpvotes.filter(id => id !== userId);
        }
      }
    }
    
    console.log(`VOTE - Post ${postId} - After:`, {
      newUpvotes: newUpvotes,
      newDownvotes: newDownvotes
    });
    
    // Update the post with the new vote arrays
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        upvotes: newUpvotes,
        downvotes: newDownvotes
      },
      select: {
        id: true,
        upvotes: true,
        downvotes: true
      }
    });
    
    console.log(`VOTE - Post ${postId} - Saved to DB:`, {
      finalUpvotes: updatedPost.upvotes,
      finalDownvotes: updatedPost.downvotes
    });
    
    return NextResponse.json({
      success: true,
      votes: {
        upvotes: updatedPost.upvotes,
        downvotes: updatedPost.downvotes
      }
    });
    
  } catch (error) {
    console.error('Error updating post vote:', error);
    return NextResponse.json(
      { error: 'Failed to update post vote: ' + error.message },
      { status: 500 }
    );
  }
}