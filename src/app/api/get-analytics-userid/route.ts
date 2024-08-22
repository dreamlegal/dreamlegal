import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth, format } from 'date-fns';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    // Validate input
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, msg: "userId is required" }),
        { status: 400 }
      );
    }

    // Fetch all products associated with the user
    const products = await prisma.product.findMany({
      where: { userId },
      select: { id: true, slug: true }, // Using id and slug for matching
    });

    if (products.length === 0) {
      return new Response(
        JSON.stringify({ success: true, analytics: [], month: format(new Date(), 'MMMM yyyy') }),
        { status: 200 }
      );
    }

    // Fetch analytics for all of the user's products for the current month
    const now = new Date();
    const startOfMonthDate = startOfMonth(now);
    const endOfMonthDate = endOfMonth(now);

    const analytics = await prisma.analytics.findMany({
      where: {
        productId: {
          in: products.map(product => product.slug),
        },
        createdAt: {
          gte: startOfMonthDate,
          lte: endOfMonthDate,
        },
      },
      select: {
        id: true,
        productId: true,
        views: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        analytics,
        month: format(now, 'MMMM yyyy') // Add current month to the response
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to retrieve analytics" }), { status: 500 });
  }
}
