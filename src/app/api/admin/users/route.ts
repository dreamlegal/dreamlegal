// File: /app/api/admin/users/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const industry = searchParams.get('industry') || '';

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build filter conditions - only show users with type = "user"
    let whereCondition = {
      type: "user"
    };

    // Search filter
    if (search) {
      whereCondition.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { 
          userAccount: {
            some: {
              CompanyAddress: { contains: search, mode: 'insensitive' }
            }
          }
        }
      ];
    }

    // Industry filter
    if (industry && industry !== 'all') {
      whereCondition.userAccount = {
        some: {
          Industry: {
            has: industry
          }
        }
      };
    }

    // Get users with pagination
    const users = await prisma.user.findMany({
      where: whereCondition,
      include: {
        userAccount: true,
        _count: {
          select: {
            SaveProduct: true,
            Review: true,
            Post: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const totalUsers = await prisma.user.count({ where: whereCondition });
    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
