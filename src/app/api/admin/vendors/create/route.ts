
// File: /app/api/admin/vendors/create/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
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

    // Create new vendor with company info if provided
    const result = await prisma.$transaction(async (tx) => {
      // Create user with vendor type
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          type: "vendor",
          emailVerified: new Date(), // Auto verify the vendor
        },
      });

      // Create company info if details are provided
      if (data.companyName) {
        await tx.companyInfo.create({
          data: {
            userId: user.id,
            companyName: data.companyName,
            website: data.website || null,
            yearFounded: data.yearFounded || null,
            headQuaters: data.headQuaters || null,
            NameOfFounders: data.nameOfFounders || null,
            contact: data.contact || null,
            TeamSize: data.teamSize || null
          }
        });
      }

      // Create vendor credits (30 days renewal)
      const nextRenewalDate = new Date();
      nextRenewalDate.setDate(nextRenewalDate.getDate() + 30);

      await tx.vendorCredits.create({
        data: {
          vendorId: user.id,
          proposalCredits: 10,
          validationCredits: 10,
          nextRenewalDate
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
    console.error('Error creating vendor:', error);
    return NextResponse.json({ error: 'Failed to create vendor account' }, { status: 500 });
  }
}