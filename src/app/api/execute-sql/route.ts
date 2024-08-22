import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const MAX_QUERY_LENGTH = 1000;
    const { query } = await request.json();
    if (query.length > MAX_QUERY_LENGTH) {
        return new Response(JSON.stringify({ success: false, error: "Query length is too long" }), { status: 400 });
      }
    try {
        const result = await prisma.$queryRawUnsafe(query);

        return new Response(JSON.stringify({ success: true, result }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error }), { status: 500 });    
    }
}