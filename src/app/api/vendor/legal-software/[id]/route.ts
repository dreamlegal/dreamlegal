
// /app/api/legal-software/[id]/route.js
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { msg: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch single legal software product
    const product = await prisma.legalSoftware.findUnique({
      where: {
        id: id
      }
    });

    if (!product) {
      return NextResponse.json(
        { msg: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("Error fetching legal software product:", error);
    return NextResponse.json(
      { msg: "Failed to fetch product" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}