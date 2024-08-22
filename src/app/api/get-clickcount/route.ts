import prisma from '@/lib/prisma'; // Adjust the import according to your project structure

export async function POST( req: Request) {
    const { productId } = await req.json();
  try {
    // Get the current date and time

    const findSlug = await prisma.product.findUnique({
      where: {
        id: productId
      },
      select: {
        slug: true
      }
    })
    
    // Query the database for interests in the last 24 hours
    const clicks = await prisma.clickCount.findFirst({
      where: {
        productId: findSlug?.slug
      }
    })

    // Fetch additional information about the products and companies


    // Respond with the interest counts
    return new Response(
      JSON.stringify({ success: true, clicks  }),
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
