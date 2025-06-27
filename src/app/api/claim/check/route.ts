// app/api/legal-software/claims/check/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { vendorId, legalSoftwareIds } = await request.json();
    
    if (!vendorId || !legalSoftwareIds || !Array.isArray(legalSoftwareIds)) {
      return NextResponse.json(
        { success: false, message: 'Vendor ID and legal software IDs are required' },
        { status: 400 }
      );
    }

    // Get all existing claims for this vendor and the provided legal software IDs
    const existingClaims = await prisma.legalSoftwareClaimRequest.findMany({
      where: {
        vendorId,
        legalSoftwareId: {
          in: legalSoftwareIds
        }
      },
      select: {
        legalSoftwareId: true,
        status: true
      }
    });

    // Create a map of legalSoftwareId -> claim status
    const claimsMap = {};
    existingClaims.forEach(claim => {
      claimsMap[claim.legalSoftwareId] = claim.status;
    });

    return NextResponse.json({
      success: true,
      claims: claimsMap
    });

  } catch (error) {
    console.error('Error checking existing claims:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check existing claims' },
      { status: 500 }
    );
  }
}