import prisma from "@/lib/prisma";

// Handle the GET request
export async function GET(req: Request) {
  try {
    // Fetch all the shares from the database
    const shares = await prisma.share.findMany();

    return new Response(JSON.stringify({ success: true, data: shares }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching shares:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
