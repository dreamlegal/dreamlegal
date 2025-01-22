// app/api/verify-otp-and-create-user/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { success: false, error: 'Missing request body' },
        { status: 400 }
      );
    }

    const { 
      email, 
      otp, 
      password,
      organizationName,
      organizationType,
      teamSize 
    } = await request.json();

    if (!email || !otp || !password || !organizationName || !organizationType || !teamSize) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the provided OTP for comparison
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Get stored OTP details
    const storedOtp = await prisma.otpVerification.findUnique({
      where: { email },
    });

    // Verify OTP
    if (!storedOtp || storedOtp.otp !== hashedOtp || storedOtp.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with specified type
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        type: 'user',
        emailVerified: new Date(),
      },
    });

    // Create user account with organization details
    await prisma.userAccount.create({
      data: {
        userId: user.id,
        CompanyAddress: organizationName,
        OrgType: organizationType,
        TeamSize: teamSize.toString(),
      },
    });

    // Delete used OTP
    await prisma.otpVerification.delete({
      where: { email },
    });

    // Calculate expiration time (30 days from now)
    const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;

    // Set cookie with authentication info
    const cookieStore = cookies();
    cookieStore.delete('auth');
    cookieStore.set('auth', JSON.stringify({
      id: user.id,
      type: 'user',
      exp: expirationTime,
      email: user.email
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      email: user.email,
      type: user.type,
      exp: expirationTime
    });

  } catch (error) {
    console.error('Error verifying OTP and creating account:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP or create account' },
      { status: 500 }
    );
  }
}