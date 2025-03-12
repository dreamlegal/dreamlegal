// File: app/api/blogs/[id]/meta/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT method to update only meta data fields
export async function PUT(request, { params }) {
  try {
    const blogId = params.id;
    const metaData = await request.json();
    
    // Extract only meta data fields from request
    const { 
      htmlTitle,
      metaDescription,
      ogTitle,
      ogUrl,
      ogImage
    } = metaData;
    
    // Update only the meta data fields for the blog post
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        ...(htmlTitle !== undefined && { htmlTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(ogTitle !== undefined && { ogTitle }),
        ...(ogUrl !== undefined && { ogUrl }),
        ...(ogImage !== undefined && { ogImage })
      },
      // Return only meta data fields plus id for confirmation
      select: {
        id: true,
        htmlTitle: true,
        metaDescription: true,
        ogTitle: true,
        ogUrl: true,
        ogImage: true
      }
    });
    
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog meta data:', error);
    return NextResponse.json(
      { error: 'Failed to update blog meta data' },
      { status: 500 }
    );
  }
}

// GET method to retrieve only meta data fields
export async function GET(request, { params }) {
  try {
    const blogId = params.id;
    
    const blogMeta = await prisma.blog.findUnique({
      where: { id: blogId },
      select: {
        id: true,
        htmlTitle: true,
        metaDescription: true,
        ogTitle: true, 
        ogUrl: true,
        ogImage: true
      }
    });
    
    if (!blogMeta) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blogMeta);
  } catch (error) {
    console.error('Error retrieving blog meta data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve blog meta data' },
      { status: 500 }
    );
  }
}