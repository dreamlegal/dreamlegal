// app/api/auth/new/user/send-magic-link/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const MAGIC_LINK_EXPIRY = '15m'; // 15 minutes

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || "dreamlegal31@gmail.com",
    pass: process.env.EMAIL_PASS || "opsw vmxy qtoj lhqm",
  },
});

export async function POST(request: Request) {
  try {
    const { email, returnUrl } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists, if not create them
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          type: 'user',
        },
      });
      
      // Create empty userAccount
      await prisma.userAccount.create({
        data: {
          userId: user.id,
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: normalizedEmail,
        type: 'user'
      },
      JWT_SECRET,
      { expiresIn: MAGIC_LINK_EXPIRY }
    );

    // Store token in VerificationToken table
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token,
        expires: expiresAt,
      },
    });

    // Create magic link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const verifyUrl = `${baseUrl}/auth/new/user/verify?token=${token}${returnUrl ? `&returnUrl=${encodeURIComponent(returnUrl)}` : ''}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: normalizedEmail,
      subject: 'Your DreamLegal Login Link',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e2556; margin: 0;">DreamLegal</h1>
          </div>
          
          <div style="background: #f5f7fa; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
            <h2 style="color: #1e2556; margin-top: 0;">Welcome back!</h2>
            <p style="color: #334155; font-size: 16px; line-height: 1.6;">
              Click the button below to securely sign in to your DreamLegal account:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verifyUrl}" 
                 style="background: #1e2556; color: white; padding: 14px 32px; 
                        text-decoration: none; border-radius: 8px; display: inline-block;
                        font-weight: 600; font-size: 16px;">
                Sign In to DreamLegal
              </a>
            </div>
            
            <p style="color: #334155; font-size: 14px; margin-top: 20px;">
              This link will expire in <strong>15 minutes</strong> for security reasons.
            </p>
          </div>
          
          <div style="color: #64748b; font-size: 13px; text-align: center;">
            <p>If you didn't request this email, you can safely ignore it.</p>
            <p style="margin-top: 15px;">
              Or copy and paste this link:<br/>
              <span style="color: #7cc6ee; word-break: break-all;">${verifyUrl}</span>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Magic link sent! Check your email.'
    });

  } catch (error) {
    console.error('Error sending magic link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
}