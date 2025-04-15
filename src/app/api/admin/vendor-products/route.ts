
// File: /app/api/admin/vendor-products/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');

    if (!vendorId) {
      return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 });
    }

    // Get all products for the specified vendor
    // Include both where userId = vendorId and where companyId is in vendor's companyInfo ids
    const vendor = await prisma.user.findUnique({
      where: { id: vendorId },
      include: {
        companyInfo: {
          select: { id: true }
        }
      }
    });
    
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }
    
    // Get company IDs
    const companyIds = vendor.companyInfo.map(company => company.id);
    
    // Find products where either userId matches OR companyId is in the list
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { userId: vendorId },
          { companyId: { in: companyIds.length > 0 ? companyIds : ['none'] } }
        ]
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching vendor products:', error);
    return NextResponse.json({ error: 'Failed to fetch vendor products' }, { status: 500 });
  }
}
