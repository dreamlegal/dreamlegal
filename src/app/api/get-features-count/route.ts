import prisma from "@/lib/prisma";

// Handle the GET request
export async function GET(req: Request) {
  try {
    // Fetch all the features from the database
    const features = await prisma.features.findMany({
      orderBy: {
        time: 'desc'
      }
    });

    return new Response(JSON.stringify({ success: true, data: features }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching features:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}