import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    // Parse request with error handling
    let email;
    try {
      const body = await request.json();
      email = body.email?.toLowerCase().trim();
      
      if (!email) {
        return NextResponse.json(
          { success: false, error: 'Email is required' },
          { status: 400 }
        );
      }
    } catch (e) {
      console.error('Request parsing error:', e);
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    console.log('Data check for email:', email);

    // Find user with error handling
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { 
          email,
          type: "user" 
        },
        select: {
          id: true,
          email: true,
          password: true,
          type: true,
          emailVerified: true
        }
      });
    } catch (e) {
      console.error('Database error finding user:', e);
      return NextResponse.json(
        { success: false, error: 'Database error' },
        { status: 500 }
      );
    }

    if (!user) {
      console.log('No vendor found for email:', email);
      return NextResponse.json(
        { success: false, error: 'User not found or not a vendor' },
        { status: 404 }
      );
    }

    // Analyze password structure
    const passwordInfo = {
      type: typeof user.password,
      isNull: user.password === null,
      keys: typeof user.password === 'object' && user.password !== null ? 
        Object.keys(user.password) : [],
      stringRepresentation: typeof user.password === 'string' ? 
        'String of length: ' + user.password.length : 
        (typeof user.password === 'object' && user.password !== null ? 
          JSON.stringify(user.password) : String(user.password))
    };

    return NextResponse.json({
      success: true,
      userInfo: {
        id: user.id,
        email: user.email,
        type: user.type,
        emailVerified: user.emailVerified ? user.emailVerified.toISOString() : null
      },
      passwordAnalysis: passwordInfo
    });

  } catch (error) {
    console.error('Unexpected error during data check:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}