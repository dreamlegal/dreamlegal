import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { productId } = await request.json();

    if (!productId) {
        return new Response(JSON.stringify({ message: "Product ID is required" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        // Fetch all reviews for the given productId
        const reviews = await prisma.review.findMany({
            where: { productId },
        });

        if (reviews.length === 0) {
            return new Response(JSON.stringify({ message: "No reviews found for this product" }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Calculate averages for each parameter
        const average = (sum: number, count: number) => count === 0 ? 0 : sum / count;

        const totalRatings = reviews.reduce((acc, review) => {
            acc.easeOfLearning += review.easeOfLearning;
            acc.integration += review.integration;
            acc.support += review.support;
            acc.roi += review.roi;
            acc.recommend += review.recommend;
            return acc;
        }, { easeOfLearning: 0, integration: 0, support: 0, roi: 0 ,recommend: 0});

        const numReviews = reviews.length;

        const overallRating = average(
            (totalRatings.easeOfLearning + totalRatings.integration + totalRatings.support + totalRatings.roi),
            numReviews * 4 // Since we have 4 parameters
        );

        const maxRecommend = 10;
        const overallRecommendation = (average(totalRatings.recommend, numReviews) / maxRecommend) * 100; // Convert to percentage


        const response = {
            overallRating: parseFloat(overallRating.toFixed(2)), // Round to 2 decimal places
            easeOfLearning: average(totalRatings.easeOfLearning, numReviews),
            overallRecommendation: parseFloat(overallRecommendation.toFixed(2)),
            integration: average(totalRatings.integration, numReviews),
            support: average(totalRatings.support, numReviews),
            roi: average(totalRatings.roi, numReviews),
            totalReviews: numReviews,
        };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
