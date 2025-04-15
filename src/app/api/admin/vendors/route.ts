// File: /app/api/admin/vendors/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build filter conditions - only show users with type = "vendor"
    let whereCondition = {
      type: "vendor"
    };

    // Search filter
    if (search) {
      whereCondition.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { 
          companyInfo: {
            some: {
              companyName: { contains: search, mode: 'insensitive' }
            }
          }
        }
      ];
    }

    // Get vendors with pagination
    const vendors = await prisma.user.findMany({
      where: whereCondition,
      include: {
        companyInfo: true,
        _count: {
          select: {
            Product: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const totalVendors = await prisma.user.count({ where: whereCondition });
    const totalPages = Math.ceil(totalVendors / limit);

    return NextResponse.json({
      vendors,
      pagination: {
        currentPage: page,
        totalPages,
        totalVendors,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 });
  }
}

