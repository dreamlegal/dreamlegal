import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request) {
  try {
    // Delete all records from AiProposal table
    const deleteResult = await prisma.aiProposal.deleteMany({});

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deleteResult.count} proposals`,
      deletedCount: deleteResult.count
    });
  } catch (error) {
    console.error('Error deleting proposals:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete proposals',
        details: error.message
      },
      { status: 500 }
    );
  } finally {
    // Ensure the database connection is properly closed
    await prisma.$disconnect();
  }
}