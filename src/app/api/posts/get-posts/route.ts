// // import { NextResponse } from 'next/server';
// // import prisma from '@/lib/prisma';

// // export async function GET() {
// //   try {
// //     // First fetch all top-level posts
// //     const posts = await prisma.post.findMany({
// //       where: { parentId: null }, // Only fetch top-level posts (not replies)
// //       select: {
// //         id: true,
// //         userId: true,
// //         username: true,
// //         content: true,
// //         poll: true,
// //         views: true, // Make sure to include views
// //         upvotes: true,
// //         parentId: true,
// //         downvotes: true,
// //         categories: true,
// //         replyIds: true, // Include the replyIds array
// //         createdAt: true,
// //         updatedAt: true,
// //         user: {
// //           select: {
// //             id: true,
// //             name: true,
// //           },
// //         },
// //       },
// //       orderBy: {
// //         createdAt: 'desc', // Latest posts first
// //       },
// //     });

// //     // For each post, fetch its first-level replies
// //     const postsWithReplies = await Promise.all(posts.map(async (post) => {
// //       // Fetch direct replies to this post
// //       const replies = await prisma.post.findMany({
// //         where: { parentId: post.id },
// //         select: {
// //           id: true,
// //           userId: true,
// //           username: true,
// //           content: true, 
// //           parentId: true,
// //           views: true, // Include views in replies too
// //           replyIds: true,
// //           createdAt: true,
// //           updatedAt: true,
// //           user: {
// //             select: {
// //               id: true,
// //               name: true,
// //             },
// //           },
// //         },
// //         orderBy: {
// //           createdAt: 'asc', // Oldest replies first (chronological)
// //         },
// //       });

// //       // For each first-level reply, fetch its own replies (second level)
// //       const repliesWithNestedReplies = await Promise.all(replies.map(async (reply) => {
// //         const nestedReplies = await prisma.post.findMany({
// //           where: { parentId: reply.id },
// //           select: {
// //             id: true,
// //             userId: true,
// //             username: true,
// //             content: true,
// //             parentId: true,
// //             views: true, // Include views in nested replies
// //             createdAt: true,
// //             updatedAt: true,
// //             user: {
// //               select: {
// //                 id: true,
// //                 name: true,
// //               },
// //             },
// //           },
// //           orderBy: {
// //             createdAt: 'asc',
// //           },
// //           take: 3, // Limit to 3 nested replies for performance
// //         });

// //         // Add the nested replies to the reply object
// //         return {
// //           ...reply,
// //           replies: nestedReplies,
// //         };
// //       }));

// //       // Add the replies to the post object
// //       return {
// //         ...post,
// //         replies: repliesWithNestedReplies,
// //       };
// //     }));

// //     return NextResponse.json({ success: true, data: postsWithReplies }, { status: 200 });
// //   } catch (error) {
// //     console.error('Error fetching posts:', error);
// //     return NextResponse.json({ success: false, message: 'Error fetching posts' }, { status: 500 });
// //   }
// // }
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// // Helper function to count all replies (including nested ones)
// async function countAllReplies(postId) {
//   // Set to track all reply IDs we've counted
//   const countedReplyIds = new Set();
  
//   // Array to track post IDs we need to process
//   let postIdsToProcess = [postId];
  
//   // Process posts in batches
//   while (postIdsToProcess.length > 0) {
//     // Get the current batch of IDs
//     const currentBatchIds = [...postIdsToProcess];
//     postIdsToProcess = [];
    
//     // Fetch all posts in the current batch
//     const posts = await prisma.post.findMany({
//       where: { id: { in: currentBatchIds } },
//       select: { id: true, replyIds: true }
//     });
    
//     // Process each post
//     for (const post of posts) {
//       // Add all reply IDs to our process queue (if not already counted)
//       for (const replyId of post.replyIds) {
//         if (!countedReplyIds.has(replyId)) {
//           countedReplyIds.add(replyId);
//           postIdsToProcess.push(replyId);
//         }
//       }
//     }
//   }
  
//   return countedReplyIds.size;
// }

// export async function GET() {
//   try {
//     // First fetch all top-level posts
//     const posts = await prisma.post.findMany({
//       where: { parentId: null }, // Only fetch top-level posts (not replies)
//       select: {
//         id: true,
//         userId: true,
//         username: true,
//         content: true,
//         poll: true,
//         views: true, // Make sure to include views
//         upvotes: true,
//         parentId: true,
//         downvotes: true,
//         categories: true,
//         replyIds: true, // Include the replyIds array
//         createdAt: true,
//         updatedAt: true,
//         user: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'desc', // Latest posts first
//       },
//     });

//     // For each post, fetch its first-level replies and count total replies
//     const postsWithReplies = await Promise.all(posts.map(async (post) => {
//       // Count all replies (including nested ones)
//       const totalReplies = await countAllReplies(post.id);
      
//       // Fetch direct replies to this post
//       const replies = await prisma.post.findMany({
//         where: { parentId: post.id },
//         select: {
//           id: true,
//           userId: true,
//           username: true,
//           content: true, 
//           parentId: true,
//           views: true, // Include views in replies too
//           replyIds: true,
//           createdAt: true,
//           updatedAt: true,
//           user: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//         },
//         orderBy: {
//           createdAt: 'asc', // Oldest replies first (chronological)
//         },
//       });

//       // For each first-level reply, fetch its own replies (second level)
//       const repliesWithNestedReplies = await Promise.all(replies.map(async (reply) => {
//         const nestedReplies = await prisma.post.findMany({
//           where: { parentId: reply.id },
//           select: {
//             id: true,
//             userId: true,
//             username: true,
//             content: true,
//             parentId: true,
//             views: true, // Include views in nested replies
//             createdAt: true,
//             updatedAt: true,
//             user: {
//               select: {
//                 id: true,
//                 name: true,
//               },
//             },
//           },
//           orderBy: {
//             createdAt: 'asc',
//           },
//           take: 3, // Limit to 3 nested replies for performance
//         });

//         // Add the nested replies to the reply object
//         return {
//           ...reply,
//           replies: nestedReplies,
//         };
//       }));

//       // Add the replies and totalReplies to the post object
//       return {
//         ...post,
//         replies: repliesWithNestedReplies,
//         totalReplies: totalReplies
//       };
//     }));

//     return NextResponse.json({ success: true, data: postsWithReplies }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     return NextResponse.json({ success: false, message: 'Error fetching posts' }, { status: 500 });
//   }
// }
// app/api/posts/get-posts/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Define where clause for search
    let whereClause = { parentId: null }; // Only fetch top-level posts (not replies)
    
    // Add search condition if search query is provided
    if (search && search.trim() !== '') {
      // Search in content field (parse JSON strings to find text content)
      whereClause = {
        ...whereClause,
        content: {
          contains: search,
          mode: 'insensitive' // Case-insensitive search
        }
      };
    }
    
    // First fetch all top-level posts
    const posts = await prisma.post.findMany({
      where: whereClause,
      select: {
        id: true,
        userId: true,
        username: true,
        content: true,
        poll: true,
        views: true,
        upvotes: true,
        parentId: true,
        downvotes: true,
        categories: true,
        replyIds: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Latest posts first
      },
      skip: skip,
      take: limit,
    });
    
    // Count total replies for each post
    const postsWithReplyCount = await Promise.all(posts.map(async (post) => {
      // Count direct replies to this post
      const totalReplies = await prisma.post.count({
        where: { parentId: post.id }
      });
      
      return {
        ...post,
        totalReplies
      };
    }));
    
    return NextResponse.json({ success: true, data: postsWithReplyCount }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, message: 'Error fetching posts' }, { status: 500 });
  }
}