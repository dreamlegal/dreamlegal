import prisma from "@/lib/prisma";

const formatProduct = (product: any) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description
      ? product.description.length > 100
        ? product.description.substring(0, 100) + "..."
        : product.description
      : "",
    logoUrl: product.logoUrl,
  };
};

export async function POST(request: Request) {
  const { userId } = await request.json();
  if (!userId) {
    return Response.json(
      {
        msg: "Please provide user ID",
        success: false,
      },
      {
        status: 400,
      }
    );
  }
  if (userId) {
    const products = await prisma.product.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        logoUrl: true,
      },
    });

    if (products.length === 0) {
      return Response.json(
        {
          msg: "No products found.",
          success: true,
        },
        {
          status: 200,
        }
      );
    }

    const formattedProducts = products.map(formatProduct);

    return Response.json(
      {
        msg: "All Products fetched successfully",
        success: true,
        products: formattedProducts,
      },
      {
        status: 200,
      }
    );
  } else {
    return Response.json(
      {
        msg: "Provide Product ID",
        success: false,
      },
      {
        status: 400,
      }
    );
  }
}
