import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/blogs/[id]/publish - Publish a blog
export async function POST(request, { params }) {
  try {
    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        published: true,
        publishedAt: new Date()
      }
    });
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Failed to publish blog:', error);
    return NextResponse.json(
      { error: 'Failed to publish blog' }, 
      { status: 500 }
    );
  }
}