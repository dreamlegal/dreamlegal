// app/api/software/search/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ products: [] });
    }

    const searchTerm = query.trim().toLowerCase();

    // Search in product name, company name, and description
    const products = await prisma.legalSoftware.findMany({
      where: {
        OR: [
          {
            productName: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            companyName: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      select: {
        id: true,
        slug: true,
        productName: true,
        companyName: true,
        logoUrl: true,
        description: true
      },
      take: 10, // Limit results
      orderBy: {
        productName: 'asc'
      }
    });

    return NextResponse.json({ products });

  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' }, 
      { status: 500 }
    );
  }
}