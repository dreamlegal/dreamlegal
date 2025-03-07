import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // First fetch all top-level posts
    const posts = await prisma.post.findMany({
      where: { parentId: null }, // Only fetch top-level posts (not replies)
      select: {
        id: true,
        userId: true,
        username: true,
        content: true,
        poll: true,
        views: true,
        upvotes: true,
        parentId:true,
        downvotes: true,
        categories: true,
        replyIds: true, // Include the replyIds array
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Latest posts first
      },
    });

    // For each post, fetch its first-level replies
    const postsWithReplies = await Promise.all(posts.map(async (post) => {
      // Fetch direct replies to this post
      const replies = await prisma.post.findMany({
        where: { parentId: post.id },
        select: {
          id: true,
          userId: true,
          username: true,
          content: true, 
          parentId: true,
          replyIds: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc', // Oldest replies first (chronological)
        },
      });

      // For each first-level reply, fetch its own replies (second level)
      const repliesWithNestedReplies = await Promise.all(replies.map(async (reply) => {
        const nestedReplies = await prisma.post.findMany({
          where: { parentId: reply.id },
          select: {
            id: true,
            userId: true,
            username: true,
            content: true,
            parentId: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
          take: 3, // Limit to 3 nested replies for performance
        });

        // Add the nested replies to the reply object
        return {
          ...reply,
          replies: nestedReplies,
        };
      }));

      // Add the replies to the post object
      return {
        ...post,
        replies: repliesWithNestedReplies,
      };
    }));

    return NextResponse.json({ success: true, data: postsWithReplies }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, message: 'Error fetching posts' }, { status: 500 });
  }
}