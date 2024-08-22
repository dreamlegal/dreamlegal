import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return Response.json(
        {
          success: false,
          msg: "Please provide a user ID",
        },
        { status: 400 }
      );
    }

    // Fetch reviews by the given user ID along with product name and logo URL
    const reviews = await prisma.review.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    if (reviews.length === 0) {
      return Response.json(
        {
          success: true,
          msg: "No reviews found for this user",
          reviews: [],
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        msg: "Reviews fetched successfully",
        reviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        msg: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
