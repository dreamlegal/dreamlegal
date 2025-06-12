// app/api/admin/get-all-vendor-responses/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    // Get all vendor responses (not filtered by vendorId)
    const vendorResponses = await prisma.vendorResponse.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true, 
      data: vendorResponses 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching all vendor responses:', error);
    
    let errorMessage = 'Failed to fetch vendor responses';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ 
      success: false, 
      message: errorMessage 
    }, { status: 500 });
  }
}