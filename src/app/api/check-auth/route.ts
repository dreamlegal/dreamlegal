// app/api/check-auth/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const authCookie = cookieStore.get('auth');

    if (!authCookie) {
      return NextResponse.json({ 
        success: false, 
        message: 'No auth cookie found' 
      });
    }

    // Parse the auth cookie
    const authData = JSON.parse(authCookie.value);

    // Check if token is expired
    if (authData.exp && authData.exp < Date.now()) {
      return NextResponse.json({ 
        success: false, 
        message: 'Auth token expired' 
      });
    }

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: authData.id,
        email: authData.email,
        type: authData.type
      }
    });

  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check auth status' },
      { status: 500 }
    );
  }
}