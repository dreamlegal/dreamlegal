import prisma from "@/lib/prisma";
import { verify } from "crypto";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      companyName,
      website,
      yearFounded,
      headQuaters,
      NameOfFounders,
      contact,
      founderVision,
      regionServed,
      TeamSize,
      Awards,
      vendorId,
      PointOfContactName,
      PointOfContactPhone,
      PointOfContactDesignation,
      overview,

    } = await request.json();

    const existingProfile = await prisma.companyInfo.findFirst({
      where: {
        userId: vendorId,
      },
    });

    if (existingProfile) {
      return new Response(
        JSON.stringify({
          success: true,
          msg: "Profile already exists and is verified",
          profile: existingProfile,
        }),
        { status: 200 }
      );
    }

    const newProfile = await prisma.companyInfo.create({
      data: {
        companyName,
        website,
        userId: vendorId,
        yearFounded,
        headQuaters,
        NameOfFounders,
        contact,
        founderVision,
        regionServed,
        TeamSize,
        Awards,
        PointOfContactName,
        PointOfContactPhone,
        PointOfContactDesignation,
        overview,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        msg: "Profile created successfully",
        profile: newProfile,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Error creating profile",
      }),
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const vendorId = id;
    if (!vendorId) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Vendor ID is required",
        }),
        { status: 400 }
      );
    }

    const profile = await prisma.companyInfo.findFirst({
      where: { userId: vendorId },
    });

    if (!profile) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Profile not found",
          verify: true
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        msg: "Profile found",
        profile,
        verify: false
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Error fetching profile",
      }),
      { status: 500 }
    );
  }
}
