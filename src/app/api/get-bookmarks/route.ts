import prisma from "@/lib/prisma";

// Handle the GET request
export async function GET(req: Request) {
  try {
    // Fetch all the bookmarks from the database
    const bookmarks = await prisma.Bookmark.findMany();

    return new Response(JSON.stringify({ success: true, data: bookmarks }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
