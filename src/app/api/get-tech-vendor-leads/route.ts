// app/api/tech-vendor-leads/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const leads = await prisma.techVendorLeads.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: leads,
      count: leads.length
    });
  } catch (error) {
    console.error('Error fetching tech vendor leads:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch leads'
      },
      { status: 500 }
    );
  }
}
