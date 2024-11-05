import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

export async function GET() {
  try {
    // Retrieve all records from the workFlowProcess table
    const workFlows = await prisma.workFlowProcess.findMany();

    // Respond with the retrieved data
    return NextResponse.json({ success: true, data: workFlows }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving workflow processes:', error);
    // Respond with an error
    return NextResponse.json({ success: false, message: 'Failed to retrieve workflow processes' }, { status: 500 });
  }
}
