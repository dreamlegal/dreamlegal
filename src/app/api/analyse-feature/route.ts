
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { feature_name, category, vendorId } = await request.json();

    // First find the vendor credits record
    const credits = await prisma.vendorCredits.findFirst({
      where: { vendorId },
    });

    if (!credits || credits.validationCredits <= 0) {
      return NextResponse.json({ 
        error: 'Insufficient credits for validation' 
      }, { status: 400 });
    }

    // Early return if no credits
    if (!credits || credits.validationCredits <= 0) {
      return NextResponse.json({ 
        error: 'Insufficient credits for validation',
        remainingCredits: credits?.validationCredits || 0
      }, { status: 400 });
    }

    // Call the render API for analysis
    const analysisResponse = await fetch('https://dreamlegal.in/ai/feature_analysis/', {
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
    console.log(analysisData);

    // Update credits using the id we got from findFirst
    const updatedCredits = await prisma.vendorCredits.update({
      where: { id: credits.id },  // Use the id for updating
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