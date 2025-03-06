// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       select: {
//         id: true,
//         userId: true,
//         username: true,
//         content: true,
//         poll: true,
//         views: true,
//         upvotes: true,
//         downvotes: true,
//         categories: true, // ✅ Fetches the enum array
//         replyIds: true,
//         createdAt: true,
//         updatedAt: true,
//         user: {
//           select: {
//             id: true,
//             name: true, // Adjust fields as needed
//           },
//         },
//       },
//     });

//     return NextResponse.json({ success: true, data: posts }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return NextResponse.json({ success: false, message: 'Error fetching posts' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { parentId: null }, // Only fetch top-level posts (not replies)
      select: {
        id: true,
        userId: true,
        username: true,
        content: true,
        poll: true,
        views: true,
        upvotes: true,
        downvotes: true,
        categories: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        replies: {  // ✅ Fetch first-level replies (nested replies will be loaded dynamically)
          select: {
            id: true,
            userId: true,
            username: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            replies: { // Fetch second-level replies if needed (limit depth for performance)
              select: {
                id: true,
                userId: true,
                username: true,
                content: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, message: 'Error fetching posts' }, { status: 500 });
  }
}
