
// File: /app/api/admin/vendor-company/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');

    if (!vendorId) {
      return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 });
    }

    // Get company info for the specified vendor
    const company = await prisma.companyInfo.findFirst({
      where: {
        userId: vendorId
      }
    });

    return NextResponse.json({ company });
  } catch (error) {
    console.error('Error fetching vendor company info:', error);
    return NextResponse.json({ error: 'Failed to fetch vendor company info' }, { status: 500 });
  }
}
