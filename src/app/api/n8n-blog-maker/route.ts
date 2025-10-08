import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { blogs } = body;

    if (!blogs || !Array.isArray(blogs)) {
      return NextResponse.json(
        { error: 'Invalid request: blogs array required' },
        { status: 400 }
      );
    }

    const createdBlogs = [];

    // Process each blog
    for (const blogData of blogs) {
      try {
        // Create slug from title if not provided
        const slug = blogData.slug || blogData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Create blog with relations
        const blog = await prisma.blog.create({
          data: {
            title: blogData.title,
            bannerImage: blogData.bannerImage || null,
            content: blogData.content, // HTML content
            category: blogData.category || [],
            published: false, // Save as draft
            publishedAt: null,
            htmlTitle: blogData.htmlTitle || blogData.title,
            metaDescription: blogData.metaDescription || blogData.summary,
            ogTitle: blogData.ogTitle || blogData.title,
            ogUrl: blogData.ogUrl || null,
            ogImage: blogData.ogImage || blogData.bannerImage || null,
            slug: slug,
            refLinks: {
              create: (blogData.refLinks || []).map((link: any) => ({
                title: link.title,
                url: link.url
              }))
            },
            tocItems: {
              create: (blogData.tocItems || []).map((item: any) => ({
                level: item.level,
                content: item.content,
                slug: item.slug
              }))
            }
          },
          include: {
            refLinks: true,
            tocItems: true
          }
        });

        createdBlogs.push(blog);
      } catch (blogError) {
        console.error(`Error creating blog "${blogData.title}":`, blogError);
        // Continue with other blogs even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdBlogs.length} blogs`,
      blogs: createdBlogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug
      }))
    });

  } catch (error) {
    console.error('Error in n8n-blog-maker:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}