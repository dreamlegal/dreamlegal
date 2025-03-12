
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request: Request) {
//   // Get the id from the request URL
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');
  
//   if (!id) {
//     return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
//   }
  
//   try {
//     // Fetch just the metadata fields for the blog
//     const blog = await prisma.blog.findFirst({
//       where: {
//         id: id,
//       },
//       select: {
//         title: true,
//         htmlTitle: true,
//         metaDescription: true,
//         ogTitle: true,
//         ogUrl: true,
//         ogImage: true,
//       },
//     });
    
//     if (!blog) {
//       return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
//     }
    
//     return NextResponse.json(blog);
//   } catch (error) {
//     console.error('Error fetching blog metadata:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';


export async function GET(request: Request) {
  // Get the slug from the request URL
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }
  
  try {
    // Fetch just the metadata fields for the blog
    const blog = await prisma.blog.findFirst({
      where: {
        slug: slug,
      },
      select: {
        title: true,
        htmlTitle: true,
        metaDescription: true,
        ogTitle: true,
        ogUrl: true,
        ogImage: true,
      },
    });
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog metadata:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}