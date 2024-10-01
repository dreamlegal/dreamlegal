// import prisma from "@/lib/prisma";

// export async function GET(request: Request) {
//   try {
//     // Fetch all products where the 'active' field is 'draft'
//     const products = await prisma.product.findMany({
//       where: {
//         active: 'draft',
//       },
//     });

//     return Response.json(
//       {
//         msg: "Products fetched successfully",
//         success: true,
//         products,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return Response.json(
//       {
//         msg: "An error occurred while fetching the products.",
//         success: false,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// import prisma from "@/lib/prisma";

// export async function GET(request: Request) {
//   try {
//     // Fetch all products where the 'active' field is 'draft'
//     const products = await prisma.product.findMany({
//       where: {
//         active: 'draft',
//       },
//     });

//     return new Response(
//       JSON.stringify({
//         msg: "Products fetched successfully",
//         success: true,
//         products,
//       }),
//       {
//         status: 200,
//         headers: {
//           // Ensure the response is not cached
//           'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
//           'Pragma': 'no-cache',
//           'Expires': '0',
//           'Surrogate-Control': 'no-store',
//         },
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({
//         msg: "An error occurred while fetching the products.",
//         success: false,
//       }),
//       {
//         status: 500,
//         headers: {
//           // Also avoid caching in case of error
//           'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
//           'Pragma': 'no-cache',
//           'Expires': '0',
//           'Surrogate-Control': 'no-store',
//         },
//       }
//     );
//   }
// }

// authorisation issue commit 

import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Fetch all products where 'active' is 'draft'
    const products = await prisma.product.findMany({
      where: {
        active: 'draft',
      },
      orderBy: {
        createdAt: 'desc',  // Order by most recent products
      },
    });

    return new Response(
      JSON.stringify({
        msg: 'Products fetched successfully',
        success: true,
        products,
      }),
      {
        status: 200,
        headers: {
          // Ensure the response is not cached
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        msg: 'An error occurred while fetching the products.',
        success: false,
      }),
      {
        status: 500,
        headers: {
          // Also ensure no caching in case of error
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
        },
      }
    );
  }
}
