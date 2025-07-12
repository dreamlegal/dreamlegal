// app/api/market-intelligence/route.js
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const marketIntelligence = await prisma.marketIntelligence.findUnique({
        where: { id }
      });
      
      if (!marketIntelligence) {
        return NextResponse.json(
          { error: 'Market Intelligence not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(marketIntelligence);
    }

    const marketIntelligenceList = await prisma.marketIntelligence.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(marketIntelligenceList);
  } catch (error) {
    console.error('Error fetching market intelligence:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market intelligence' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { dashboardData, insights, miData } = body;

    const marketIntelligence = await prisma.marketIntelligence.create({
      data: {
        dashboardData: dashboardData || {},
        insights: insights || {},
        miData: miData || {}
      }
    });

    return NextResponse.json(marketIntelligence, { status: 201 });
  } catch (error) {
    console.error('Error creating market intelligence:', error);
    return NextResponse.json(
      { error: 'Failed to create market intelligence' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, dashboardData, insights, miData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const updatedMarketIntelligence = await prisma.marketIntelligence.update({
      where: { id },
      data: {
        dashboardData: dashboardData || {},
        insights: insights || {},
        miData: miData || {}
      }
    });

    return NextResponse.json(updatedMarketIntelligence);
  } catch (error) {
    console.error('Error updating market intelligence:', error);
    return NextResponse.json(
      { error: 'Failed to update market intelligence' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.marketIntelligence.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Market Intelligence deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting market intelligence:', error);
    return NextResponse.json(
      { error: 'Failed to delete market intelligence' },
      { status: 500 }
    );
  }
}
