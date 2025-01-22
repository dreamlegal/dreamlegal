// app/api/potential-lead-detailed/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, email, organisation } = body;

    if (!email || !role || !organisation) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newLead = await prisma.potentialLeadDetailed.create({
      data: {
        role,
        email,
        organisation
      },
    });

    return NextResponse.json(
      { success: true, data: newLead },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to save lead information' },
      { status: 500 }
    );
  }
}