
// // // // // app/api/similar-products/route.js
// // // // import { NextResponse } from 'next/server';
// // // // import prisma from '@/lib/prisma';

// // // // export async function GET(request) {
// // // //   try {
// // // //     const searchParams = request.nextUrl.searchParams;
// // // //     const category = searchParams.get('category');

// // // //     if (!category) {
// // // //       return NextResponse.json(
// // // //         { error: 'Category parameter is required' },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     const similarProducts = await prisma.product.findMany({
// // // //       where: {
// // // //         category: {
// // // //           has: category,
// // // //         },
// // // //         active: "published",
// // // //       },
// // // //       select: {
// // // //         name: true,
// // // //         slug: true,
// // // //         logoUrl: true,
// // // //       },
// // // //       take: 3,
// // // //       orderBy: {
// // // //         createdAt: 'desc',
// // // //       },
// // // //     });

// // // //     return NextResponse.json(similarProducts);
// // // //   } catch (error) {
// // // //     console.error('Error fetching similar products:', error);
// // // //     return NextResponse.json(
// // // //       { error: 'Failed to fetch similar products' },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // app/api/get-similar-products/route.js
// // // import { NextResponse } from 'next/server';
// // // import prisma from '@/lib/prisma';

// // // export async function GET(request) {
// // //   try {
// // //     const searchParams = request.nextUrl.searchParams;
// // //     const category = searchParams.get('category');

// // //     if (!category) {
// // //       return NextResponse.json(
// // //         { error: 'Category parameter is required' },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // Find products that have this category in their category array
// // //     const similarProducts = await prisma.product.findMany({
// // //       where: {
// // //         category: {
// // //           hasSome: [category], // This matches if the category array contains the specified category
// // //         },
// // //         active: "published",
// // //       },
// // //       select: {
// // //         name: true,
// // //         slug: true,
// // //         logoUrl: true,
// // //       },
// // //       take: 3,
// // //       orderBy: {
// // //         createdAt: 'desc',
// // //       },
// // //     });

// // //     return NextResponse.json(similarProducts);
// // //   } catch (error) {
// // //     console.error('Error fetching similar products:', error);
// // //     return NextResponse.json(
// // //       { error: 'Failed to fetch similar products' },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // // app/api/get-similar-products/route.js
// // import { NextResponse } from 'next/server';
// // import prisma from '@/lib/prisma';

// // export async function GET(request) {
// //   try {
// //     const searchParams = request.nextUrl.searchParams;
// //     const category = searchParams.get('category');

// //     console.log('Requested category:', category); // Debug log

// //     if (!category) {
// //       return NextResponse.json(
// //         { error: 'Category parameter is required' },
// //         { status: 400 }
// //       );
// //     }

// //     // Find products that have this category in their category array
// //     // Exclude the current product if its ID is provided
// //     const similarProducts = await prisma.product.findMany({
// //       where: {
// //         AND: [
// //           {
// //             category: {
// //               hasSome: [category],
// //             },
// //           },
// //           {
// //             active: "published",
// //           },
// //         ],
// //       },
// //       select: {
// //         id: true,
// //         name: true,
// //         slug: true,
// //         logoUrl: true,
// //         category: true, // Include category for debugging
// //       },
// //       take: 3,
// //       orderBy: {
// //         createdAt: 'desc',
// //       },
// //     });

// //     console.log('Found products:', similarProducts); // Debug log

// //     return NextResponse.json(similarProducts);
// //   } catch (error) {
// //     console.error('Error details:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to fetch similar products', details: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }

// // app/api/get-similar-products/route.js
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const category = searchParams.get('category');

//     console.log('Requested category:', category);

//     if (!category) {
//       return NextResponse.json(
//         { error: 'Category parameter is required' },
//         { status: 400 }
//       );
//     }

//     // Find similar products
//     const similarProducts = await prisma.product.findMany({
//       where: {
//         AND: [
//           {
//             category: {
//               array_contains: [category]  // Using array_contains for exact match
//             }
//           },
//           {
//             active: "publish"  // Changed from "published" to "publish"
//           },
//           {
//             NOT: {
//               id: request.nextUrl.searchParams.get('currentId') // Optionally exclude current product
//             }
//           }
//         ]
//       },
//       select: {
//         name: true,
//         slug: true,
//         logoUrl: true,
//       },
//       take: 3,
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     console.log('Found products:', similarProducts);

//     return NextResponse.json(similarProducts);
//   } catch (error) {
//     console.error('Error in get-similar-products:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch similar products', details: error.message },
//       { status: 500 }
//     );
//   }
// }
// app/api/get-similar-products/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// In your /api/get-similar-products route file
export const dynamic = 'force-dynamic'  // Add this at the top of the file
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const currentId = searchParams.get('currentId');

    console.log('Requested category:', category);

    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }

    // Build the where clause
    const whereClause = {
      AND: [
        {
          category: {
            has: category
          }
        },
        {
          active: "publish"
        }
      ]
    };

    // Only add the NOT condition if currentId is provided
    if (currentId) {
      whereClause.AND.push({
        NOT: {
          id: currentId
        }
      });
    }

    const similarProducts = await prisma.product.findMany({
      where: whereClause,
      select: {
        name: true,
        slug: true,
        logoUrl: true,
      },
      take: 3,
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('Found products:', similarProducts);

    return NextResponse.json(similarProducts);
  } catch (error) {
    console.error('Error in get-similar-products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch similar products', details: error.message },
      { status: 500 }
    );
  }
}