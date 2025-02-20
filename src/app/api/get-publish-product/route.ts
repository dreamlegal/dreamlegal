// // import prisma from "@/lib/prisma";


// // export async function GET(request: Request) {
// //   try {
// //     // Fetch all products where the 'active' field is 'published'
// //     const products = await prisma.product.findMany({
// //       where: {
// //         active: 'publish',
// //       },
// //     });

// //     return Response.json(
// //       {
// //         msg: "Published products fetched successfully",
// //         success: true,
// //         products,
// //       },
// //       {
// //         status: 200,
// //       }
// //     );
// //   } catch (error) {
// //     console.error(error);
// //     return Response.json(
// //       {
// //         msg: "An error occurred while fetching the products.",
// //         success: false,
// //       },
// //       {
// //         status: 500,
// //       }
// //     );
// //   }
// // }
// import prisma from "@/lib/prisma";

// export async function POST(request: Request) {
//   try {
//     // Fetch all products where the 'active' field is 'published' and order by latest
//     const products = await prisma.product.findMany({
//       where: {
//         active: 'publish',
//       },
//       orderBy: {
//         updatedAt: 'desc', // or 'createdAt' depending on your schema
//       },
//     });

//     return Response.json(
//       {
//         msg: "Published products fetched successfully",
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

// app/api/get-publish-product/route.ts
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { page = 1, limit = 10 } = await request.json();
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prisma.product.count({
      where: {
        active: 'publish'
      }
    });

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where: {
        active: 'publish'
      },
      take: limit,
      skip: skip,
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return Response.json(
      {
        msg: "Published products fetched successfully",
        success: true,
        products,
        total: totalCount,
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit)
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        msg: "An error occurred while fetching the products.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}