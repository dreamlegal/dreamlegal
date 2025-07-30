// /api/blogs/[id]/reactions/user/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// GET - Get user's reactions for a specific blog
export async function GET(request, { params }) {
  try {
    const { id: blogId } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const vendorId = searchParams.get('vendorId');

    if (!userId && !vendorId) {
      return NextResponse.json({ reactions: [] });
    }

    const userReactions = await prisma.blogReaction.findMany({
      where: {
        blogId,
        ...(userId ? { userId } : { vendorId })
      },
      select: {
        reaction: true
      }
    });

    const reactions = userReactions.map(r => r.reaction);

    return NextResponse.json({ reactions });
  } catch (error) {
    console.error('Error fetching user reactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user reactions' }, 
      { status: 500 }
    );
  }
}