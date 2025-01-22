
// In /app/api/analyze-feature/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { feature_name, category, vendorId } = body;

    // First check if vendor has enough credits
    const credits = await prisma.vendorCredits.findFirst({
      where: { vendorId },
    });

    if (!credits || credits.validationCredits <= 0) {
      return NextResponse.json({ 
        error: 'Insufficient credits for validation' 
      }, { status: 400 });
    }

    // Call the render API for analysis
    const analysisResponse = await fetch('https://ai-backend-y6mq.onrender.com/feature_analysis/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feature_name,
        category
      }),
    });

    const analysisData = await analysisResponse.json();

    // Update credits after successful analysis
    const updatedCredits = await prisma.vendorCredits.update({
      where: { vendorId },
      data: {
        validationCredits: credits.validationCredits - 1
      },
    });

    return NextResponse.json({
      analysis: analysisData.response,
      remainingCredits: updatedCredits.validationCredits
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}