import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the product ID and user ID from the request body
    const { productId, userId } = await request.json();

    // Validate input parameters
    if (!productId || !userId) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Product ID and User ID are required" 
        }, 
        { status: 400 }
      );
    }

    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Product not found" 
        }, 
        { status: 404 }
      );
    }

    // Update the product with the new user ID
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        userId: userId
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        data: updatedProduct
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error" 
      }, 
      { status: 500 }
    );
  }
}