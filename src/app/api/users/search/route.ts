// /api/users/search/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'user';

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ users: [] });
    }

    // Search from UserAccount table directly - only search by name and email
    const userAccounts = await prisma.userAccount.findMany({
      where: {
        AND: [
          {
            user: {
              type: type, // Filter by user type (e.g., 'user')
            },
          },
          {
            OR: [
              {
                user: {
                  name: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              },
              {
                user: {
                  email: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      take: 20, // Limit results
      orderBy: {
        user: {
          name: 'asc',
        },
      },
    });

    // Transform the data to match what the frontend expects
    const transformedUsers = userAccounts.map(userAccount => ({
      id: userAccount.user.id,
      name: userAccount.user.name,
      email: userAccount.user.email,
      profilePicture: userAccount.user.image || '/default-avatar.png', // Use image field or default avatar
      designation: userAccount.Designation || null,
      companyType: userAccount.CompanyType || null,
      contact: userAccount.Contact || null,
      location: userAccount.Location || null,
      address: userAccount.Address || null,
      companyAddress: userAccount.CompanyAddress || null,
      companyEmail: userAccount.CompanyEmail || null,
      orgType: userAccount.OrgType || null,
      primaryLanguage: userAccount.PrimaryLanguage || [],
      industry: userAccount.Industry || [],
      practiceArea: userAccount.PracticeArea || [],
      workType: userAccount.WorkType || [],
      goals: userAccount.Goals || [],
      existingTools: userAccount.ExistingTools || [],
      teamSize: userAccount.TeamSize || null,
      profileUrl: `/profile/${userAccount.user.id}`, // Assuming you have a profile page
    }));

    return NextResponse.json({
      users: transformedUsers,
      total: transformedUsers.length,
    });

  } catch (error) {
    console.error('Users search error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to search users',
        users: [],
        total: 0 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}