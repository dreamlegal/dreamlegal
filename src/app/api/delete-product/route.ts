import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { id, userId } = await request.json();

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

  if (id) {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });
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
  return Response.json(
    {
      msg: "Product deleted successfully",
      success: true,
    },
    {
      status: 200,
    }
  );
}
