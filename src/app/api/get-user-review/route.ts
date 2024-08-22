import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { userId } = await request.json();
    if (!userId) {
        return new Response(JSON.stringify({ success: false, msg: "Please provide a user ID" }), { status: 400 });
    }

    const userReviews = await prisma.review.findMany({
        where: {
            userId: userId
        },
        include: {
            product: true // Include product details
        }
    });

    if (userReviews.length === 0) {
        return new Response(JSON.stringify({ success: false, msg: "No reviews found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, userReviews }), { status: 200 });
}
