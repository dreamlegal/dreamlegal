// app/api/check-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Get email from request body
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Search for the email across all relevant tables
    const results = await findEmailUsage(email);
    
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('Error checking email usage:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get email from query params
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required as a query parameter' }, { status: 400 });
    }

    // Search for the email across all relevant tables
    const results = await findEmailUsage(email);
    
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('Error checking email usage:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

async function findEmailUsage(email: string) {
  // Result object to store all matches
  const results: Record<string, any> = {};

  // Check User table
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      type: true,
      createdAt: true,
      emailVerified: true
    }
  });
  
  if (user) {
    results.user = user;
  }

  // Check OtpVerification table
  const otpVerification = await prisma.otpVerification.findUnique({
    where: { email }
  });
  
  if (otpVerification) {
    results.otpVerification = {
      exists: true,
      createdAt: otpVerification.createdAt,
      expiresAt: otpVerification.expiresAt
    };
  }

  // Check Otp table
  const otp = await prisma.otp.findFirst({
    where: { email }
  });
  
  if (otp) {
    results.otp = {
      id: otp.id,
      createdAt: otp.createdAt,
      updatedAt: otp.updatedAt
    };
  }

  // Check PartnersLeads table
  const partnersLead = await prisma.partnersLeads.findFirst({
    where: { email }
  });
  
  if (partnersLead) {
    results.partnersLead = partnersLead;
  }

  // Check PotentialLeadDetailed table
  const potentialLeadDetailed = await prisma.potentialLeadDetailed.findFirst({
    where: { email }
  });
  
  if (potentialLeadDetailed) {
    results.potentialLeadDetailed = potentialLeadDetailed;
  }

  // Check ContentEmailLists table
  const contentEmailList = await prisma.contentEmailLists.findFirst({
    where: { email }
  });
  
  if (contentEmailList) {
    results.contentEmailList = contentEmailList;
  }

  // Check DemoLeads table
  const demoLead = await prisma.demoLeads.findFirst({
    where: { email }
  });
  
  if (demoLead) {
    results.demoLead = demoLead;
  }

  // Check PotentialLead table
  const potentialLead = await prisma.potentialLead.findFirst({
    where: { email }
  });
  
  if (potentialLead) {
    results.potentialLead = potentialLead;
  }

  // Check VendorLeads table
  const vendorLead = await prisma.vendorLeads.findFirst({
    where: { email }
  });
  
  if (vendorLead) {
    results.vendorLead = vendorLead;
  }

  // Check CommonLead table
  const commonLead = await prisma.commonLead.findUnique({
    where: { email }
  });
  
  if (commonLead) {
    results.commonLead = commonLead;
  }

  // Check for company info with this email in Product table
  const productsWithEmail = await prisma.product.findMany({
    where: { 
      OR: [
        { ByAdminEmail: email }
      ]
    },
    select: {
      id: true,
      name: true,
      CompanyName: true,
      ByAdminEmail: true
    }
  });
  
  if (productsWithEmail.length > 0) {
    results.productsWithEmail = productsWithEmail;
  }

  // Check Booking table
  const bookings = await prisma.booking.findMany({
    where: { contactEmail: email },
    select: {
      id: true,
      ProductName: true,
      VendorName: true,
      name: true,
      organisationName: true,
      createdAt: true
    }
  });
  
  if (bookings.length > 0) {
    results.bookings = bookings;
  }

  // If user exists, check related models
  if (user) {
    // Check userAccount
    const userAccount = await prisma.userAccount.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
        Contact: true,
        CompanyEmail: true,
        CompanyType: true
      }
    });
    
    if (userAccount) {
      results.userAccount = userAccount;
    }

    // Check company info
    const companyInfo = await prisma.companyInfo.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
        companyName: true,
        contact: true
      }
    });
    
    if (companyInfo) {
      results.companyInfo = companyInfo;
    }
  }

  return results;
}