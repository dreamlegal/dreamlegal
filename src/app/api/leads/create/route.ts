// app/api/leads/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, organization, designation, message } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if lead with this email already exists
    const existingLead = await prisma.commonLead.findFirst({
      where: { email }
    });

    let lead;
    
    if (existingLead) {
      // Update existing lead
      lead = await prisma.commonLead.update({
        where: { id: existingLead.id },
        data: {
          organization: organization || null,
          designation: designation || null,
          message: message || null,
        },
      });
    } else {
      // Create new lead
      lead = await prisma.commonLead.create({
        data: {
          email,
          organization: organization || null,
          designation: designation || null,
          message: message || null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: lead,
      message: 'Lead saved successfully'
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save lead', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}