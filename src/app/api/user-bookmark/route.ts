import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId } = await request.json();

  try {
    // Fetch SaveProduct records
    const savedProducts = await prisma.saveProduct.findMany({
      where: {
        userId: userId,
      },
    });

    // Extract all product IDs
    const productIds = savedProducts.flatMap((savedProduct) => savedProduct.productId);

    // Fetch products by IDs
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        description: true,
        category: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        products,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching saved products", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch saved products",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
