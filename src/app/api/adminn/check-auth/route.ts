import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get the adminAuth cookie
    const adminAuthCookie = cookies().get('adminAuth');
    
    if (!adminAuthCookie) {
      return NextResponse.json({ 
        success: false, 
        message: 'Not authenticated' 
      }, { status: 401 });
    }

    // Parse the adminAuth cookie
    try {
      const adminAuthData = JSON.parse(adminAuthCookie.value);
      
      // Check if cookie is expired
      if (adminAuthData.exp && adminAuthData.exp < Date.now()) {
        cookies().delete('adminAuth');
        return NextResponse.json({ 
          success: false, 
          message: 'Authentication expired' 
        }, { status: 401 });
      }
      
      // Get fresh admin data from database
      const admin = await prisma.admin.findUnique({
        where: { id: adminAuthData.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          permissions: true,
          createdAt: true,
          updatedAt: true,
          lastLoginAt: true,
        }
      });
      
      if (!admin) {
        cookies().delete('adminAuth');
        return NextResponse.json({ 
          success: false, 
          message: 'Admin not found' 
        }, { status: 401 });
      }
      
      return NextResponse.json({ 
        success: true, 
        admin 
      });
    } catch (error) {
      console.error('Error parsing adminAuth cookie:', error);
      cookies().delete('adminAuth');
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid authentication data' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Error checking admin auth:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Authentication check failed' 
    }, { status: 500 });
  }
}