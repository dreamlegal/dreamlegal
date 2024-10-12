import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

// Handle the GET request to fetch all RFPs
export async function GET() {
  try {
    // Fetch all RFP forms from the database
    const rfpForms = await prisma.rfpForm.findMany();

    // Return the RFP forms with a 200 status
    return NextResponse.json({ success: true, data: rfpForms }, { status: 200 });
  } catch (error) {
    console.error('Error fetching RFPs:', error);
    // Respond with an error if something goes wrong
    return NextResponse.json({ success: false, message: 'Failed to fetch RFPs' }, { status: 500 });
  }
}
