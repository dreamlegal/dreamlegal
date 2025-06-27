
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { searchTerm } = await request.json();
    
    // Return early if search term is too short
    if (!searchTerm || searchTerm.trim().length < 2) {
      return NextResponse.json({
        success: true,
        products: []
      });
    }
    
    // Simple search query focusing on product name and description
    const products = await prisma.product.findMany({
      where: {
        active: "publish",
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { category: { hasSome: [searchTerm] } }
        ]
      },
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        logoUrl: true,
        category: true,
        CompanyName: true,
        Headquarters: true,
        userId: true,
        company: {
          select: {
            companyName: true,
            headQuaters: true,
          }
        }
      },
      take: 10, // Limit to 10 results for better performance
      orderBy: { name: 'asc' }
    });

    // Check if any products are already claimed by this vendor
    // This could be done here or on the client side
    
    return NextResponse.json({
      success: true,
      products
    });

  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to search products' },
      { status: 500 }
    );
  }
}