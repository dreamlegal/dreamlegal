
// File: /app/api/admin/vendors/update/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Validate required fields
    if (!data.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (data.updatePassword && !data.password) {
      return NextResponse.json({ error: 'Password is required when updating password' }, { status: 400 });
    }

    // Check if vendor exists
    const vendor = await prisma.user.findUnique({
      where: { id },
      include: { companyInfo: true }
    });

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    // Check if new email already exists (if changing email)
    if (data.email !== vendor.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }
    }

    // Update the vendor
    const updatedVendor = await prisma.$transaction(async (tx) => {
      // Update user details
      const userData = {
        email: data.email,
      };

      // Update password if requested
      if (data.updatePassword) {
        userData.password = await bcrypt.hash(data.password, 10);
      }

      const user = await tx.user.update({
        where: { id },
        data: userData
      });

      // Update company info if it exists, create if it doesn't
      if (vendor.companyInfo.length > 0) {
        await tx.companyInfo.update({
          where: { id: vendor.companyInfo[0].id },
          data: {
            companyName: data.companyName || vendor.companyInfo[0].companyName,
            website: data.website || vendor.companyInfo[0].website,
            yearFounded: data.yearFounded || vendor.companyInfo[0].yearFounded,
            headQuaters: data.headQuaters || vendor.companyInfo[0].headQuaters,
            NameOfFounders: data.nameOfFounders || vendor.companyInfo[0].NameOfFounders,
            contact: data.contact || vendor.companyInfo[0].contact,
            TeamSize: data.teamSize || vendor.companyInfo[0].TeamSize
          }
        });
      } else if (data.companyName) {
        // Create company info if not exists and data provided
        await tx.companyInfo.create({
          data: {
            userId: id,
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

      return user;
    });

    return NextResponse.json({
      success: true,
      userId: updatedVendor.id,
      email: updatedVendor.email,
      type: updatedVendor.type
    });
  } catch (error) {
    console.error('Error updating vendor:', error);
    return NextResponse.json({ error: 'Failed to update vendor account' }, { status: 500 });
  }
}
