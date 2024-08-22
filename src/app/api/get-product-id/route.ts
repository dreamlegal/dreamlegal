import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { id, slug } = await request.json();

  if (!id && !slug) {
    return Response.json(
      {
        msg: "Provide Product ID or Slug",
        success: false,
      },
      {
        status: 400,
      }
    );
  }

  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { id },
        { slug },
      ],
    },
  });

  if (product) {
    const companyInfo = await prisma.companyInfo.findFirst({
      where: {
        id: product.companyId,
      },
    });

    const userInfo = await prisma.user.findFirst({
      where: {
        id: product.userId,
      },
      select: {
        name: true,
        email: true,
        image: true,
      },
    });

    return Response.json(
      {
        msg: "Product fetched successfully",
        success: true,
        product,
        company: companyInfo,
        user: userInfo,
      },
      {
        status: 200,
      }
    );
  } else {
    return Response.json(
      {
        msg: "Product not found",
        success: false,
      },
      {
        status: 404,
      }
    );
  }
}
