import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

export async function POST(req) {
  try {
    // Parse the request body to extract the 'saved' and 'formId'
    const { saved, formId } = await req.json();

    // Validate the input
    if (!formId || typeof saved !== 'boolean') {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    // Update the isSaved field for the corresponding formId
    const updatedWorkflowResponse = await prisma.workflowResponse.update({
      where: { formId },
      data: { isSaved: saved },
    });

    // Return the updated isSaved value
    return NextResponse.json({ isSaved: updatedWorkflowResponse.isSaved });
  } catch (error) {
    console.error('Error updating save status:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
