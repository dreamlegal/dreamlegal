import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function GET() {
  try {
    // Get the current date and time
    const now = new Date();
    
    // Calculate the date and time 24 hours ago
    const twentyFourHoursAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));

    // Query the database for interests in the last 24 hours
    const interests = await prisma.interest.groupBy({
      by: ['companyTypeFromUser', 'productId'],
      where: {
        createdAt: {
          gte: twentyFourHoursAgo
        }
      },
      _count: {
        id: true
      }
    });

    // Fetch additional information about the products and companies
    const results = await Promise.all(interests.map(async (interest) => {
      const product = await prisma.product.findUnique({
        where: { id: interest.productId }
      });
      const company = await prisma.companyInfo.findUnique({
        where: { id: product?.companyId }
      });

      return {
        companyType: interest.companyTypeFromUser,
        productId: interest.productId,
        productName: product?.name,
        companyName: company?.companyName,
        count: interest._count.id
      };
    }));

    // Respond with the interest counts
    return new Response(
      JSON.stringify({ success: true, interests: results }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ msg: "An error occurred while retrieving interest counts.", success: false }),
      { status: 500 }
    );
  }
}
