import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE() {
    try {
      // Delete all posts from the database
      const deletedCount = await prisma.post.deleteMany({});
      
      return NextResponse.json({
        message: 'All posts deleted successfully',
        count: deletedCount.count
      });
    } catch (error) {
      console.error('Error deleting posts:', error);
      return NextResponse.json(
        { error: 'Failed to delete posts', details: error.message },
        { status: 500 }
      );
    }
  }