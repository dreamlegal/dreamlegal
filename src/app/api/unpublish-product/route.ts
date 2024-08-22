import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { id } = await request.json();

    // Check if the id is provided
    if (!id) {
      return Response.json(
        {
          msg: "Product ID is required",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    // Update the 'active' field to 'published' for the specified product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { active: 'draft' },
    });

    return Response.json(
      {
        msg: "Product updated to published successfully",
        success: true,
        product: updatedProduct,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        msg: "An error occurred while updating the product.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
