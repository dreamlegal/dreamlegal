// ===================================
// API ROUTE: app/api/legal-software/canvas/route.ts
// ===================================

import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const country = searchParams.get('country');

    // Build filter conditions
    const where: any = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (country && country !== 'all') {
      where.headquarters = country;
    }

    // Fetch all matching products
    const products = await prisma.legalSoftware.findMany({
      where,
      select: {
        id: true,
        productName: true,
        logoUrl: true,
        category: true,
        headquarters: true,
        description: true,
        companyName: true,
        isPremium: true,
        tag: true,
        slug: true
      },
      orderBy: [
        { isPremium: 'desc' },
        { productName: 'asc' }
      ]
    });

    // Get unique categories and countries for filters
    const [categoriesData, countriesData] = await Promise.all([
      prisma.legalSoftware.groupBy({
        by: ['category'],
        _count: { category: true }
      }),
      prisma.legalSoftware.groupBy({
        by: ['headquarters'],
        _count: { headquarters: true },
        orderBy: { headquarters: 'asc' }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products,
        filters: {
          categories: categoriesData.map(c => ({
            value: c.category,
            count: c._count.category
          })),
          countries: countriesData.map(c => ({
            value: c.headquarters,
            count: c._count.headquarters
          }))
        }
      }
    });

  } catch (error) {
    console.error('Canvas API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}