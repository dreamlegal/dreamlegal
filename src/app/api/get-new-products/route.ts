// import prisma from "@/lib/prisma";


// export async function POST(request: Request) {
//   try {
//     // Fetch all products where the 'active' field is 'draft'
//     const products = await prisma.product.findMany({
//       where: {
//         active: 'draft',
//       },
//       orderBy: {
//         createdAt: 'desc', // or 'createdAt' depending on your schema
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

// app/api/get-new-products/route.ts
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { page = 1, limit = 10 } = await request.json();
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await prisma.product.count({
      where: {
        active: 'draft'
      }
    });

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where: {
        active: 'draft'
      },
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(
      {
        msg: "Products fetched successfully",
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