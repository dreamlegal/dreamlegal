// app/api/vendors/details/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { vendorIds } = await request.json();
    
    if (!vendorIds || !Array.isArray(vendorIds) || vendorIds.length === 0) {
      return NextResponse.json({ 
        success: false,
        message: 'Valid vendor IDs array is required' 
      }, { status: 400 });
    }

    // Get vendor details
    const vendors = await prisma.legalSoftware.findMany({
      where: {
        id: { in: vendorIds }
      },
      select: {
        id: true,
        productName: true,
        companyName: true,
        description: true,
        briefDescription: true,
        logoUrl: true,
        website: true,
        email: true,
        phone: true,
        headquarters: true,
        founded: true,
        pricingTier: true,
        startingPrice: true,
        pricingModel: true,
        freeTrial: true,
        bestKnownFor: true,
        topUseCases: true,
        coreFunctionalities: true,
        keyFeatures: true,
        targetUsers: true,
        primaryPurpose: true,
        userSatisfaction: true
      }
    });

    if (vendors.length === 0) {
      return NextResponse.json({ 
        success: false,
        message: 'No vendors found with provided IDs' 
      }, { status: 404 });
    }

    // Order vendors according to the input order (AI ranking)
    const orderedVendors = vendorIds
      .map(id => vendors.find(vendor => vendor.id === id))
      .filter(Boolean); // Remove any null/undefined entries

    return NextResponse.json({
      success: true,
      data: orderedVendors,
      meta: {
        total: orderedVendors.length,
        requested: vendorIds.length,
        found: vendors.length
      }
    });

  } catch (error) {
    console.error('Error fetching vendor details:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to fetch vendor details' 
    }, { status: 500 });
  }
}