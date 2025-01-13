// app/api/send-otp/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import prisma from "@/lib/prisma";

// Create the nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    
    user: "dreamlegal31@gmail.com", // Your email
    pass: "opsw vmxy qtoj lhqm",
  },
});

// Utility function to send OTP email
async function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email</h2>
        <p>Your OTP code is:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; background: #f5f5f5; padding: 10px; text-align: center;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  };
  return transporter.sendMail(mailOptions);
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // Hash the OTP before storing
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    // Store OTP in database with expiration
    await prisma.OtpVerification.upsert({
      where: { email },
      update: {
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiration
      },
      create: {
        email,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // Send OTP email
    await sendOtpEmail(email, otp);
    console.log('OTP sent:', otp);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
