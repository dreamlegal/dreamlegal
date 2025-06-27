// app/api/search-legal-software/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { searchTerm } = await request.json();
    
    // Return early if search term is too short
    if (!searchTerm || searchTerm.trim().length < 2) {
      return NextResponse.json({
        success: true,
        legalSoftware: []
      });
    }
    
    // Search query for legal software
    const legalSoftware = await prisma.legalSoftware.findMany({
      where: {
        OR: [
          { productName: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { companyName: { contains: searchTerm, mode: 'insensitive' } },
          { briefDescription: { contains: searchTerm, mode: 'insensitive' } },
          { coreFunctionalities: { hasSome: [searchTerm] } }
        ]
      },
      select: {
        id: true,
        productName: true,
        description: true,
        slug: true,
        logoUrl: true,
        category: true,
        companyName: true,
        headquarters: true,
        founded: true,
        website: true,
        pricingTier: true,
        startingPrice: true,
        vendorId: true,
        coreFunctionalities: true,
        briefDescription: true
      },
      take: 10, // Limit to 10 results for better performance
      orderBy: { productName: 'asc' }
    });

    return NextResponse.json({
      success: true,
      legalSoftware
    });

  } catch (error) {
    console.error('Error searching legal software:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to search legal software' },
      { status: 500 }
    );
  }
}