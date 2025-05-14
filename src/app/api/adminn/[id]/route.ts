import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Update an admin
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Verify the current admin has permission to update admins
    const adminAuthCookie = cookies().get('adminAuth');
    if (!adminAuthCookie) {
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized: Admin authentication required' 
      }, { status: 401 });
    }

    let currentAdminId;
    try {
      const adminAuthData = JSON.parse(adminAuthCookie.value);
      // Only super admins can update admins
      if (adminAuthData.role !== 'super_admin') {
        return NextResponse.json({ 
          success: false, 
          message: 'Forbidden: Only super admins can update admins' 
        }, { status: 403 });
      }
      currentAdminId = adminAuthData.id;
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
    
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email is required' 
      }, { status: 400 });
    }

    // Check if admin exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      return NextResponse.json({ 
        success: false, 
        message: 'Admin not found' 
      }, { status: 404 });
    }

    // Prepare update data
    const updateData = {
      email,
      name,
      role,
      permissions,
      updatedAt: new Date()
    };

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Check if trying to downgrade self from super_admin
    if (id === currentAdminId && existingAdmin.role === 'super_admin' && role !== 'super_admin') {
      return NextResponse.json({ 
        success: false, 
        message: 'Cannot downgrade yourself from super_admin' 
      }, { status: 400 });
    }

    // Update the admin
    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: updateData,
    });

    // Remove the password from the response
    const { password: _, ...adminWithoutPassword } = updatedAdmin;

    return NextResponse.json({ 
      success: true, 
      admin: adminWithoutPassword 
    });
  } catch (error) {
    console.error('Error updating admin:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update admin' 
    }, { status: 500 });
  }
}

// Delete an admin
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Verify the current admin has permission to delete admins
    const adminAuthCookie = cookies().get('adminAuth');
    if (!adminAuthCookie) {
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized: Admin authentication required' 
      }, { status: 401 });
    }

    let currentAdminId;
    try {
      const adminAuthData = JSON.parse(adminAuthCookie.value);
      // Only super admins can delete admins
      if (adminAuthData.role !== 'super_admin') {
        return NextResponse.json({ 
          success: false, 
          message: 'Forbidden: Only super admins can delete admins' 
        }, { status: 403 });
      }
      currentAdminId = adminAuthData.id;
    } catch (error) {
      console.error('Error parsing admin auth cookie:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid authentication data' 
      }, { status: 401 });
    }

    // Check if admin exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!existingAdmin) {
      return NextResponse.json({ 
        success: false, 
        message: 'Admin not found' 
      }, { status: 404 });
    }

    // Prevent deleting yourself
    if (id === currentAdminId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Cannot delete yourself' 
      }, { status: 400 });
    }

    // Delete the admin
    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Admin deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to delete admin' 
    }, { status: 500 });
  }
}