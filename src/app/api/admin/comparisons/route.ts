// app/api/admin/comparisons/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

// GET - Fetch all comparisons
export async function GET(request: NextRequest) {
  try {
    const comparisons = await prisma.comparison.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      comparisons
    });

  } catch (error) {
    console.error('Admin comparisons fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comparisons' },
      { status: 500 }
    );
  }
}

