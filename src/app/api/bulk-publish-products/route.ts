// app/api/bulk-publish-products/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { ids } = await request.json();

    // Check if ids array is provided and not empty
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          msg: "Product IDs array is required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    // Update multiple products in a transaction
    const publishedProducts = await prisma.$transaction(
      ids.map(id => 
        prisma.product.update({
          where: { id },
          data: { active: 'publish' }
        })
      )
    );

    return NextResponse.json(
      {
        msg: "Products published successfully",
        success: true,
        products: publishedProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error publishing products:', error);
    return NextResponse.json(
      {
        msg: "An error occurred while publishing the products.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}