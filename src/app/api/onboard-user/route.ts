// // api/onboard-user/route.ts
// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     if (!request.body) {
//       return NextResponse.json(
//         { success: false, error: 'Missing request body' },
//         { status: 400 }
//       );
//     }

//     const { 
//         id,
//       organizationName,
//       organizationType,
//       teamSize 
//     } = await request.json();

//     if (!id || !organizationName || !organizationType || !teamSize) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Find user by ID
//     const user = await prisma.user.findUnique({
//         where: { id },
//     })

//     if(!user) {
//         return NextResponse.json(
//             { success: false, error: 'User not found' },
//             { status: 404 }
//         );
//     }

//     // Create user account with organization details
//     await prisma.userAccount.create({
//       data: {
//         userId: user.id,
//         CompanyAddress: organizationName,
//         OrgType: organizationType,
//         TeamSize: teamSize.toString(),
//       },
//     });

//     // use absolute URL to redirect to dashboard
//     return NextResponse.json(
//       { success: true, redirect: '/legal_professionals/dashboard' },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error('Error creating account:', error);
    
//     return NextResponse.json(
//       { success: false, error: 'Failed to create account' },
//       { status: 500 }
//     );
//   }
// }

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
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

    // Verify the user from auth cookie
    const authCookie = cookies().get('auth');
    
    if (!authCookie) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    try {
      const authData = JSON.parse(authCookie.value);
      
      // Ensure the user is updating their own data
      if (authData.id !== id) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 403 }
        );
      }
      
      // Check if cookie is expired
      if (authData.exp && authData.exp < Date.now()) {
        return NextResponse.json(
          { success: false, error: 'Session expired' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
      return NextResponse.json(
        { success: false, error: 'Authentication error' },
        { status: 401 }
      );
    }

    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if UserAccount exists for this user
    const existingAccount = await prisma.userAccount.findFirst({
      where: { userId: id },
    });

    if (existingAccount) {
      // Update existing user account
      await prisma.userAccount.update({
        where: { id: existingAccount.id },
        data: {
          CompanyAddress: organizationName,
          OrgType: organizationType,
          TeamSize: teamSize.toString(),
        },
      });
    } else {
      // Create new user account
      await prisma.userAccount.create({
        data: {
          userId: id,
          CompanyAddress: organizationName,
          OrgType: organizationType,
          TeamSize: teamSize.toString(),
        },
      });
    }

    return NextResponse.json(
      { success: true, redirect: '/legal_professionals/dashboard' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating account:', error);
    
    return NextResponse.json(
      { success: false, error: 'Failed to update account' },
      { status: 500 }
    );
  }
}