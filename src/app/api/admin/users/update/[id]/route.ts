
// File: /app/api/admin/users/update/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.organizationName || !data.organizationType || !data.teamSize) {
      return NextResponse.json({ 
        error: 'Email, organization name, organization type, and team size are required' 
      }, { status: 400 });
    }

    if (data.updatePassword && !data.password) {
      return NextResponse.json({ error: 'Password is required when updating password' }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
      include: { userAccount: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if new email already exists (if changing email)
    if (data.email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }
    }

    // Update the user
    const updatedUser = await prisma.$transaction(async (tx) => {
      // Update user details
      const userData = {
        email: data.email,
      };

      // Update password if requested
      if (data.updatePassword) {
        userData.password = await bcrypt.hash(data.password, 10);
      }

      const updatedUser = await tx.user.update({
        where: { id },
        data: userData
      });

      // Update user account if it exists, create if it doesn't
      if (user.userAccount.length > 0) {
        await tx.userAccount.update({
          where: { id: user.userAccount[0].id },
          data: {
            CompanyAddress: data.organizationName,
            OrgType: data.organizationType,
            TeamSize: data.teamSize,
            Contact: data.contact || user.userAccount[0].Contact,
            Location: data.location || user.userAccount[0].Location,
            Address: data.address || user.userAccount[0].Address
          }
        });
      } else {
        // Create user account if not exists
        await tx.userAccount.create({
          data: {
            userId: id,
            CompanyAddress: data.organizationName,
            OrgType: data.organizationType,
            TeamSize: data.teamSize,
            Contact: data.contact || null,
            Location: data.location || null,
            Address: data.address || null
          }
        });
      }

      return updatedUser;
    });

    return NextResponse.json({
      success: true,
      userId: updatedUser.id,
      email: updatedUser.email,
      type: updatedUser.type
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user account' }, { status: 500 });
  }
}
