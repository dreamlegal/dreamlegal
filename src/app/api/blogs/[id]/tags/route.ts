import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Predefined locations that frontend will use
export const PREDEFINED_LOCATIONS = {
  // Main content
  HERO: 'hero',
  BELOW_HERO: 'below-hero',
  SECOND_COLLAGE: 'second-collage',
  ONE_LINE_SECTION: 'one-line-section',
  BEFORE_LATEST: 'before-latest',
  LATEST: 'latest',
  
  // Sidebar
  SIDEBAR_FIRST_MINI: 'sidebar-first-mini',
  SIDEBAR_MIDDLE_BIG: 'sidebar-middle-big',
  SIDEBAR_SECOND_MINI: 'sidebar-second-mini'
};

// GET /api/blogs/[id]/tags - Get all tags for a blog
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      select: { tags: true }
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      tags: blog.tags || [],
      availableLocations: Object.values(PREDEFINED_LOCATIONS)
    });
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' }, 
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id]/tags - Update tags for a blog
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { tags } = await request.json();
    
    // Validate tags structure
    if (!Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Tags must be an array' }, 
        { status: 400 }
      );
    }
    
    // Validate each tag
    const validLocations = Object.values(PREDEFINED_LOCATIONS);
    for (const tag of tags) {
      if (!tag.tag || typeof tag.tag !== 'string') {
        return NextResponse.json(
          { error: 'Each tag must have a "tag" string property' }, 
          { status: 400 }
        );
      }
      
      if (!tag.location || !validLocations.includes(tag.location)) {
        return NextResponse.json(
          { error: `Invalid location: ${tag.location}. Must be one of: ${validLocations.join(', ')}` }, 
          { status: 400 }
        );
      }
    }
    
    // Update blog with new tags
    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: { 
        tags: tags,
        updatedAt: new Date()
      },
      select: { 
        id: true, 
        title: true, 
        tags: true 
      }
    });
    
    return NextResponse.json({ 
      message: 'Tags updated successfully',
      blog 
    });
  } catch (error) {
    console.error('Failed to update tags:', error);
    return NextResponse.json(
      { error: 'Failed to update tags' }, 
      { status: 500 }
    );
  }
}

// POST /api/blogs/[id]/tags - Add a single tag
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { tag, location } = await request.json();
    
    // Validate inputs
    if (!tag || typeof tag !== 'string') {
      return NextResponse.json(
        { error: 'Tag name is required and must be a string' }, 
        { status: 400 }
      );
    }
    
    const validLocations = Object.values(PREDEFINED_LOCATIONS);
    if (!location || !validLocations.includes(location)) {
      return NextResponse.json(
        { error: `Invalid location. Must be one of: ${validLocations.join(', ')}` }, 
        { status: 400 }
      );
    }
    
    // Get current blog
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      select: { tags: true }
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' }, 
        { status: 404 }
      );
    }
    
    const currentTags = (blog.tags as any[]) || [];
    
    // Check if tag already exists
    const tagExists = currentTags.some(
      t => t.tag === tag && t.location === location
    );
    
    if (tagExists) {
      return NextResponse.json(
        { error: 'This tag with the same location already exists' }, 
        { status: 400 }
      );
    }
    
    // Add new tag
    const newTags = [...currentTags, { tag, location }];
    
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: { 
        tags: newTags,
        updatedAt: new Date()
      },
      select: { 
        id: true, 
        title: true, 
        tags: true 
      }
    });
    
    return NextResponse.json({ 
      message: 'Tag added successfully',
      blog: updatedBlog 
    });
  } catch (error) {
    console.error('Failed to add tag:', error);
    return NextResponse.json(
      { error: 'Failed to add tag' }, 
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id]/tags - Remove a specific tag
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const tagName = searchParams.get('tag');
    const location = searchParams.get('location');
    
    if (!tagName || !location) {
      return NextResponse.json(
        { error: 'Both tag and location query parameters are required' }, 
        { status: 400 }
      );
    }
    
    // Get current blog
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      select: { tags: true }
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' }, 
        { status: 404 }
      );
    }
    
    const currentTags = (blog.tags as any[]) || [];
    
    // Remove the tag
    const newTags = currentTags.filter(
      t => !(t.tag === tagName && t.location === location)
    );
    
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: { 
        tags: newTags,
        updatedAt: new Date()
      },
      select: { 
        id: true, 
        title: true, 
        tags: true 
      }
    });
    
    return NextResponse.json({ 
      message: 'Tag removed successfully',
      blog: updatedBlog 
    });
  } catch (error) {
    console.error('Failed to remove tag:', error);
    return NextResponse.json(
      { error: 'Failed to remove tag' }, 
      { status: 500 }
    );
  }
}