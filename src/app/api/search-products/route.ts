import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { search } = await request.json();
  if (!search) {
    return Response.json(
      {
        success: false,
        msg: "Please provide something",
      },
      { status: 404 }
    );
  }
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { category: { hasSome: [search] } },
          { industry: { hasSome: [search] } },
          { userCategory: { hasSome: [search] } },
        ],
      },
    });
    if (products.length > 0) {
      return Response.json({
        success: true,
        msg: "Fetch successfully",
        products,
      });
    } else {
      return Response.json(
        {
          success: true,
          msg: "Product not found",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        msg: "something went wrong",
      },
      { status: 500 }
    );
  }
}
