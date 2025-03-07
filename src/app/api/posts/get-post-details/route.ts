
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request) {
//   try {
//     // Get post ID from query parameter
//     const url = new URL(request.url);
//     const postId = url.searchParams.get('postId');
    
//     if (!postId) {
//       return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
//     }
    
//     // Find the post by ID
//     const post = await prisma.post.update({
//       where: { id: postId },
//       data: {
//         // Increment view count
//         views: { increment: 1 }
//       },
//       select: {
//         id: true,
//         userId: true,
//         username: true,
//         content: true,
//         poll: true,
//         views: true,
//         upvotes: true,  // Make sure upvotes are included
//         downvotes: true, // Make sure downvotes are included
//         categories: true,
//         replyIds: true,
//         parentId: true,  // Include parent ID for replies
//         createdAt: true,
//         updatedAt: true,
//         user: {
//           select: {
//             id: true,
//             name: true,
//             image: true
//           }
//         }
//       }
//     });
    
//     if (!post) {
//       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     }
    
//     return NextResponse.json({ post });
    
//   } catch (error) {
//     console.error('Error fetching post details:', error);
    
//     // Check for common errors
//     if (error.code === 'P2025') {
//       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
//     }
    
//     return NextResponse.json(
//       { error: 'Failed to fetch post details: ' + error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper function to count all replies (including nested ones)
async function countAllReplies(postId) {
  // Set to track all reply IDs we've counted
  const countedReplyIds = new Set();
  
  // Array to track post IDs we need to process
  let postIdsToProcess = [postId];
  
  // Process posts in batches
  while (postIdsToProcess.length > 0) {
    // Get the current batch of IDs
    const currentBatchIds = [...postIdsToProcess];
    postIdsToProcess = [];
    
    // Fetch all posts in the current batch
    const posts = await prisma.post.findMany({
      where: { id: { in: currentBatchIds } },
      select: { id: true, replyIds: true }
    });
    
    // Process each post
    for (const post of posts) {
      // Add all reply IDs to our process queue (if not already counted)
      for (const replyId of post.replyIds) {
        if (!countedReplyIds.has(replyId)) {
          countedReplyIds.add(replyId);
          postIdsToProcess.push(replyId);
        }
      }
    }
  }
  
  return countedReplyIds.size;
}

export async function GET(request) {
  try {
    // Get post ID from query parameter
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Find the post by ID
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        // Increment view count
        views: { increment: 1 }
      },
      select: {
        id: true,
        userId: true,
        username: true,
        content: true,
        poll: true,
        views: true,
        upvotes: true,  // Make sure upvotes are included
        downvotes: true, // Make sure downvotes are included
        categories: true,
        replyIds: true,
        parentId: true,  // Include parent ID for replies
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
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Count all replies (including nested ones)
    const totalReplies = await countAllReplies(postId);
    
    // Return post with the total reply count
    return NextResponse.json({
      post,
      totalReplies
    });
    
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