// app/api/delete-product/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { id } = await request.json();

    // Check if the id is provided
    if (!id) {
      return NextResponse.json(
        {
          msg: "Product ID is required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    // Delete the product
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        msg: "Product deleted successfully",
        success: true,
        product: deletedProduct,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        msg: "An error occurred while deleting the product.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}