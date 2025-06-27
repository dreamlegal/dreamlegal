// app/api/admin/all-claims/route.js (Optional - if you want to see all claims including processed ones)
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { status = 'all', page = 1, limit = 20 } = await request.json();
    
    const skip = (page - 1) * limit;
    
    // Build where clause based on status filter
    const whereClause = status === 'all' ? {} : { status };
    
    // Fetch claims with pagination
    const [claims, total] = await Promise.all([
      prisma.legalSoftwareClaimRequest.findMany({
        where: whereClause,
        include: {
          legalSoftware: {
            select: {
              id: true,
              productName: true,
              logoUrl: true,
              slug: true,
              description: true,
              category: true,
              companyName: true,
              headquarters: true,
              website: true
            }
          },
          vendor: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'  
        },
        skip,
        take: limit
      }),
      prisma.legalSoftwareClaimRequest.count({
        where: whereClause
      })
    ]);

    return NextResponse.json({
      success: true,
      claims,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching all claims:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch claims' },
      { status: 500 }
    );
  }
}