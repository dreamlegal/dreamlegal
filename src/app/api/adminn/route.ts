// This would be in your API routes folder, e.g., app/api/admin/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Create a new admin
export async function POST(request) {
  try {
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
