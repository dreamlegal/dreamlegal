// app/api/admin/update-premium-info/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const {
      productId,
      tag,
      caseStudies,
      valueMetrics,
      vendorComments
    } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { msg: "Product ID is required" },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await prisma.legalSoftware.findUnique({
      where: { id: productId }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { msg: "Product not found" },
        { status: 404 }
      );
    }

    // Update the product with premium information
    const updatedProduct = await prisma.legalSoftware.update({
      where: { id: productId },
      data: {
        isPremium: true, // Ensure it's marked as premium when updating premium info
        tag,
        caseStudies,
        valueMetrics,
        vendorComments,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedProduct, { status: 200 });

  } catch (error) {
    console.error("Error updating premium info:", error);
    return NextResponse.json(
      { msg: "Failed to update premium information" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}