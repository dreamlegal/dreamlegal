
// app/api/rfp/list/route.js (Bonus: List all RFPs)
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');
    const teamType = searchParams.get('teamType');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where = {};
    if (category) where.category = { contains: category, mode: 'insensitive' };
    if (teamType) where.teamType = { contains: teamType, mode: 'insensitive' };
    
    // Get RFPs with pagination
    const [rfps, total] = await Promise.all([
      prisma.rfpStructured.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          teamType: true,
          category: true,
          requirementUrgency: true,
          locationPreference: true,
          problemStatement: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.rfpStructured.count({ where })
    ]);
    
    return NextResponse.json({
      success: true,
      data: rfps,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching RFPs:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to fetch RFPs' 
    }, { status: 500 });
  }
}