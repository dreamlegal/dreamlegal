import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const exclude = searchParams.get('exclude'); // Comma-separated slugs to exclude

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        software: []
      });
    }

    const excludeSlugs = exclude ? exclude.split(',') : [];

    const software = await prisma.legalSoftware.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                productName: {
                  contains: query,
                  mode: 'insensitive'
                }
              },
              {
                companyName: {
                  contains: query,
                  mode: 'insensitive'
                }
              },
              {
                description: {
                  contains: query,
                  mode: 'insensitive'
                }
              }
            ]
          },
          {
            slug: {
              notIn: excludeSlugs
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
        category: true,
        description: true
      },
      take: 10,
      orderBy: {
        productName: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      software
    });

  } catch (error) {
    console.error('Software search error:', error);
    return NextResponse.json(
      { error: 'Failed to search software' },
      { status: 500 }
    );
  }
}