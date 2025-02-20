// app/api/bulk-delete-products/route.ts
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

    // Delete multiple products in a transaction
    const deletedProducts = await prisma.$transaction(
      ids.map(id => 
        prisma.product.delete({
          where: { id }
        })
      )
    );

    return NextResponse.json(
      {
        msg: "Products deleted successfully",
        success: true,
        products: deletedProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error deleting products:', error);
    return NextResponse.json(
      {
        msg: "An error occurred while deleting the products.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}