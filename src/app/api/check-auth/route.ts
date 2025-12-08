// // app/api/check-auth/route.js
// export const dynamic = 'force-dynamic'
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function GET() {
//   try {
//     const cookieStore = cookies();
//     const authCookie = cookieStore.get('auth');

//     if (!authCookie) {
//       return NextResponse.json({ 
//         success: false, 
//         message: 'No auth cookie found' 
//       });
//     }

//     // Parse the auth cookie
//     const authData = JSON.parse(authCookie.value);

//     // Check if token is expired
//     if (authData.exp && authData.exp < Date.now()) {
//       return NextResponse.json({ 
//         success: false, 
//         message: 'Auth token expired' 
//       });
//     }

//     // Return user data
//     return NextResponse.json({
//       success: true,
//       user: {
//         id: authData.id,
//         email: authData.email,
//         type: authData.type
//       }
//     });

//   } catch (error) {
//     console.error('Error checking auth:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to check auth status' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    // Get the auth cookie
    const authCookie = request.cookies.get('auth');
    
    if (!authCookie) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      });
    }
    
    // Parse the auth cookie
    const authData = JSON.parse(authCookie.value);
    
    // Check if cookie is expired
    if (authData.exp && authData.exp < Date.now()) {
      return NextResponse.json({
        success: false,
        error: 'Session expired'
      });
    }
    
    // For user type, check if onboarding is completed
    let hasCompletedOnboarding = false;
    
    if (authData.type === 'user') {
      // Get user account details to check onboarding status
      const userAccount = await prisma.userAccount.findFirst({
        where: { userId: authData.id },
      });
      
      hasCompletedOnboarding = !!(
        userAccount && 
        userAccount.CompanyAddress && 
        userAccount.OrgType && 
        userAccount.TeamSize
      );
    }
    
    // Return the user data from cookie plus onboarding status if applicable
    return NextResponse.json({
      success: true,
      user: {
        id: authData.id,
        email: authData.email,
        type: authData.type,
        hasCompletedOnboarding: hasCompletedOnboarding
      }
    });
    
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({
      success: false,
      error: 'Authentication error'
    }, { status: 500 });
  }
}