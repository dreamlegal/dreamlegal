import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all products with old category but new categories empty
    const products = await prisma.legalSoftware.findMany({
      where: {
        // Only migrate those that have no categories yet
        categories: { equals: [] }
      }
    });

    let updated = 0;

    for (const product of products) {
      if (!product.category) continue;

      await prisma.legalSoftware.update({
        where: { id: product.id },
        data: {
          categories: [product.category]  // Convert single → array
        }
      });

      updated++;
    }

    return NextResponse.json({
      success: true,
      message: "Migration complete",
      totalProducts: products.length,
      updatedProducts: updated
    });

  } catch (error) {
    console.error("Migration Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
