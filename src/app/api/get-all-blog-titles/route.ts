// app/api/get-all-blog-titles/route.ts
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    // Get all blogs (both published and unpublished to avoid duplicates)
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        slug: true,
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Extract just the titles
    const titles = blogs.map(b => b.title);

    return Response.json({
      titles,
      count: titles.length,
      success: true
    });

  } catch (err) {
    console.error('Error fetching blog titles:', err);
    return Response.json({ 
      error: err.message,
      success: false 
    }, { status: 500 });
  }
}