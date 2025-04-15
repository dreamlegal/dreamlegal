
// File: /app/api/admin/user-stats/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            SaveProduct: true,
            Review: true,
            Post: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get last activity timestamp
    // Check multiple activities to determine the most recent one
    const lastReview = await prisma.review.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true }
    });

    const lastPost = await prisma.post.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true }
    });

    // Find the most recent activity timestamp
    let lastActivity = user.updatedAt;
    if (lastReview && lastReview.updatedAt > lastActivity) {
      lastActivity = lastReview.updatedAt;
    }
    if (lastPost && lastPost.updatedAt > lastActivity) {
      lastActivity = lastPost.updatedAt;
    }

    // Build stats object
    const stats = {
      totalSavedProducts: user._count.SaveProduct,
      totalReviews: user._count.Review,
      totalPosts: user._count.Post,
      lastActivity
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 });
  }
}
