// app/api/articles/[articleId]/vote/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { articleId } = params;
    const { voteType } = await request.json();
    const browserId = request.headers.get('x-browser-id');

    if (!articleId || !voteType || !['LIKE', 'DISLIKE'].includes(voteType) || !browserId) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    // Check for existing vote
    const existingVote = await prisma.articleVote.findUnique({
      where: {
        articleId_browserId: {
          articleId: articleId,
          browserId
        }
      }
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Remove vote (toggle off)
        await prisma.articleVote.delete({
          where: { id: existingVote.id }
        });
        
        return NextResponse.json({
          status: 'removed',
          message: 'Vote removed'
        });
      } else {
        // Change vote type
        await prisma.articleVote.update({
          where: { id: existingVote.id },
          data: { voteType }
        });
        
        return NextResponse.json({
          status: 'changed',
          message: 'Vote updated',
          voteType
        });
      }
    }

    // Add new vote
    await prisma.articleVote.create({
      data: {
        articleId,
        browserId,
        voteType
      }
    });

    return NextResponse.json({
      status: 'added',
      message: 'Vote recorded',
      voteType
    });

  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}