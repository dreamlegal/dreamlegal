// app/api/comparisons/[slug]/vote-counts/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    console.log('Comparison Vote Counts API - Received slug:', slug);

    if (!slug) {
      return NextResponse.json({ message: 'Comparison slug is required' }, { status: 400 });
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

    // Count votes in real-time
    const [likesCount, dislikesCount] = await Promise.all([
      prisma.comparisonVote.count({
        where: {
          comparisonId,
          voteType: 'LIKE'
        }
      }),
      prisma.comparisonVote.count({
        where: {
          comparisonId,
          voteType: 'DISLIKE'
        }
      })
    ]);

    console.log('Comparison vote counts for:', { slug, comparisonId, likesCount, dislikesCount });

    return NextResponse.json({
      likes: likesCount,
      dislikes: dislikesCount
    });
    
  } catch (error) {
    console.error('Error fetching comparison vote counts:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}