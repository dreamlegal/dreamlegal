
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { success: false, error: 'Missing request body' },
        { status: 400 }
      );
    }

    const { email, otp, password } = await request.json();

    if (!email || !otp || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const storedOtp = await prisma.otpVerification.findUnique({
      where: { email },
    });

    if (!storedOtp || storedOtp.otp !== hashedOtp || storedOtp.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use transaction to create user, credits, and companyInfo together
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          type: "vendor",
          emailVerified: new Date(),
        },
      });

      const nextRenewalDate = new Date();
      nextRenewalDate.setDate(nextRenewalDate.getDate() + 30);

      await tx.vendorCredits.create({
        data: {
          vendorId: user.id,
          proposalCredits: 10,
          validationCredits: 10,
          nextRenewalDate
        }
      });
      
      // Create an empty companyInfo record for the new vendor
      await tx.companyInfo.create({
        data: {
          userId: user.id,
          // All other fields will be null by default
        }
      });

      return user;
    });

    await prisma.otpVerification.delete({
      where: { email },
    });

    const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;

    const cookieStore = cookies();
    cookieStore.delete('auth');
    cookieStore.set('auth', JSON.stringify({
      id: result.id,
      type: "vendor",
      exp: expirationTime,
      email: result.email
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      userId: result.id,
      email: result.email,
      type: result.type,
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