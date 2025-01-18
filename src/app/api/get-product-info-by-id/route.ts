import prisma from '@/lib/prisma';
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.Pid) {
      return new Response(JSON.stringify({ error: 'Product ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const id = body.Pid;

    // Fetch product by ID
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        company: true, // Include related company info if needed
        user: true,    // Include related user info if needed
        Review: true,  // Include related reviews if needed
      },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
