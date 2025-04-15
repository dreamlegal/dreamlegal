import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

export async function POST(req: Request) {
  try {
    const { vendorId } = await req.json();

    if (!vendorId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Vendor ID is required' 
      }, { status: 400 });
    }

    // Create a new table or model for vendor responses
    // This is a placeholder - you'll need to create this model in your schema
    const vendorResponses = await prisma.vendorResponse.findMany({
      where: {
        vendorId: vendorId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true, 
      data: vendorResponses 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching vendor responses:', error);
    
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