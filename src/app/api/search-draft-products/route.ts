// // app/api/search-draft-products/route.ts
// import prisma from "@/lib/prisma";
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const { searchTerm, page = 1, limit = 10 } = await request.json();
//     const skip = (page - 1) * limit;

//     // Build the where clause for draft products with search
//     const where = {
//       active: "draft",
//       OR: [
//         { name: { contains: searchTerm, mode: 'insensitive' } },
//         { description: { contains: searchTerm, mode: 'insensitive' } },
//         { category: { hasSome: [searchTerm] } },
//         { CompanyName: { contains: searchTerm, mode: 'insensitive' } }
//       ]
//     };

//     // Get total count for pagination
//     const totalCount = await prisma.product.count({
//       where: searchTerm ? where : { active: "draft" }
//     });

//     // Fetch products with pagination
//     const products = await prisma.product.findMany({
//       where: searchTerm ? where : { active: "draft" },
//       take: limit,
//       skip,
//       select: {
//         id: true,
//         name: true,
//         description: true,
//         slug: true,
//         logoUrl: true,
//         category: true,
//         active: true,
//         CompanyName: true,
//         createdAt: true,
//         completionRate: true,
//         isVendorVerified: true
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });

//     return NextResponse.json({
//       success: true,
//       products,
//       total: totalCount
//     });

//   } catch (error) {
//     console.error('Error searching draft products:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: 'Failed to search products'
//       },
//       { 
//         status: 500 
//       }
//     );
//   }
// }
// app/api/search-draft-products/route.ts
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { searchTerm, page = 1, limit = 10 } = await request.json();
    const skip = (page - 1) * limit;

    // Build the where clause for search
    const where = {
      active: "draft",
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { category: { hasSome: [searchTerm] } },
        { CompanyName: { contains: searchTerm, mode: 'insensitive' } }
      ]
    };

    // Get total count for pagination
    const totalCount = await prisma.product.count({
      where: searchTerm ? where : { active: "draft" }
    });

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where: searchTerm ? where : { active: "draft" },
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json({
      success: true,
      products,
      total: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });

  } catch (error) {
    console.error('Error searching draft products:', error);
    return Response.json(
      { 
        success: false, 
        message: 'Failed to search products'
      },
      { 
        status: 500 
      }
    );
  }
}