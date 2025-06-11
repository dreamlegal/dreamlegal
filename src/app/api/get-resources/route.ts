// app/api/resources/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/resources - Get blogs from the 4 resource categories only
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const skip = (page - 1) * limit;
    const category = searchParams.get('category'); // Optional specific category filter

    // The 4 allowed categories for resources
    const allowedCategories = [
      "Industry Report",
      "Market Trends", 
      "Buyer Perspective Report",
      "Inspiration Stories"
    ];

    // Build the query - only get published blogs from these 4 categories
    const query = {
      where: {
        published: true,
        publishedAt: {
          not: null
        },
        // Only blogs that have at least one of the 4 resource categories
        category: {
          hasSome: allowedCategories
        },
        // If specific category requested, filter further
        ...(category && allowedCategories.includes(category) && { 
          category: {
            has: category,
          }
        })
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
    console.error('Failed to fetch resource blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource blogs', details: error.message }, 
      { status: 500 }
    );
  }
}