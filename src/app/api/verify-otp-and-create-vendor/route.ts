// // app/api/verify-otp-and-create-vendor/route.js
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import prisma from '@/lib/prisma';
// import crypto from 'crypto';
// import bcrypt from 'bcryptjs';

// export async function POST(request) {
//   try {
//     if (!request.body) {
//       return NextResponse.json(
//         { success: false, error: 'Missing request body' },
//         { status: 400 }
//       );
//     }

//     const { email, otp, password, } = await request.json();

//     if (!email || !otp || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     // Hash the provided OTP for comparison
//     const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

//     // Get stored OTP details
//     const storedOtp = await prisma.otpVerification.findUnique({
//       where: { email },
//     });

//     // Verify OTP
//     if (!storedOtp || storedOtp.otp !== hashedOtp || storedOtp.expiresAt < new Date()) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid or expired OTP' },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user with specified type
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         type:"vendor",
//         emailVerified: new Date(),
//       },
//     });

//     // Delete used OTP
//     await prisma.otpVerification.delete({
//       where: { email },
//     });

//     // Calculate expiration time (30 days from now)
//     const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;

//     // Set single auth cookie with all necessary info
//     const cookieStore = cookies();
//     cookieStore.delete('auth');
//     cookieStore.set('auth', JSON.stringify({
//       id: user.id,
//       type: "vendor",
//       exp: expirationTime,
//       email: user.email
//     }), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
//       path: '/',
//     });

//     return NextResponse.json({
//       success: true,
//       userId: user.id,
//       email: user.email,
//       type: user.type,
//       exp: expirationTime
//     });

//   } catch (error) {
//     console.error('Error verifying OTP and creating account:', error);
    
//     if (error.code === 'P2002') {
//       return NextResponse.json(
//         { success: false, error: 'Email already registered' },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { success: false, error: 'Failed to verify OTP or create account' },
//       { status: 500 }
//     );
//   }
// }
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

    // Use transaction to create user and credits together
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