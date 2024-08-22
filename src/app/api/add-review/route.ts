import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
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

    if (!userId || !productId) {
      return Response.json(
        {
          success: false,
          msg: "Please provide all required fields",
        },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
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
        msg: "Review added successfully",
        review,
      },
      { status: 201 }
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
