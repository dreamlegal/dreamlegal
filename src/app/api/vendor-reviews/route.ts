import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Please provide a user ID",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch all products associated with the vendor's userId
    const products = await prisma.product.findMany({
      where: { userId },
      select: { id: true, name: true },
    });

    if (products.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "No products found for this vendor",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch all reviews for the products
    const productIds = products.map(product => product.id);
    const reviews = await prisma.review.findMany({
      where: {
        productId: { in: productIds },
      },
      include: {
        user: { // Include user details
          select: { 
            id: true,
            image: true,
            name: true,
          }
        },
        product: { // Optionally include product details
          select: { 
            id: true,
            name: true,
          }
        },
      },
    });

    // Calculate overall rating and recommendation for each product
    const overallRating = reviews.length
      ? reviews.reduce((acc, review) => acc + (review.easeOfLearning + review.integration + review.support + review.roi) / 4, 0) / reviews.length
      : 0;

    const overallRecommendation = reviews.length
      ? reviews.reduce((acc, review) => acc + review.recommend, 0) / reviews.length
      : 0;

    return new Response(
      JSON.stringify({
        success: true,
        msg: "Products and their reviews fetched successfully",
        products: products.map(product => ({
          ...product,
          reviews: reviews.filter(review => review.productId === product.id),
        })),
        overallRating,
        overallRecommendation,
        totalReviews: reviews.length,
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
