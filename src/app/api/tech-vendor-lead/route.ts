import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma"; // Ensure this path is correct

// For App Router (app/api/contact-form/route.js)
export async function POST(request) {
    try {
      const { fullName, organization, email, phone, interestAreas } = await request.json();
  
      // Create record
      const lead = await prisma.techVendorLeads.create({
        data: {
          fullName,
          organization,
          email,
          phone: phone || null,
          interestAreas: JSON.stringify(interestAreas) // Store as JSON string
        }
      });
  
      return Response.json({ success: true, id: lead.id }, { status: 201 });
  
    } catch (error) {
      console.error('Error:', error);
      return Response.json({ error: 'Failed to save data' }, { status: 500 });
    }
  }