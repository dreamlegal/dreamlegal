// app/api/articles/[articleId]/user-vote/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { articleId } = params;
    const browserId = request.headers.get('x-browser-id');

    if (!browserId) {
      return NextResponse.json({ userVote: null });
    }

    const userVote = await prisma.articleVote.findUnique({
      where: {
        articleId_browserId: {
          articleId,
          browserId
        }
      }
    });

    return NextResponse.json({
      userVote: userVote?.voteType || null
    });
    
  } catch (error) {
    console.error('Error fetching user vote:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}