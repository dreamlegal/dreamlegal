// app/api/marketing-guide/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';  // Assuming prisma is set up in lib/prisma.ts
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || "dreamlegal31@gmail.com",
    pass: process.env.EMAIL_PASS || "opsw vmxy qtoj lhqm",
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    try {
      await prisma.vendorLeads.create({
        data: {
          email: email,
          message: 'Requested free marketing guide',
        },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with email sending even if database save fails
    }

    // Path to the PDF file in public folder
    const pdfPath = path.join(process.cwd(), 'public', 'pdf', 'marketing-guide.pdf');
    
    // Check if PDF exists
    if (!fs.existsSync(pdfPath)) {
      console.error('PDF file not found at:', pdfPath);
      return NextResponse.json(
        { error: 'Marketing guide not available at the moment' },
        { status: 500 }
      );
    }

    // Email template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Free Marketing Guide</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                border-radius: 16px;
                padding: 40px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #7cc6ee;
            }
            .logo {
                color: #1e2556;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .title {
                color: #1e2556;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 15px;
            }
            .subtitle {
                color: #7cc6ee;
                font-size: 18px;
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 30px;
            }
            .content p {
                margin-bottom: 15px;
                color: #334155;
            }
            .highlight {
                background: linear-gradient(120deg, #7cc6ee, #1e2556);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
            }
            .cta {
                background: linear-gradient(135deg, #1e2556, #7cc6ee);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                display: inline-block;
                font-weight: bold;
                margin: 20px 0;
            }
            .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
                color: #64748b;
                font-size: 14px;
            }
            .attachment-notice {
                background: #f0f9ff;
                border: 1px solid #7cc6ee;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
            }
            ul {
                padding-left: 20px;
            }
            li {
                margin-bottom: 8px;
                color: #334155;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🚀 Legal Tech Marketing</div>
                <div class="title">Your Free Marketing Guide is Here!</div>
                <div class="subtitle">Transform Your Legal Tech Business</div>
            </div>
            
            <div class="content">
                <p>Hi there,</p>
                
                <p>Thank you for your interest in our Free Marketing Guide for Legal Tech Companies!</p>
                
                <p>We've attached our comprehensive marketing guide that covers:</p>
                <ul>
                    <li>🎯 <strong>High-Intent Lead Generation</strong> strategies specific to legal tech</li>
                    <li>📊 <strong>Market Intelligence</strong> and competitive analysis</li>
                    <li>🔥 <strong>Brand Positioning</strong> that resonates with legal teams</li>
                    <li>💡 <strong>Content Marketing</strong> that converts prospects to clients</li>
                    <li>📈 <strong>Growth Strategies</strong> for scaling your legal tech business</li>
                </ul>
                
                <div class="attachment-notice">
                    <strong>📎 Your marketing guide is attached to this email as a PDF.</strong><br>
                    <em>Download it now and start implementing these proven strategies!</em>
                </div>
                
                
                
               
            </div>
            
            <div class="footer">
                <p>Best regards,<br>
                <strong>The Dreamlegal Team</strong></p>
                
               
                
               
            </div>
        </div>
    </body>
    </html>
    `;

    const textTemplate = `
Your Free Marketing Guide is Here!

Hi there,

Thank you for your interest in our Free Marketing Guide for Legal Tech Companies!

We've attached our comprehensive marketing guide that covers:
- High-Intent Lead Generation strategies specific to legal tech
- Market Intelligence and competitive analysis
- Brand Positioning that resonates with legal teams
- Content Marketing that converts prospects to clients
- Growth Strategies for scaling your legal tech business

Your marketing guide is attached to this email as a PDF. Download it now and start implementing these proven strategies!

This guide has helped 100+ legal tech companies improve their marketing results and become the first choice of legal teams.


Best regards,
The Legal Tech Marketing Team
dreamlegal31@gmail.com

Ready to transform your legal tech business?
    `;

    // Email options
    const mailOptions = {
      from: {
        name: 'Legal Tech Marketing',
        address: process.env.EMAIL_FROM || "dreamlegal31@gmail.com"
      },
      to: email,
      subject: '🚀 Your Free Legal Tech Marketing Guide is Here!',
      text: textTemplate,
      html: htmlTemplate,
      attachments: [
        {
          filename: 'Legal-Tech-Marketing-Guide.pdf',
          path: pdfPath,
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log('Marketing guide sent successfully to:', email);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send marketing guide. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Marketing guide sent successfully!',
        email: email 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}