// app/api/software/[slug]/experiences/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch user experiences for a product
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    // Get the software by slug (using findFirst since slug is not unique)
    const software = await prisma.legalSoftware.findFirst({
      where: { slug },
      select: { id: true }
    });

    if (!software) {
      return NextResponse.json({ error: 'Software not found' }, { status: 404 });
    }

    // Fetch all experiences for this product
    const experiences = await prisma.userExperience.findMany({
      where: { productId: software.id },
      select: {
        id: true,
        userId: true,
        beforeUsing: true,
        afterUsing: true,
        recommendationScore: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    // Check if current user has an experience
    let userExperience = null;
    if (userId) {
      userExperience = await prisma.userExperience.findUnique({
        where: {
          userId_productId: {
            userId,
            productId: software.id
          }
        }
      });
    }

    return NextResponse.json({
      experiences,
      userExperience,
      totalCount: experiences.length
    });

  } catch (error) {
    console.error('Error fetching user experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user experiences' }, 
      { status: 500 }
    );
  }
}

// POST - Create or update user experience
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { userId, beforeUsing, afterUsing, recommendationScore } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (!beforeUsing || !afterUsing || !recommendationScore) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (recommendationScore < 1 || recommendationScore > 10) {
      return NextResponse.json({ 
        error: 'Recommendation score must be between 1 and 10' 
      }, { status: 400 });
    }

    // Get the software by slug (using findFirst since slug is not unique)
    const software = await prisma.legalSoftware.findFirst({
      where: { slug },
      select: { id: true }
    });

    if (!software) {
      return NextResponse.json({ error: 'Software not found' }, { status: 404 });
    }

    // Create or update user experience
    const experience = await prisma.userExperience.upsert({
      where: {
        userId_productId: {
          userId,
          productId: software.id
        }
      },
      update: {
        beforeUsing,
        afterUsing,
        recommendationScore,
        updatedAt: new Date()
      },
      create: {
        userId,
        productId: software.id,
        beforeUsing,
        afterUsing,
        recommendationScore
      }
    });

    return NextResponse.json({
      success: true,
      experience,
      message: 'Experience saved successfully'
    });

  } catch (error) {
    console.error('Error saving user experience:', error);
    return NextResponse.json(
      { error: 'Failed to save user experience' }, 
      { status: 500 }
    );
  }
}

// DELETE - Remove user experience
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get the software by slug (using findFirst since slug is not unique)
    const software = await prisma.legalSoftware.findFirst({
      where: { slug },
      select: { id: true }
    });

    if (!software) {
      return NextResponse.json({ error: 'Software not found' }, { status: 404 });
    }

    // Delete user experience
    await prisma.userExperience.delete({
      where: {
        userId_productId: {
          userId,
          productId: software.id
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Experience removed successfully'
    });

  } catch (error) {
    console.error('Error deleting user experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete user experience' }, 
      { status: 500 }
    );
  }
}