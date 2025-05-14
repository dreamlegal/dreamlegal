import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email and password are required' 
      }, { status: 400 });
    }

    // Find the admin by email
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 });
    }

    // Update last login time
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    // Remove the password from the response
    const { password: _, ...adminWithoutPassword } = admin;

    // Set expiration time for 24 hours
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000;

    // Create response with cookies
    const response = NextResponse.json({ 
      success: true, 
      admin: adminWithoutPassword
    });

    // Set adminAuth cookie (separate from regular auth)
    cookies().set('adminAuth', JSON.stringify({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions,
      exp: expirationTime
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Login failed' 
    }, { status: 500 });
  }
}