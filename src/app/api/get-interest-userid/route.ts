import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    // Validate the input
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, msg: "userId is required" }),
        { status: 400 }
      );
    }

    // Fetch all products associated with the user
    const products = await prisma.product.findMany({
      where: { userId },
      select: { id: true, name: true }
    });

    // If no products are found, return early
    if (products.length === 0) {
      return new Response(
        JSON.stringify({ success: true, interests: [] }),
        { status: 200 }
      );
    }

    // Fetch interests for all of the user's products
    const interests = await prisma.interest.groupBy({
      by: ['productId', 'companyTypeFromUser'],
      where: {
        productId: { in: products.map(product => product.id) }
      },
      _count: { id: true }
    });

    // Organize the interests by product
    const results = products.map(product => {
      const productInterests = interests
        .filter(interest => interest.productId === product.id)
        .map(interest => ({
          companyType: interest.companyTypeFromUser,
          count: interest._count.id
        }))
        .sort((a, b) => b.count - a.count); // Sort by count in descending order

      return {
        productName: product.name,
        interests: productInterests
      };
    });

    return new Response(
      JSON.stringify({ success: true, products: results }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ msg: "An error occurred while retrieving interests.", success: false }),
      { status: 500 }
    );
  }
}
