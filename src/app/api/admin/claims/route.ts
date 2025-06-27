// app/api/admin/claims/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Fetch all legal software claims with related software and vendor information
    const claims = await prisma.legalSoftwareClaimRequest.findMany({
      where: {
        status: 'pending' // Only fetch pending claims for admin review
      },
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
      }
    });

    return NextResponse.json({
      success: true,
      claims
    });

  } catch (error) {
    console.error('Error fetching legal software claims:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch legal software claims' },
      { status: 500 }
    );
  }
}