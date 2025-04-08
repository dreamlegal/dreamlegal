import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, type: true }
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Delete related records first (based on your schema)
    if (existingUser.type === 'vendor') {
      // Delete vendor-specific records if they exist
      try {
        await prisma.vendorCredits.deleteMany({
          where: { vendorId: existingUser.id }
        });
      } catch (error) {
        console.log('No vendor credits to delete or error:', error);
      }
    }
    
    // Delete the user
    await prisma.user.delete({
      where: { email }
    });
    
    return NextResponse.json({
      success: true,
      message: `User ${email} deleted successfully`
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    if (error.code === 'P2003') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete user with existing relationships. Delete related records first.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}