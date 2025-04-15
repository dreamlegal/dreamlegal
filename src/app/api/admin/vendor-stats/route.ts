
// File: /app/api/admin/vendor-stats/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');

    if (!vendorId) {
      return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 });
    }

    // Get vendor with company info
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
    
    // Find products related to this vendor
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { userId: vendorId },
          { companyId: { in: companyIds.length > 0 ? companyIds : ['none'] } }
        ]
      },
      select: {
        id: true,
        createdAt: true,
        completionRate: true
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Calculate total products
    const totalProducts = products.length;
    
    // Get last product date
    const lastProductDate = totalProducts > 0 ? products[0].createdAt : null;
    
    // Calculate average completion rate
    let completionRate = 0;
    if (totalProducts > 0) {
      completionRate = Math.round(
        products.reduce((sum, product) => sum + (product.completionRate || 0), 0) / totalProducts
      );
    }
    
    // Get product views and leads
    let totalViews = 0;
    let lastViewDate = null;
    let totalLeads = 0;
    
    if (totalProducts > 0) {
      // Get product IDs
      const productIds = products.map(product => product.id);
      
      // Count views
      const viewsData = await prisma.productView.findMany({
        where: {
          productId: { in: productIds }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      totalViews = viewsData.length;
      lastViewDate = viewsData.length > 0 ? viewsData[0].createdAt : null;
      
      // Count leads (bookings)
      const leadsCount = await prisma.booking.count({
        where: {
          productId: { in: productIds }
        }
      });
      
      totalLeads = leadsCount;
    }
    
    return NextResponse.json({
      stats: {
        totalProducts,
        completionRate,
        totalViews,
        totalLeads,
        lastProductDate,
        lastViewDate
      }
    });
  } catch (error) {
    console.error('Error fetching vendor stats:', error);
    return NextResponse.json({ error: 'Failed to fetch vendor stats' }, { status: 500 });
  }
}