import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Assuming prisma is set up in lib/prisma.ts

// Handle the GET request to fetch all products for a specific vendor
export async function POST(request) {
  try {
    // Parse the request body to extract userId
    const body = await request.json();
    const { userId } = body;

    // Validate if userId is provided
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch products associated with the given userId
    const products = await prisma.product.findMany({
      where: { userId },
    });

    // Return the products with a 200 status
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Respond with an error if something goes wrong
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
