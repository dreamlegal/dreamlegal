// app/api/comparisons/[slug]/user-vote/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const browserId = request.headers.get('x-browser-id');

    console.log('Comparison User Vote API - Received params:', { slug, browserId });

    if (!slug) {
      return NextResponse.json({ message: 'Comparison slug is required' }, { status: 400 });
    }

    if (!browserId) {
      console.log('No browser ID provided, returning null vote');
      return NextResponse.json({ userVote: null });
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

    const userVote = await prisma.comparisonVote.findUnique({
      where: {
        comparisonId_browserId: {
          comparisonId,
          browserId
        }
      }
    });

    console.log('Comparison user vote found:', { slug, comparisonId, browserId, vote: userVote?.voteType || null });

    return NextResponse.json({
      userVote: userVote?.voteType || null
    });
    
  } catch (error) {
    console.error('Error fetching comparison user vote:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}