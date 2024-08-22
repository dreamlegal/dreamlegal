import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma"; // Ensure this path is correct

export async function POST(request: Request) {
  try {
    const { productId, category } = await request.json();

    // Fetch existing ClickCount record for the productId
    const existingClickCount = await prisma.clickCount.findFirst({
      where: { productId: productId },
    });

    let updatedFeatures: Record<string, number> = {}; // Initialize as an object

    if (existingClickCount) {
      // Ensure the parsed value is a string before parsing
      const featureString = typeof existingClickCount.feature === 'string' ? existingClickCount.feature : '{}';
      updatedFeatures = JSON.parse(featureString);

      // Increment the count for the category if it exists, otherwise set it to 1
      updatedFeatures[category] = (updatedFeatures[category] || 0) + 1;
    } else {
      // If no existing record, initialize the feature object with the category count
      updatedFeatures[category] = 1;
    }

    // Serialize the updated features object to JSON
    const serializedFeatures = JSON.stringify(updatedFeatures);

    // Use upsert to update or create the ClickCount record
    const clickCount = await prisma.clickCount.upsert({
      where: {
        productId: productId,
      },
      update: {
        feature: serializedFeatures,
      },
      create: {
        productId: productId,
        feature: serializedFeatures,
      },
    });

    return new NextResponse(JSON.stringify(clickCount), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Failed to track click" }), { status: 500 });
  }
}