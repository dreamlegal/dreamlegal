import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/blogs - Get all published blogs, sorted by latest first
export async function GET(request) {
  try {
    // Get pagination parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;

    // Build the query - only get published blogs
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
      include: {
        refLinks: true,
        tocItems: {
          orderBy: {
            level: 'asc'
          }
        }
      },
      take: limit,
      skip: skip
    };

    // Execute the query
    const blogs = await prisma.blog.findMany(query);
    
    // Get total count for pagination
    const totalCount = await prisma.blog.count({
      where: query.where
    });

    return NextResponse.json({
      blogs,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs', details: error.message }, 
      { status: 500 }
    );
  }
}