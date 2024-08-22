import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json(
        {
          success: false,
          msg: "Please provide a review ID",
        },
        { status: 400 }
      );
    }

    // Fetch the review for the given ID
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return Response.json(
        {
          success: false,
          msg: "Review not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        msg: "Review fetched successfully",
        review,
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
