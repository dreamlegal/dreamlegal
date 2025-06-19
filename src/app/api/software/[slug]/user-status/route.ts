// app/api/software/[slug]/user-status/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET endpoint to check user status and get user count
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Get the software by slug
    const software = await prisma.legalSoftware.findFirst({
      where: { slug }
    });

    if (!software) {
      return NextResponse.json(
        { error: 'Software not found' },
        { status: 404 }
      );
    }

    // Get total count of users using this software
    const userCount = await prisma.user.count({
      where: {
        usingSoftwareIds: {
          has: software.id
        }
      }
    });

    // Check if current user is using this software
    let isUserUsing = false;

    if (userId) {
      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { usingSoftwareIds: true }
      });

      isUserUsing = currentUser?.usingSoftwareIds?.includes(software.id) || false;
    }

    return NextResponse.json({
      userCount,
      isUserUsing,
      isAuthenticated: !!userId
    });

  } catch (error) {
    console.error('Error fetching user status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user status' },
      { status: 500 }
    );
  }
}

// POST endpoint to toggle user status
export async function POST(request, { params }) {
  try {
    const { slug } = params;
    const { isUsing, userId, vendorId } = await request.json();

    // Check if it's a vendor trying to save
    if (vendorId && !userId) {
      return NextResponse.json(
        { error: 'Vendors cannot save products' },
        { status: 403 }
      );
    }

    // Check if userId is provided
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the software by slug
    const software = await prisma.legalSoftware.findFirst({
      where: { slug }
    });

    if (!software) {
      return NextResponse.json(
        { error: 'Software not found' },
        { status: 404 }
      );
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, usingSoftwareIds: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user's usingSoftwareIds array
    let updatedSoftwareIds = [...(user.usingSoftwareIds || [])];
    
    if (isUsing) {
      // Add software ID if not already present
      if (!updatedSoftwareIds.includes(software.id)) {
        updatedSoftwareIds.push(software.id);
      }
    } else {
      // Remove software ID
      updatedSoftwareIds = updatedSoftwareIds.filter(id => id !== software.id);
    }

    // Update user in database
    await prisma.user.update({
      where: { id: user.id },
      data: { usingSoftwareIds: updatedSoftwareIds }
    });

    // Get updated user count
    const userCount = await prisma.user.count({
      where: {
        usingSoftwareIds: {
          has: software.id
        }
      }
    });

    return NextResponse.json({
      success: true,
      isUserUsing: isUsing,
      userCount
    });

  } catch (error) {
    console.error('Error toggling user status:', error);
    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    );
  }
}