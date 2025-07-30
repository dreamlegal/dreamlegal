import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ products: [] });
    }

    const products = await prisma.legalSoftware.findMany({
      where: {
        productName: {
          contains: query,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        slug: true,
        productName: true,
        logoUrl: true,
        companyName: true,
        category: true
      },
      take: 10, // Limit results to 10
      orderBy: {
        productName: 'asc'
      }
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Product search error:', error);
    return NextResponse.json(
      { error: 'Failed to search products' }, 
      { status: 500 }
    );
  }
}