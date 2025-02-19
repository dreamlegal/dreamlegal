// app/api/save-proposal-form/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { vendorId, formData } = await request.json();

    // Create new proposal with form data
    const proposal = await prisma.aiProposal.create({
      data: {
        vendorId,
        formData,
        status: 'UNSAVED'
      },
    });
   console.log("proposal id", proposal.id);
    return NextResponse.json({
      id: proposal.id,
      message: 'Form data saved successfully'
    });

  } catch (error) {
    console.error('Error saving form data:', error);
    return NextResponse.json(
      { error: 'Failed to save form data' },
      { status: 500 }
    );
  }
}
