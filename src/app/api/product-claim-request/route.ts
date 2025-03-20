// app/api/products/claim/request/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { productId, vendorId } = await request.json();
    
    if (!productId || !vendorId) {
      return NextResponse.json(
        { success: false, message: 'Product ID and vendor ID are required' },
        { status: 400 }
      );
    }

    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true }
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if a claim already exists for this product/vendor combination
    const existingClaim = await prisma.productClaim.findFirst({
      where: {
        productId,
        vendorId
      }
    });

    if (existingClaim) {
      return NextResponse.json(
        { success: false, message: 'You have already submitted a claim for this product' },
        { status: 400 }
      );
    }

    // Create the product claim
    await prisma.productClaim.create({
      data: {
        productId,
        vendorId
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Product claim request submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting product claim:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit product claim request' },
      { status: 500 }
    );
  }
}