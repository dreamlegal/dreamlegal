import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, contentType, contentName } = body;

    // Basic validation
    if (!email || !contentType || !contentName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create new entry
    const newContentEmail = await prisma.contentEmailLists.create({
      data: {
        email,
        contentType,
        contentName,
      },
    });

    return NextResponse.json(
      { 
        message: 'Email registered successfully',
        data: newContentEmail 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in content-email API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}