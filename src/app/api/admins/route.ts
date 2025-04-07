// File: app/api/admins/route.js
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';

// GET: Fetch all admins
export async function GET() {
  try {
    const admins = await prisma.admins.findMany({
      select: {
        id: true,
        email: true,
        // Exclude returning password for security
        user: true
      }
    });
    
    return NextResponse.json({ success: true, data: admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

// POST: Create a new admin
export async function POST(request) {
  try {
    const { email, password, user } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Check if admin already exists
    const existingAdmin = await prisma.admins.findUnique({
      where: { email }
    });
    
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new admin
    const newAdmin = await prisma.admins.create({
      data: {
        email,
        password: hashedPassword,
        user: user || null
      }
    });
    
    // Remove password from response
    const { password: _, ...adminData } = newAdmin;
    
    return NextResponse.json(
      { success: true, data: adminData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}

// DELETE: Delete all admins
export async function DELETE() {
  try {
    // Consider adding authentication middleware before this endpoint
    await prisma.admins.deleteMany({});
    
    return NextResponse.json(
      { success: true, message: 'All admin records have been deleted' }
    );
  } catch (error) {
    console.error('Error deleting admins:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete admins' },
      { status: 500 }
    );
  }
}