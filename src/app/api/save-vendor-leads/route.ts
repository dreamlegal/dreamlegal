// app/api/vendor-leads/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, email, message } = body;

    if (!companyName || !email) {
      return NextResponse.json(
        { error: 'Company name and email are required' },
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

    const newVendor = await prisma.vendorLeads.create({
      data: {
        companyName,
        email,
        message: message || null
      }
    });

    return NextResponse.json(
      { success: true, data: newVendor },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating vendor lead:', error);
    return NextResponse.json(
      { error: 'Failed to save vendor information' },
      { status: 500 }
    );
  }
}