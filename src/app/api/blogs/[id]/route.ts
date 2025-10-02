import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper function to check slug uniqueness during update
async function isSlugUnique(slug, blogId) {
  // Check if slug exists for any blog EXCEPT the current one being updated
  const existingBlog = await prisma.blog.findFirst({
    where: {
      slug: slug,
      id: { not: blogId }
    }
  });
  
  // Return true if no blog with this slug was found (meaning it's unique)
  return !existingBlog;
}

// Helper function to generate a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    
    // Apply slug formatting to the provided slug
    let slug = data.slug;
    if (slug) {
      slug = generateSlug(slug);
    }
    
    // If we have a slug (either provided or generated), validate its uniqueness
    if (slug) {
      const slugIsUnique = await isSlugUnique(slug, params.id);
      
      if (!slugIsUnique) {
        // If the slug isn't unique, try to make it unique by adding a timestamp
        const timestamp = new Date().getTime().toString().slice(-4);
        slug = `${slug}-${timestamp}`;
        
        // Double-check that our modified slug is unique
        const modifiedSlugIsUnique = await isSlugUnique(slug, params.id);
        
        if (!modifiedSlugIsUnique) {
          return NextResponse.json(
            { error: 'This slug already exists. Please try using a different slug, for example by adding a hyphen (-) or underscore (_).' }, 
            { status: 400 }
          );
        }
      }
    }
    
    // Prepare the data structure for Prisma
    const updateData = {
      title: data.title,
      slug: slug, // Use our generated or validated slug
      bannerImage: data.bannerImage,
      content: data.content,
      updatedAt: new Date()
    };
    
    console.log('data', data);
    
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
      console.log(blog)
      return NextResponse.json(blog);
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog' }, 
        { status: 500 }
      );
    }
  }
