// app/api/vendor-credits/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vendorId } = body;

    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      );
    }

    // Calculate next renewal date (30 days from now)
    const nextRenewalDate = new Date();
    nextRenewalDate.setDate(nextRenewalDate.getDate() + 30);

    const vendorCredits = await prisma.vendorCredits.create({
      data: {
        vendorId,
        proposalCredits: 10,  // Default value
        validationCredits: 10, // Default value
        nextRenewalDate
      }
    });

    return NextResponse.json(
      { success: true, data: vendorCredits },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating vendor credits:', error);
    return NextResponse.json(
      { error: 'Failed to create vendor credits' },
      { status: 500 }
    );
  }
}