// /api/products/random/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count')) || 4;

    // Get random products
    const products = await prisma.legalSoftware.findMany({
      select: {
        id: true,
        slug: true,
        productName: true,
        logoUrl: true,
        companyName: true,
        category: true,
        description: true,
        pricingTier: true
      },
      take: count * 2, // Get more to randomize
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Shuffle and take the requested count
    const shuffled = products.sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, count);

    return NextResponse.json({ products: randomProducts });
  } catch (error) {
    console.error('Random products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch random products' }, 
      { status: 500 }
    );
  }
}