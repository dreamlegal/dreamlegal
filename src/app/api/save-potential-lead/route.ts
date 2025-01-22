import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, typeOfLead } = body;

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Create new potential lead
    const newLead = await prisma.potentialLead.create({
      data: {
        email,
        typeOfLead: typeOfLead || 'user',
      },
    });

    return NextResponse.json(
      { 
        message: 'Email registered successfully',
        data: newLead 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in potential-lead API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}