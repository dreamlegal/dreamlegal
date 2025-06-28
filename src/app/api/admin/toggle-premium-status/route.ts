// app/api/admin/toggle-premium-status/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { softwareId, isPremium } = await request.json();

    if (!softwareId) {
      return NextResponse.json(
        { msg: "Software ID is required" },
        { status: 400 }
      );
    }

    // Update the premium status
    const updatedSoftware = await prisma.legalSoftware.update({
      where: {
        id: softwareId
      },
      data: {
        isPremium: isPremium,
        // If making non-premium, clear premium fields
        ...(isPremium === false && {
          tag: null,
          caseStudies: null,
          valueMetrics: null,
          vendorComments: null
        })
      }
    });

    return NextResponse.json(
      { 
        msg: `Product ${isPremium ? 'marked as premium' : 'unmarked as premium'} successfully`,
        software: updatedSoftware,
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error toggling premium status:", error);
    return NextResponse.json(
      { msg: "Failed to update premium status" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}