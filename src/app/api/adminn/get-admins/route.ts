import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/adminn/get-admins
 * 
 * Retrieves all admins in the system
 * No authentication required (for easy Postman testing)
 */
export async function GET() {
  try {
    // Get all admins from the database
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        permissions: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ 
      success: true, 
      count: admins.length,
      admins 
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch admins',
      error: error.message
    }, { status: 500 });
  }
}