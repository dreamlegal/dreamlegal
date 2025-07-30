
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

// GET - Get reaction counts for a blog
export async function GET(request, { params }) {
  try {
    const { id: blogId } = params;

    // Check if prisma is available
    if (!prisma) {
      console.error('Prisma client is not available');
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const reactions = await prisma.blogReaction.groupBy({
      by: ['reaction'],
      where: {
        blogId: blogId
      },
      _count: {
        reaction: true
      }
    });

    // Format the response - initialize with zero reactions
    const reactionCounts = {
      like: 0,
      love: 0,
      helpful: 0,
      insightful: 0
    };

    // Update counts from database (handles zero reactions case)
    reactions.forEach(reaction => {
      if (reactionCounts.hasOwnProperty(reaction.reaction)) {
        reactionCounts[reaction.reaction] = reaction._count.reaction;
      }
    });

    return NextResponse.json(reactionCounts);
  } catch (error) {
    console.error('Error fetching reactions:', error);
    
    // Return zero reactions as fallback
    return NextResponse.json({
      like: 0,
      love: 0,
      helpful: 0,
      insightful: 0
    });
  }
}

// POST - Add or remove a reaction
export async function POST(request, { params }) {
  try {
    const { id: blogId } = params;
    const body = await request.json();
    const { userId, vendorId, reaction } = body;

    // Check if prisma is available
    if (!prisma) {
      console.error('Prisma client is not available');
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    if (!userId && !vendorId) {
      return NextResponse.json(
        { error: 'User ID or Vendor ID is required' },
        { status: 400 }
      );
    }

    if (!['like', 'love', 'helpful', 'insightful'].includes(reaction)) {
      return NextResponse.json(
        { error: 'Invalid reaction type' },
        { status: 400 }
      );
    }

    // Build the where clause based on user type
    const whereClause = {
      blogId,
      reaction,
      ...(userId ? { userId } : { vendorId })
    };

    // Check if reaction already exists
    const existingReaction = await prisma.blogReaction.findFirst({
      where: whereClause
    });

    if (existingReaction) {
      // Remove the reaction (toggle off)
      await prisma.blogReaction.delete({
        where: {
          id: existingReaction.id
        }
      });

      return NextResponse.json({
        message: 'Reaction removed',
        action: 'removed'
      });
    } else {
      // Add the reaction
      await prisma.blogReaction.create({
        data: {
          blogId,
          reaction,
          ...(userId ? { userId } : { vendorId })
        }
      });

      return NextResponse.json({
        message: 'Reaction added',
        action: 'added'
      });
    }
  } catch (error) {
    console.error('Error managing reaction:', error);
    return NextResponse.json(
      { error: 'Failed to manage reaction' },
      { status: 500 }
    );
  }
}