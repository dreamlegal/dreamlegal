import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get comparison data
    const comparison = await prisma.comparison.findUnique({
      where: { slug }
    });

    if (!comparison) {
      return NextResponse.json(
        { error: 'Comparison not found' },
        { status: 404 }
      );
    }

    // Get individual software data
    const softwareData = await prisma.legalSoftware.findMany({
      where: {
        slug: {
          in: comparison.softwareSlugs
        }
      }
    });

    // Sort software data to match the order in comparison.softwareSlugs
    const orderedSoftwareData = comparison.softwareSlugs.map(slug => 
      softwareData.find(software => software.slug === slug)
    ).filter(Boolean);

    return NextResponse.json({
      success: true,
      comparison,
      software: orderedSoftwareData
    });

  } catch (error) {
    console.error('Comparison fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comparison' },
      { status: 500 }
    );
  }
}