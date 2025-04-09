import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
      const { id } = params;
  
      // Validate input
      if (!id) {
        return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
      }
  
      // Fetch the product
      const product = await prisma.product.findUnique({
        where: { id },
      });
  
      if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
  
      return NextResponse.json({ product });
    } catch (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json(
        { message: "Failed to fetch product", error: error.message },
        { status: 500 }
      );
    }
  }