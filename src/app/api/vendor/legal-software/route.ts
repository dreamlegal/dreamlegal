// /app/api/legal-software/route.js
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(request) {
  try {
    const { vendorId } = await request.json();

    if (!vendorId) {
      return NextResponse.json(
        { msg: "Vendor ID is required" },
        { status: 400 }
      );
    }

    // Fetch all legal software products for the vendor
    const products = await prisma.legalSoftware.findMany({
      where: {
        vendorId: vendorId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(
      { 
        products,
        count: products.length,
        msg: "Products fetched successfully" 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching legal software products:", error);
    return NextResponse.json(
      { msg: "Failed to fetch products" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}





// // /app/api/delete-premium-info/route.js (Optional - to remove premium status)
// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(request) {
//   try {
//     const { productId, vendorId } = await request.json();

//     if (!productId || !vendorId) {
//       return NextResponse.json(
//         { msg: "Product ID and Vendor ID are required" },
//         { status: 400 }
//       );
//     }

//     // Verify the product belongs to the vendor
//     const existingProduct = await prisma.legalSoftware.findFirst({
//       where: {
//         id: productId,
//         vendorId: vendorId
//       }
//     });

//     if (!existingProduct) {
//       return NextResponse.json(
//         { msg: "Product not found or unauthorized" },
//         { status: 404 }
//       );
//     }

//     // Remove premium information
//     const updatedProduct = await prisma.legalSoftware.update({
//       where: {
//         id: productId
//       },
//       data: {
//         isPremium: false,
//         tag: null,
//         caseStudies: null,
//         valueMetrics: null,
//         vendorComments: null
//       }
//     });

//     return NextResponse.json(
//       {
//         ...updatedProduct,
//         msg: "Premium information removed successfully"
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Error removing premium info:", error);
//     return NextResponse.json(
//       { msg: "Failed to remove premium information" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }