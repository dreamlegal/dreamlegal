import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      userOrgType,
      userTeamSize,
      customisation,
      urgency,
      budget,
      selectedFeatures,
      vendors
    } = body;

    // Save the data to the database
    const rfp = await prisma.rfpForm.create({
      data: {
        userID: userId,
        userOrgType,
        userTeamSize,
        customisation,
        urgency,
        budget,
        features: selectedFeatures,
        vendors,
      },
    });

    // Respond with success and the created data
    return NextResponse.json({ success: true, data: rfp }, { status: 200 });
  } catch (error) {
    console.error('Error submitting RFP:', error);
    // Respond with an error
    return NextResponse.json({ success: false, message: 'Failed to submit RFP' }, { status: 500 });
  }
}
