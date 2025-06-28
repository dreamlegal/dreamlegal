// app/api/admin/legal-software/[id]/route.js
import { NextResponse } from "next/server";
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

    // Fetch single legal software product with all premium info
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

    // Return premium fields along with basic product info
    return NextResponse.json({
      id: product.id,
      productName: product.productName,
      companyName: product.companyName,
      isPremium: product.isPremium,
      tag: product.tag,
      caseStudies: product.caseStudies,
      valueMetrics: product.valueMetrics,
      vendorComments: product.vendorComments
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching product premium info:", error);
    return NextResponse.json(
      { msg: "Failed to fetch product premium info" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}