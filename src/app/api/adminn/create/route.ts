import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Create a new admin
export async function POST(request) {
  try {
    // Verify the current admin has permission to create new admins
    const adminAuthCookie = cookies().get('adminAuth');
    if (!adminAuthCookie) {
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized: Admin authentication required' 
      }, { status: 401 });
    }

    try {
      const adminAuthData = JSON.parse(adminAuthCookie.value);
      // Only super admins can create new admins
      if (adminAuthData.role !== 'super_admin') {
        return NextResponse.json({ 
          success: false, 
          message: 'Forbidden: Only super admins can create new admins' 
        }, { status: 403 });
      }
    } catch (error) {
      console.error('Error parsing admin auth cookie:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid authentication data' 
      }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    
    // Validate the request
    const { email, password, name, role, permissions } = body;
    
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email and password are required' 
      }, { status: 400 });
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json({ 
        success: false, 
        message: 'Admin with this email already exists' 
      }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'editor',
        permissions: permissions || {}
      },
    });

    // Remove the password from the response
    const { password: _, ...adminWithoutPassword } = newAdmin;

    return NextResponse.json({ 
      success: true, 
      admin: adminWithoutPassword 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to create admin' 
    }, { status: 500 });
  }
}