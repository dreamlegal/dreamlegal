import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      // userID,
      userOrgType,
      userTeamSize,
      categoryOfWorkflow,
      teamRoles,
      toolsUsed,
      workFlowSteps,
    } = body;

    // Save the data to the database
    const workFlow = await prisma.workFlowProcess.create({
      data: {
        // userID,
        userOrgType,
        userTeamSize,
        categoryOfWorkflow,
        teamRoles,
        toolsUsed,
        workFlowSteps,
      },
    });

    // Respond with success and the created data
    return NextResponse.json({ success: true, data: workFlow }, { status: 201 });
  } catch (error) {
    console.error('Error creating workflow process:', error);
    // Respond with an error
    return NextResponse.json({ success: false, message: 'Failed to create workflow process' }, { status: 500 });
  }
}
