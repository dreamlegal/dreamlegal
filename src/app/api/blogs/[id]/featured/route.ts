import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/blogs/[id]/featured - Toggle featured status
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { featured } = await request.json();
    
    if (typeof featured !== 'boolean') {
      return NextResponse.json(
        { error: 'Featured must be a boolean value' }, 
        { status: 400 }
      );
    }
    
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: { 
        featured: featured,
        updatedAt: new Date()
      },
      select: { 
        id: true, 
        title: true, 
        featured: true,
        tags: true
      }
    });
    
    return NextResponse.json({ 
      message: `Blog ${featured ? 'marked as featured' : 'unmarked as featured'}`,
      blog: updatedBlog 
    });
  } catch (error) {
    console.error('Failed to update featured status:', error);
    return NextResponse.json(
      { error: 'Failed to update featured status' }, 
      { status: 500 }
    );
  }
}