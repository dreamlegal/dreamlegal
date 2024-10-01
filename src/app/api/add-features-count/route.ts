import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const { productID, country, userOrgType, categoryData } = await request.json();
    

    // Validate input
    if (!productID || !userOrgType || !categoryData) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields.' }),
        { status: 400 }
      );
    }

    // Save the feature analytics to the database
    const newFeature = await prisma.features.create({
      data: {
        productID,
        country: country || null, // Optional field
        userOrgType,
        categoryData, // Ensure this is in JSON format
        time: new Date()
      },
    });

    return new Response(
      JSON.stringify({ success: true, data: newFeature }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving feature analytics:", error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error saving feature analytics.' }),
      { status: 500 }
    );
  }
}

// Export other methods if necessary (GET, PUT, DELETE, etc.)
// For now, we don't handle them, so you can leave them out or add an error response.
