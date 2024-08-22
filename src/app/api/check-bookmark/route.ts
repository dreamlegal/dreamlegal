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
      return new Response(JSON.stringify({ isBookmarked: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ isBookmarked: false }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error("Error checking bookmark", error);
    return new Response(JSON.stringify({ message: "Failed to check bookmark" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
