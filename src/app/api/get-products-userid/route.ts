
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { userId } = await request.json();

    if (!userId) {
        return new Response(JSON.stringify({ success: false, msg: "Please provide a user ID" }), { status: 400 });
    }

    const products = await prisma.product.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            logoUrl: true
        }
        
    });

    if (products.length === 0) {
        return new Response(JSON.stringify({ success: false, msg: "No products found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, products }), { status: 200 });

}