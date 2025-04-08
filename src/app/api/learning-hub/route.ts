// // import { NextRequest, NextResponse } from "next/server";
// // import prisma from "@/lib/prisma";

// // export async function GET() {
// //   try {
// //     const blogs = await prisma.blog.findMany({
// //       where: {
// //         published: true
// //       },
// //       orderBy: {
// //         publishedAt: 'desc'
// //       },
// //       select: {
// //         id: true,
// //         title: true,
// //         bannerImage: true,
// //         category: true,
// //         publishedAt: true,
// //         metaDescription: true,
// //         slug: true
// //       }
// //     });

// //     return NextResponse.json({ blogs }, { status: 200 });
// //   } catch (error) {
// //     console.error("Failed to fetch learning hub resources:", error);
// //     return NextResponse.json(
// //       { error: "Failed to fetch learning hub resources" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // Handle POST requests for filtering, search and pagination
// // export async function POST(request: NextRequest) {
// //   try {
// //     const body = await request.json();
// //     const { page = 1, limit = 9, search = "", category = null } = body;
    
// //     const skip = (page - 1) * limit;
    
// //     // Build the where clause
// //     const where: any = {
// //       published: true
// //     };
    
// //     // Add category filtering if specified
// //     if (category) {
// //       where.category = {
// //         has: category
// //       };
// //     }
    
// //     // Add search functionality if search parameter is provided
// //     if (search) {
// //       where.OR = [
// //         {
// //           title: {
// //             contains: search,
// //             mode: 'insensitive'
// //           }
// //         },
// //         {
// //           metaDescription: {
// //             contains: search,
// //             mode: 'insensitive'
// //           }
// //         },
// //         {
// //           content: {
// //             contains: search,
// //             mode: 'insensitive'
// //           }
// //         }
// //       ];
// //     }
    
// //     // Get total count for pagination
// //     const totalBlogs = await prisma.blog.count({ where });
    
// //     // Get blogs with pagination
// //     const blogs = await prisma.blog.findMany({
// //       where,
// //       orderBy: {
// //         publishedAt: 'desc'
// //       },
// //       select: {
// //         id: true,
// //         title: true,
// //         bannerImage: true,
// //         category: true,
// //         publishedAt: true,
// //         metaDescription: true,
// //         slug: true
// //       },
// //       skip,
// //       take: limit
// //     });
    
// //     return NextResponse.json({ 
// //       blogs, 
// //       pagination: {
// //         total: totalBlogs,
// //         page,
// //         limit,
// //         totalPages: Math.ceil(totalBlogs / limit)
// //       }
// //     }, { status: 200 });
// //   } catch (error) {
// //     console.error("Failed to fetch learning hub resources:", error);
// //     return NextResponse.json(
// //       { error: "Failed to fetch learning hub resources" },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET() {
//   try {
//     const blogs = await prisma.blog.findMany({
//       where: {
//         published: true
//       },
//       orderBy: {
//         publishedAt: 'desc'
//       },
//       select: {
//         id: true,
//         title: true,
//         bannerImage: true,
//         category: true,
//         publishedAt: true,
//         metaDescription: true,
//         slug: true
//       }
//     });

//     return NextResponse.json({ blogs }, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch learning hub resources:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch learning hub resources" },
//       { status: 500 }
//     );
//   }
// }

// // Handle POST requests for filtering, search and pagination
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { page = 1, limit = 9, search = "", category = null } = body;
    
//     const skip = (page - 1) * limit;
    
//     // Build the where clause
//     const where: any = {
//       published: true
//     };
    
//     // Add category filtering if specified
//     if (category) {
//       where.category = {
//         has: category
//       };
//     }
    
//     // Add search functionality if search parameter is provided
//     if (search) {
//       where.OR = [
//         {
//           title: {
//             contains: search,
//             mode: 'insensitive'
//           }
//         },
//         {
//           metaDescription: {
//             contains: search,
//             mode: 'insensitive'
//           }
//         },
//         {
//           content: {
//             contains: search,
//             mode: 'insensitive'
//           }
//         }
//       ];
//     }
    
//     // Get total count for pagination
//     const totalBlogs = await prisma.blog.count({ where });
    
//     // Get blogs with pagination
//     const blogs = await prisma.blog.findMany({
//       where,
//       orderBy: {
//         publishedAt: 'desc'
//       },
//       select: {
//         id: true,
//         title: true,
//         bannerImage: true,
//         category: true,
//         publishedAt: true,
//         metaDescription: true,
//         slug: true
//       },
//       skip,
//       take: limit
//     });
    
//     return NextResponse.json({ 
//       blogs, 
//       pagination: {
//         total: totalBlogs,
//         page,
//         limit,
//         totalPages: Math.ceil(totalBlogs / limit)
//       }
//     }, { status: 200 });
//   } catch (error) {
//     console.error("Failed to fetch learning hub resources:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch learning hub resources" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
        // Exclude blogs with specific categories
        NOT: {
          OR: [
            { category: { has: "blog" } },
            { category: { has: "industry-report" } },
            { category: { has: "market-trends" } },
            { category: { has: "buyer-perspective-report" } },
            { category: { has: "inspiration-stories" } }
          ]
        }
      },
      orderBy: {
        publishedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        bannerImage: true,
        category: true,
        publishedAt: true,
        metaDescription: true,
        slug: true
      }
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch learning hub resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning hub resources" },
      { status: 500 }
    );
  }
}

// Handle POST requests for filtering, search and pagination
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page = 1, limit = 9, search = "", category = null } = body;
    
    const skip = (page - 1) * limit;
    
    // Build the where clause
    const where: any = {
      published: true,
      // Exclude blogs with specific categories
      NOT: {
        OR: [
          { category: { has: "blog" } },
          { category: { has: "industry-report" } },
          { category: { has: "market-trends" } },
          { category: { has: "buyer-perspective-report" } },
          { category: { has: "inspiration-stories" } }
        ]
      }
    };
    
    // Add category filtering if specified
    if (category) {
      where.category = {
        has: category
      };
    }
    
    // Add search functionality if search parameter is provided
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          metaDescription: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }
    
    // Get total count for pagination
    const totalBlogs = await prisma.blog.count({ where });
    
    // Get blogs with pagination
    const blogs = await prisma.blog.findMany({
      where,
      orderBy: {
        publishedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        bannerImage: true,
        category: true,
        publishedAt: true,
        metaDescription: true,
        slug: true
      },
      skip,
      take: limit
    });
    
    return NextResponse.json({ 
      blogs, 
      pagination: {
        total: totalBlogs,
        page,
        limit,
        totalPages: Math.ceil(totalBlogs / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch learning hub resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning hub resources" },
      { status: 500 }
    );
  }
}