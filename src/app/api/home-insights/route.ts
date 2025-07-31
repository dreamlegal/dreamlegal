import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 6;
    
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        bannerImage: true,
        content: true,
        category: true,
        publishedAt: true,
        createdAt: true,
        slug: true
      }
    });

    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}