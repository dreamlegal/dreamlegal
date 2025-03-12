// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// // GET /api/blogs/[id] - Get a specific blog
// export async function GET(request, { params }) {
//     try {
//       const blog = await prisma.blog.findUnique({
//         where: { id: params.id },
//         include: {
//           refLinks: true,
//           tocItems: true
//         }
//       });
      
//       if (!blog) {
//         return NextResponse.json(
//           { error: 'Blog not found' }, 
//           { status: 404 }
//         );
//       }
//       console.log(blog)
//       return NextResponse.json(blog);
//     } catch (error) {
//       console.error('Failed to fetch blog:', error);
//       return NextResponse.json(
//         { error: 'Failed to fetch blog' }, 
//         { status: 500 }
//       );
//     }
//   }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/blogs/slug/[slug] - Get a specific blog by slug
export async function GET(request, { params }) {
    console.log('Request params:', params);
  try {
    // Extract the slug from params
    const { slug } = params;
    
    // Find the blog by slug instead of id
    const blog = await prisma.blog.findUnique({
      where: { slug: slug },
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
    
    console.log('Found blog by slug:', blog.title);
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Failed to fetch blog by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' }, 
      { status: 500 }
    );
  }
}