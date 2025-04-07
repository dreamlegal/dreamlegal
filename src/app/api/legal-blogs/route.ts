import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        category: {
          has: "blog"
        },
        published: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        bannerImage: true,
        category: true,
        publishedAt: true,
        metaDescription: true,
        slug: true
      }
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch legal blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch legal blogs" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page = 1, limit = 9, search = "" } = body;
    
    const skip = (page - 1) * limit;
    
    // Build the where clause
    const where: any = {
      category: {
        has: "blog"
      },
      published: true
    };
    
    // Add search functionality if search parameter is provided
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          metaDescription: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }
    
    // Get total count for pagination
    const totalBlogs = await prisma.blog.count({ where });
    
    // Get blogs with pagination
    const blogs = await prisma.blog.findMany({
      where,
      orderBy: {
        publishedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        bannerImage: true,
        category: true,
        publishedAt: true,
        metaDescription: true,
        slug: true
      },
      skip,
      take: limit
    });
    
    return NextResponse.json({ 
      blogs, 
      pagination: {
        total: totalBlogs,
        page,
        limit,
        totalPages: Math.ceil(totalBlogs / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch legal blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch legal blogs" },
      { status: 500 }
    );
  }
}