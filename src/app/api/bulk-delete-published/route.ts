// app/api/bulk-delete-published/route.ts
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

    // Delete multiple products in a transaction
    const deletedProducts = await prisma.$transaction(
      ids.map(id => 
        prisma.product.delete({
          where: { id }
        })
      )
    );

    return Response.json(
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
    console.error(error);
    return Response.json(
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