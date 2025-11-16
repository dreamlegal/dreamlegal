// app/api/admin/badges/get/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const badges = await prisma.productBadge.findMany({
      where: {
        productId,
        isActive: true,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    });

    return NextResponse.json({ badges }, { status: 200 });
  } catch (error) {
    console.error("Error fetching badges:", error);
    return NextResponse.json(
      { error: "Failed to fetch badges" },
      { status: 500 }
    );
  }
}