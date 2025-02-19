// app/api/save-proposal-to-dashboard/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { proposalId } = await req.json();

    // Update the proposal status to SAVED
    const updatedProposal = await prisma.aiProposal.update({
      where: {
        id: proposalId,
      },
      data: {
        status: 'SAVED',
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Proposal saved to dashboard successfully',
      proposal: updatedProposal 
    });
    
  } catch (error) {
    console.error('Error saving proposal to dashboard:', error);
    return NextResponse.json(
      { error: 'Failed to save proposal to dashboard' },
      { status: 500 }
    );
  }
}