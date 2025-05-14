import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Verify the current admin has permission to list admins
    const adminAuthCookie = cookies().get('adminAuth');
    if (!adminAuthCookie) {
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized: Admin authentication required' 
      }, { status: 401 });
    }

    try {
      const adminAuthData = JSON.parse(adminAuthCookie.value);
      // Only super admins can list all admins
      if (adminAuthData.role !== 'super_admin') {
        return NextResponse.json({ 
          success: false, 
          message: 'Forbidden: Only super admins can view all admins' 
        }, { status: 403 });
      }
    } catch (error) {
      console.error('Error parsing admin auth cookie:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid authentication data' 
      }, { status: 401 });
    }

    // Get all admins
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
      admins 
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch admins' 
    }, { status: 500 });
  }
}