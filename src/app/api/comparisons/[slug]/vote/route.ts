// app/api/comparisons/[slug]/vote/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { slug } = await params;
    const { voteType } = await request.json();
    const browserId = request.headers.get('x-browser-id');

    console.log('Comparison Vote API - Received params:', { slug, voteType, browserId });

    if (!slug || !voteType || !['LIKE', 'DISLIKE'].includes(voteType) || !browserId) {
      console.log('Comparison Vote API - Invalid request:', { 
        slug: !!slug, 
        voteType, 
        validVoteType: ['LIKE', 'DISLIKE'].includes(voteType), 
        browserId: !!browserId 
      });
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    // First, find the comparison by slug to get the ID
    const comparison = await prisma.comparison.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!comparison) {
      return NextResponse.json({ message: 'Comparison not found' }, { status: 404 });
    }

    const comparisonId = comparison.id;

    // Check for existing vote
    const existingVote = await prisma.comparisonVote.findUnique({
      where: {
        comparisonId_browserId: {
          comparisonId,
          browserId
        }
      }
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Remove vote (toggle off)
        await prisma.comparisonVote.delete({
          where: { id: existingVote.id }
        });
        
        console.log('Comparison vote removed for:', { comparisonId, browserId });
        return NextResponse.json({
          status: 'removed',
          message: 'Vote removed'
        });
      } else {
        // Change vote type
        await prisma.comparisonVote.update({
          where: { id: existingVote.id },
          data: { voteType }
        });
        
        console.log('Comparison vote changed for:', { comparisonId, browserId, newVoteType: voteType });
        return NextResponse.json({
          status: 'changed',
          message: 'Vote updated',
          voteType
        });
      }
    }

    // Add new vote
    await prisma.comparisonVote.create({
      data: {
        comparisonId,
        browserId,
        voteType
      }
    });

    console.log('New comparison vote added for:', { comparisonId, browserId, voteType });
    return NextResponse.json({
      status: 'added',
      message: 'Vote recorded',
      voteType
    });

  } catch (error) {
    console.error('Comparison vote error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}