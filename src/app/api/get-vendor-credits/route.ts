// In /app/api/credits/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Get credits for a vendor
export async function POST(request) {
  try {
    const { vendorId } = await request.json();

    if (!vendorId) {
      return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 });
    }

    const credits = await prisma.vendorCredits.findFirst({
      where: { vendorId },
    });

    if (!credits) {
      return NextResponse.json({ error: 'Credits not found' }, { status: 404 });
    }

    return NextResponse.json(credits);
  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 });
  }
}
