// app/api/user/email/[id]/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ 
        success: false,
        message: 'User ID is required' 
      }, { status: 400 });
    }

    // Find user by ID where type is "user"
    const user = await prisma.user.findFirst({
      where: { 
        id: id,
        type: "user"
      },
      select: {
        id: true,
        email: true,
        name: true,
        type: true,
        userAccount: {
          select: {
            Contact: true,
            CompanyEmail: true,
            TeamSize: true,
            CompanyType: true,
            OrgType: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ 
        success: false,
        message: 'User not found or invalid user type' 
      }, { status: 404 });
    }

    // Determine the best email to use
    const bestEmail = user.userAccount?.[0]?.CompanyEmail || user.email;

    return NextResponse.json({
      success: true,
      email: bestEmail,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        companyEmail: user.userAccount?.[0]?.CompanyEmail,
        contact: user.userAccount?.[0]?.Contact,
        teamSize: user.userAccount?.[0]?.TeamSize,
        companyType: user.userAccount?.[0]?.CompanyType,
        orgType: user.userAccount?.[0]?.OrgType
      }
    });
    
  } catch (error) {
    console.error('Error fetching user email:', error);
    return NextResponse.json({ 
      success: false,
      message: 'Failed to fetch user email' 
    }, { status: 500 });
  }
}