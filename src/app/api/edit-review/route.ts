import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      id,
      userId,
      productId,
      involvement,
      WhyBought,
      GoalBehind,
      otherProducts,
      oftenUsed,
      overallExperienc,
      bestThing,
      worstThing,
      easeOfLearning,
      integration,
      support,
      roi,
      functionality,
      processStep,
      recommend,
      reference,
      attachement,
    } = await request.json();

    if (
      !id ||
      !userId ||
      !productId ||
      !involvement ||
      !WhyBought ||
      !GoalBehind ||
      !otherProducts ||
      !oftenUsed ||
      !overallExperienc ||
      !bestThing ||
      !worstThing ||
      !easeOfLearning ||
      !integration ||
      !support ||
      !roi ||
      !functionality ||
      !processStep ||
      !recommend ||
      !reference ||
      !attachement
    ) {
      return Response.json(
        {
          success: false,
          msg: "Please provide all required fields",
        },
        { status: 400 }
      );
    }

    // Check if the review exists
    const existingReview = await prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      return Response.json(
        {
          success: false,
          msg: "Review not found",
        },
        { status: 404 }
      );
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        userId,
        productId,
        involvement,
        WhyBought,
        GoalBehind,
        otherProducts,
        oftenUsed,
        overallExperienc,
        bestThing,
        worstThing,
        easeOfLearning,
        integration,
        support,
        roi,
        functionality,
        processStep,
        recommend,
        reference,
        attachement,
      },
    });

    return Response.json(
      {
        success: true,
        msg: "Review updated successfully",
        review: updatedReview,
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
