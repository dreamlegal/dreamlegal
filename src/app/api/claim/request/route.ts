// app/api/legal-software/claim/request/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { legalSoftwareId, vendorId } = await request.json();
    
    if (!legalSoftwareId || !vendorId) {
      return NextResponse.json(
        { success: false, message: 'Legal Software ID and vendor ID are required' },
        { status: 400 }
      );
    }

    // Check if the legal software exists
    const legalSoftware = await prisma.legalSoftware.findUnique({
      where: { id: legalSoftwareId },
      select: { id: true, productName: true }
    });

    if (!legalSoftware) {
      return NextResponse.json(
        { success: false, message: 'Legal software not found' },
        { status: 404 }
      );
    }

    // Check if a claim already exists for this legal software/vendor combination
    const existingClaim = await prisma.legalSoftwareClaimRequest.findFirst({
      where: {
        legalSoftwareId,
        vendorId
      }
    });

    if (existingClaim) {
      return NextResponse.json(
        { success: false, message: 'You have already submitted a claim for this legal software' },
        { status: 400 }
      );
    }

    // Create the legal software claim request
    await prisma.legalSoftwareClaimRequest.create({
      data: {
        legalSoftwareId,
        vendorId,
        status: 'pending'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Legal software claim request submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting legal software claim:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit legal software claim request' },
      { status: 500 }
    );
  }
}