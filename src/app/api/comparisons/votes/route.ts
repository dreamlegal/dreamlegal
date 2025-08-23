// app/api/comparisons/votes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Generate a browser ID if not exists
function getBrowserId(request: NextRequest): string {
  const browserId = request.cookies.get('browser_id')?.value;
  if (browserId) return browserId;
  
  // Generate new browser ID
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// GET - Fetch votes for comparison(s)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const comparisonIds = searchParams.get('comparisonIds')?.split(',') || [];
    
    if (comparisonIds.length === 0) {
      return NextResponse.json({ votes: {} });
    }

    const browserId = getBrowserId(request);

    // Get vote counts for each comparison
    const voteCounts = await prisma.comparisonVote.groupBy({
      by: ['comparisonId', 'voteType'],
      where: {
        comparisonId: {
          in: comparisonIds
        }
      },
      _count: {
        id: true
      }
    });

    // Get user's votes
    const userVotes = await prisma.comparisonVote.findMany({
      where: {
        comparisonId: {
          in: comparisonIds
        },
        browserId: browserId
      }
    });

    // Format response
    const votes: Record<string, {
      likes: number;
      dislikes: number;
      userVote: 'LIKE' | 'DISLIKE' | null;
    }> = {};

    // Initialize all comparison votes
    comparisonIds.forEach(id => {
      votes[id] = {
        likes: 0,
        dislikes: 0,
        userVote: null
      };
    });

    // Populate vote counts
    voteCounts.forEach(vote => {
      if (vote.voteType === 'LIKE') {
        votes[vote.comparisonId].likes = vote._count.id;
      } else if (vote.voteType === 'DISLIKE') {
        votes[vote.comparisonId].dislikes = vote._count.id;
      }
    });

    // Populate user votes
    userVotes.forEach(vote => {
      if (votes[vote.comparisonId]) {
        votes[vote.comparisonId].userVote = vote.voteType;
      }
    });

    return NextResponse.json({ votes });
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 });
  }
}

// POST - Submit a vote
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { comparisonId, voteType } = body;

    if (!comparisonId || !voteType || !['LIKE', 'DISLIKE'].includes(voteType)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const browserId = getBrowserId(request);

    // Check if user already voted
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
        // Remove vote if clicking the same button
        await prisma.comparisonVote.delete({
          where: {
            comparisonId_browserId: {
              comparisonId,
              browserId
            }
          }
        });
      } else {
        // Update vote if clicking different button
        await prisma.comparisonVote.update({
          where: {
            comparisonId_browserId: {
              comparisonId,
              browserId
            }
          },
          data: {
            voteType
          }
        });
      }
    } else {
      // Create new vote
      await prisma.comparisonVote.create({
        data: {
          comparisonId,
          browserId,
          voteType
        }
      });
    }

    // Get updated vote counts
    const voteCounts = await prisma.comparisonVote.groupBy({
      by: ['voteType'],
      where: {
        comparisonId
      },
      _count: {
        id: true
      }
    });

    const likes = voteCounts.find(v => v.voteType === 'LIKE')?._count.id || 0;
    const dislikes = voteCounts.find(v => v.voteType === 'DISLIKE')?._count.id || 0;

    // Get user's current vote
    const userVote = await prisma.comparisonVote.findUnique({
      where: {
        comparisonId_browserId: {
          comparisonId,
          browserId
        }
      }
    });

    const response = NextResponse.json({
      success: true,
      votes: {
        likes,
        dislikes,
        userVote: userVote?.voteType || null
      }
    });

    // Set browser ID cookie if it's new
    if (!request.cookies.get('browser_id')?.value) {
      response.cookies.set('browser_id', browserId, {
        maxAge: 365 * 24 * 60 * 60, // 1 year
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    }

    return response;
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json({ error: 'Failed to submit vote' }, { status: 500 });
  }
}