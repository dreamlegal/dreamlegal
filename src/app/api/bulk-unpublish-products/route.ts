// app/api/bulk-unpublish-products/route.ts
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return Response.json(
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
    const unpublishedProducts = await prisma.$transaction(
      ids.map(id => 
        prisma.product.update({
          where: { id },
          data: { active: 'draft' }
        })
      )
    );

    return Response.json(
      {
        msg: "Products unpublished successfully",
        success: true,
        products: unpublishedProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        msg: "An error occurred while unpublishing the products.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}