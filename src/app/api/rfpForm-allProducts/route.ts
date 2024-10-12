// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Fetch all product instances with their associated company info
    const products = await prisma.product.findMany({
      select: {
        id: true,
        userId: true,
        name: true,
        category: true,
        company: {
          select: {
            id: true,
            userId: true,
            companyName: true,
          },
        },
      },
    });

    return NextResponse.json(products); // Return the product and company data as JSON
  } catch (error) {
    console.error('Error fetching product data:', error);
    return NextResponse.json({ error: 'Unable to fetch data' }, { status: 500 });
  }
}
