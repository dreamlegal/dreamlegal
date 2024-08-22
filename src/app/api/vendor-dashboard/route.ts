import prisma from "@/lib/prisma";
import { format } from "date-fns";

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return new Response(
        JSON.stringify({ success: false, msg: "Product ID is required" }),
        { status: 400 }
      );
    }

    // Fetch the product information (optional, depending on if you need it)
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (!product) {
      return new Response(
        JSON.stringify({ success: false, msg: "Product not found" }),
        { status: 404 }
      );
    }

    // Fetch analytics for the specific product
    const analytics = await prisma.analytics.findMany({
      where: {
        productId: product.slug,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const totalViews = analytics.reduce((acc, item) => acc + (item.views || 0), 0);
    const totalFollowers = analytics.reduce((acc, item) => acc + (item.followers || 0), 0);
    const totalLogins = analytics.reduce((acc, item) => acc + (item.loginsViews || 0), 0);
    const totalShares = analytics.reduce((acc, item) => acc + (item.shares || 0), 0);

    const seriesData = analytics.map(item => ({
      x: format(item.createdAt, 'MMM'),
      y: item.views || 0, // Assuming 'views' is the metric for your chart
    }));

    const chartData = {
      productId: product.id,
      data: seriesData,
    };

    // Fetch click counts for the specific product
    const clickCounts = await prisma.clickCount.findMany({
      where: {
        productId: product.slug,
      },
    });

    // Fetch saved products where the productId is in the productId array
    const saveProducts = await prisma.saveProduct.findMany({
      where: {
        productId: {
          has: product.slug, // Using the `has` filter to check if the array contains the productId
        },
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          totalViews,
          totalFollowers,
          totalLogins,
          totalShares,
          analytics: chartData,
          clickCounts,
          saveProducts,
          country : analytics[0]?.country
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, msg: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
