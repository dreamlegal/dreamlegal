import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId, productId } = await request.json();
  
  try {
    const existingSaveProduct = await prisma.saveProduct.findFirst({
      where: {
        userId: userId,
        productId: {
          has: productId,
        },
      },
    });

    if (existingSaveProduct) {
      const updatedproductId = existingSaveProduct.productId.filter(id => id !== productId);

      if (updatedproductId.length > 0) {
        await prisma.saveProduct.update({
          where: {
            id: existingSaveProduct.id,
          },
          data: {
            productId: updatedproductId,
          },
        });

        return new Response(JSON.stringify({ message: "Product unbookmarked successfully" }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        await prisma.saveProduct.delete({
          where: {
            id: existingSaveProduct.id,
          },
        });

        return new Response(JSON.stringify({ message: "Product unbookmarked successfully and record deleted" }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } else {
      const saveProduct = await prisma.saveProduct.create({
        data: {
          userId: userId,
          productId: { set: [productId] },
        },
      });

      return new Response(JSON.stringify({ message: "Product bookmarked successfully", saveProduct }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  } catch (error) {
    console.error("Error bookmarking product", error);
    return new Response(JSON.stringify({ message: "Failed to bookmark product" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
