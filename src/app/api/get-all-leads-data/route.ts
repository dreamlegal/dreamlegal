// app/api/all-leads/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch data from all tables
    const [
      partnersLeads,
      detailedLeads,
      contentEmails,
      demoLeads,
      potentialLeads,
      vendorLeads
    ] = await Promise.all([
      prisma.partnersLeads.findMany(),
      prisma.potentialLeadDetailed.findMany(),
      prisma.contentEmailLists.findMany(),
      prisma.demoLeads.findMany(),
      prisma.potentialLead.findMany(),
      prisma.vendorLeads.findMany()
    ]);

    return NextResponse.json({
      partnersLeads,
      detailedLeads,
      contentEmails,
      demoLeads,
      potentialLeads,
      vendorLeads
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}