import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // Adjust if your Prisma client is imported differently

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      productId, 
      metaTitle, 
      metaDescription, 
      ogTitle, 
      ogDescription, 
      ogImage 
    } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Update the product metadata
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        metaTitle,
        metaDescription,
        ogTitle,
        ogDescription,
        ogImage
      }
    });

    return NextResponse.json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product metadata:', error);
    return NextResponse.json(
      { error: 'Failed to update product metadata' },
      { status: 500 }
    );
  }
}