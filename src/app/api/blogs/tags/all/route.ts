import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/blogs/tags/all - Get all unique tags used across all blogs
export async function GET() {
  try {
    // Fetch all published blogs with tags
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { tags: true }
    });
    
    // Extract all unique tags
    const allTagsSet = new Set();
    const tagsByLocation = {};
    
    blogs.forEach(blog => {
      const tags = blog.tags as any[];
      if (Array.isArray(tags)) {
        tags.forEach(tag => {
          // Add to overall set
          allTagsSet.add(tag.tag);
          
          // Group by location
          if (!tagsByLocation[tag.location]) {
            tagsByLocation[tag.location] = new Set();
          }
          tagsByLocation[tag.location].add(tag.tag);
        });
      }
    });
    
    // Convert sets to arrays
    const allTags = Array.from(allTagsSet).sort();
    const tagsByLocationArray = {};
    Object.keys(tagsByLocation).forEach(location => {
      tagsByLocationArray[location] = Array.from(tagsByLocation[location]).sort();
    });
    
    return NextResponse.json({
      allTags,
      tagsByLocation: tagsByLocationArray,
      count: allTags.length
    });
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' }, 
      { status: 500 }
    );
  }
}