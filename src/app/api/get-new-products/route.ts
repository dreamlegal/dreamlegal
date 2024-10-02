import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Fetch all products where the 'active' field is 'draft'
    const products = await prisma.product.findMany({
      where: {
        active: 'draft',
      },
    });

    return Response.json(
      {
        msg: "Products fetched successfully",
        success: true,
        products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        msg: "An error occurred while fetching the products.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}