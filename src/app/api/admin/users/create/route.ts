
// File: /app/api/admin/users/create/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.password || !data.organizationName || !data.organizationType || !data.teamSize) {
      return NextResponse.json(
        { error: 'Email, password, organization name, organization type, and team size are required' }, 
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new user account with profile
    const result = await prisma.$transaction(async (tx) => {
      // Create user with user type
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          type: "user",
          emailVerified: new Date() // Auto verify the user account
        },
      });

      // Create user account with organization details
      await tx.userAccount.create({
        data: {
          userId: user.id,
          CompanyAddress: data.organizationName,
          OrgType: data.organizationType,
          TeamSize: data.teamSize,
          Contact: data.contact || null,
          Location: data.location || null,
          Address: data.address || null
        }
      });

      return user;
    });

    return NextResponse.json({
      success: true,
      userId: result.id,
      email: result.email,
      type: result.type
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user account' }, { status: 500 });
  }
}
