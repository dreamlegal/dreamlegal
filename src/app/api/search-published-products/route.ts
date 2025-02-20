// app/api/search-published-products/route.ts
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { searchTerm, page = 1, limit = 10 } = await request.json();
    const skip = (page - 1) * limit;

    // Build the where clause for search
    const where = {
      active: "publish",
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { category: { hasSome: [searchTerm] } },
        { CompanyName: { contains: searchTerm, mode: 'insensitive' } }
      ]
    };

    // Get total count for pagination
    const totalCount = await prisma.product.count({
      where: searchTerm ? where : { active: "publish" }
    });

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where: searchTerm ? where : { active: "publish" },
      take: limit,
      skip: skip,
      orderBy: {
        updatedAt: 'desc'
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
    console.error('Error searching published products:', error);
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