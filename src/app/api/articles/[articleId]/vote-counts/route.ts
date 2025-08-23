// app/api/articles/[articleId]/vote-counts/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { articleId } = params;

    // Count votes in real-time
    const [likesCount, dislikesCount] = await Promise.all([
      prisma.articleVote.count({
        where: {
          articleId,
          voteType: 'LIKE'
        }
      }),
      prisma.articleVote.count({
        where: {
          articleId,
          voteType: 'DISLIKE'
        }
      })
    ]);

    return NextResponse.json({
      likes: likesCount,
      dislikes: dislikesCount
    });
    
  } catch (error) {
    console.error('Error fetching vote counts:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}