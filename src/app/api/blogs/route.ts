

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/blogs - Get all blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        refLinks: true
      }
    });
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' }, 
      { status: 500 }
    );
  }
}


    

// Helper function to generate a slug from title
function generateSlug(title:string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
}

// Helper function to ensure slug uniqueness
async function createUniqueSlug(title:string) {
  let slug = generateSlug(title);
  let originalSlug = slug;
  let counter = 1;
  
  // Check if slug exists, if it does, append a counter
  while (true) {
    const existingBlog = await prisma.blog.findUnique({
      where: { slug }
    });
    
    if (!existingBlog) break;
    
    // Slug exists, create a new one with counter
    slug = `${originalSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

export async function POST(request:Request) {
  try {
    const data = await request.json();
    
    // Generate a unique slug from the title
    const slug = await createUniqueSlug(data.title);
    
    const blogData = {
      title: data.title,
      category: Array.isArray(data.category) ? data.category : [data.category], // Ensure category is an array
      slug, // Add the generated slug
      bannerImage: data.bannerImage || null,
      content: '<p>Start writing your blog post...</p>',
      refLinks: {
        create: data.refLinks.map((link:any) => ({
          title: link.title,
          url: link.url
        }))
      }
    };
    
    const blog = await prisma.blog.create({
      data: blogData,
      include: {
        refLinks: true
      }
    });
    
    return NextResponse.json(blog, { status: 201 });

  } catch (error) {
    console.error('Failed to create blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' }, 
      { status: 500 }
    );
  }
}