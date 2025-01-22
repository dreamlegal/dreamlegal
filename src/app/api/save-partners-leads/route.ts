// app/api/partners-leads/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, email } = body;

    if (!name || !category || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const newPartner = await prisma.partnersLeads.create({
      data: {
        name,
        category,
        email
      }
    });

    return NextResponse.json(
      { success: true, data: newPartner },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating partner lead:', error);
    return NextResponse.json(
      { error: 'Failed to save partner information' },
      { status: 500 }
    );
  }
}