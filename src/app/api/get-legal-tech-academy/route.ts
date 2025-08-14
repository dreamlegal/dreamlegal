// app/api/get-legal-tech-academy/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/get-legal-tech-academy - Get blogs from legal tech category only
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;

    // Build the query - only get published blogs from legal tech category
    const query = {
      where: {
        published: true,
        publishedAt: {
          not: null
        },
        // Only blogs that have legal tech category
        category: {
          has: "Legal Tech Academy"  // or whatever your exact category name is
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
    console.error('Failed to fetch legal tech academy blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch legal tech academy blogs', details: error.message }, 
      { status: 500 }
    );
  }
}