// app/api/latest-blogs/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/latest-blogs - Get latest blogs from all categories
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    // Build the query - get all published blogs, ordered by latest first
    const query = {
      where: {
        published: true,
        publishedAt: {
          not: null
        }
      },
      orderBy: { 
        publishedAt: 'desc' 
      },
      select: {
        id: true,
        title: true,
        slug: true,
        bannerImage: true,
        publishedAt: true,
        createdAt: true,
        content: true,
        category: true
      },
      take: limit
    };

    // Execute the query
    const blogs = await prisma.blog.findMany(query);

    return NextResponse.json({
      blogs
    });
  } catch (error) {
    console.error('Failed to fetch latest blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest blogs', details: error.message }, 
      { status: 500 }
    );
  }
}