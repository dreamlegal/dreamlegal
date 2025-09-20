
// app/api/rfp/list/route.js - LIST ALL RFPs
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');
    const teamType = searchParams.get('teamType');
    const userId = searchParams.get('userId');
    
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where = {};
    if (category) where.category = { contains: category, mode: 'insensitive' };
    if (teamType) where.teamType = { contains: teamType, mode: 'insensitive' };
    if (userId) where.contactEmail = { contains: `user-${userId}`, mode: 'insensitive' };
    
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
          vendors: true,
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, filters } = body;
    
    // Build advanced filters
    const where = {};
    
    if (filters?.category) {
      where.category = { contains: filters.category, mode: 'insensitive' };
    }
    
    if (filters?.teamType) {
      where.teamType = { contains: filters.teamType, mode: 'insensitive' };
    }
    
    if (filters?.hasVendors !== undefined) {
      if (filters.hasVendors) {
        where.vendors = { isEmpty: false };
      } else {
        where.vendors = { isEmpty: true };
      }
    }
    
    if (filters?.dateRange) {
      where.createdAt = {
        gte: new Date(filters.dateRange.start),
        lte: new Date(filters.dateRange.end)
      };
    }
    
    if (userId) {
      where.contactEmail = { contains: `user-${userId}`, mode: 'insensitive' };
    }
    
    const rfps = await prisma.rfpStructured.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        teamType: true,
        category: true,
        requirementUrgency: true,
        locationPreference: true,
        problemStatement: true,
        objectives: true,
        vendors: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return NextResponse.json({
      success: true,
      data: rfps,
      total: rfps.length
    });
    
  } catch (error) {
    console.error('Error in advanced RFP search:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to search RFPs' 
    }, { status: 500 });
  }
}