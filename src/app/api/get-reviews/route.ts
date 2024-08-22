import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Please provide a product ID",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch reviews for the given product ID along with user details
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: { // Include user details
          select: { 
            id: true,
            image: true,
            name: true,
          }
        },
      },
    });

    // Calculate overall rating
    const totalReviews = reviews.length;
    const overallRating = totalReviews ? (
      reviews.reduce((acc, review) => acc + (review.easeOfLearning + review.integration + review.support + review.roi) / 4, 0) / totalReviews
    ) : 0;
    const overallRecommendation = totalReviews ? (
      reviews.reduce((acc, review) => acc + review.recommend, 0) / totalReviews
    ) : 0;
    return new Response(
      JSON.stringify({
        success: true,
        msg: "Reviews fetched successfully",
        reviews: reviews.map(review => ({
          ...review,
          overallExperience: review.overallExperienc // Assuming you meant `overallExperience`
        })),
        overallRating,
        overallRecommendation,
        totalReviews,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Something went wrong",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
