import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Make sure you have Prisma instance setup

// GET method to fetch all users in descending order
export async function POST(req: NextRequest) {
  try {
    // Fetch all users from the 'userAccount' table, sorted by 'id' in descending order
    const users = await prisma.userAccount.findMany({
      orderBy: {
        id: 'desc', // Order by 'id' in descending order (latest first)
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error fetching user data' }, { status: 500 });
  }
}
