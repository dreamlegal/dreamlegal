import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/blogs/[id] - Get a specific blog
export async function GET(request, { params }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        refLinks: true,
        tocItems: true
      }
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' }, 
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update a blog
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    
    // Prepare the data structure for Prisma
    const updateData = {
      title: data.title,
      bannerImage: data.bannerImage,
      content: data.content,
      updatedAt: new Date()
    };
    
    // Handle TOC items - delete existing ones and create new ones
    if (data.extractedToc && data.extractedToc.length > 0) {
      await prisma.tocItem.deleteMany({
        where: { blogId: params.id }
      });
      
      await prisma.tocItem.createMany({
        data: data.extractedToc.map(item => ({
          level: item.level,
          content: item.content,
          slug: item.id,
          blogId: params.id
        }))
      });
    }
    
    // Handle refLinks if provided
    if (data.refLinks && data.refLinks.length > 0) {
      // Delete existing refLinks
      await prisma.refLink.deleteMany({
        where: { blogId: params.id }
      });
      
      // Create new refLinks
      await prisma.refLink.createMany({
        data: data.refLinks.map(link => ({
          title: link.title,
          url: link.url,
          blogId: params.id
        }))
      });
    }
    
    // Update the blog
    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: updateData,
      include: {
        refLinks: true,
        tocItems: true
      }
    });
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Failed to update blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' }, 
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(request, { params }) {
  try {
    await prisma.blog.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Failed to delete blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' }, 
      { status: 500 }
    );
  }
}