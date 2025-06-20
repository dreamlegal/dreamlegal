
// app/api/update-legal-software-metadata/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      softwareId, 
      metaTitle, 
      metaDescription, 
      ogTitle, 
      ogDescription, 
      ogImage 
    } = body;

    if (!softwareId) {
      return NextResponse.json(
        { error: 'Software ID is required' },
        { status: 400 }
      );
    }

    // Update the legal software metadata
    const updatedSoftware = await prisma.legalSoftware.update({
      where: { id: softwareId },
      data: {
        metaTitle,
        metaDescription,
        ogTitle,
        ogDescription,
        ogImage
      }
    });

    return NextResponse.json({
      success: true,
      software: updatedSoftware
    });
  } catch (error) {
    console.error('Error updating legal software metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update legal software metadata' },
      { status: 500 }
    );
  }
}