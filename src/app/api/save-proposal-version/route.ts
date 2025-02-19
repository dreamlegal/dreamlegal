// app/api/save-proposal-version/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { proposalId, name, content } = await request.json();
    console.log(content);

    const proposal = await prisma.aiProposal.findUnique({
      where: { id: proposalId }
    });

    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    const currentVersions = proposal.versions || [];
    const newVersion = {
      name,
      content,
      createdAt: new Date().toISOString()
    };

    const updatedProposal = await prisma.aiProposal.update({
      where: { id: proposalId },
      data: {
        versions: [...currentVersions, newVersion],
        
      }
    });

    return NextResponse.json({
      id: updatedProposal.id,
      status: updatedProposal.status,
      currentContent: content,
      hasVersions: true
    });

  } catch (error) {
    console.error('Error saving version:', error);
    return NextResponse.json(
      { error: 'Failed to save version' },
      { status: 500 }
    );
  }
}