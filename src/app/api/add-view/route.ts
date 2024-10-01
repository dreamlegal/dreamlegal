import prisma from "@/lib/prisma";

// Handle the POST request
export async function POST(req: Request) {
  try {
    const { productId, userOrgType ,country } = await req.json(); // Use req.json() to parse the JSON body

    // Check if the required fields are provided
    if (!productId) {
      return new Response(JSON.stringify({ success: false, message: 'Product ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create a new view entry in the database
    const viewEntry = await prisma.productView.create({
      data: {
        productId,       // Store the product ID
        userOrgType,     // Store the organization type
        country,
        createdAt: new Date(), // Store the current timestamp
      },
    });

    return new Response(JSON.stringify({ success: true, data: viewEntry }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding view:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
