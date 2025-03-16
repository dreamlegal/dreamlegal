// api/onboard-user/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { success: false, error: 'Missing request body' },
        { status: 400 }
      );
    }

    const { 
        id,
      organizationName,
      organizationType,
      teamSize 
    } = await request.json();

    if (!id || !organizationName || !organizationType || !teamSize) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await prisma.user.findUnique({
        where: { id },
    })

    if(!user) {
        return NextResponse.json(
            { success: false, error: 'User not found' },
            { status: 404 }
        );
    }

    // Create user account with organization details
    await prisma.userAccount.create({
      data: {
        userId: user.id,
        CompanyAddress: organizationName,
        OrgType: organizationType,
        TeamSize: teamSize.toString(),
      },
    });

    // use absolute URL to redirect to dashboard
    return NextResponse.json(
      { success: true, redirect: '/legal_professionals/dashboard' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error creating account:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to create account' },
      { status: 500 }
    );
  }
}