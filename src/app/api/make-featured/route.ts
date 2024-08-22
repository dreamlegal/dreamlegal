import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return new Response(JSON.stringify({ success: false, error: "Missing id" }), { status: 400 });
    }

    try {
        const  findTrueorFalse = await prisma.product.findUnique({
            where: { id },
            select: { featured: true }
        })

        if (!findTrueorFalse) {
            return new Response(JSON.stringify({ success: false, error: "Product not found" }), { status: 404 });
        }
        
        const product = await prisma.product.update({
            where: { id },
            data: {
                featured: !findTrueorFalse?.featured
            }
        });
        return new Response(JSON.stringify({ success: true, product }), { status: 200 });
    } catch (error) {
        console.error("An error occurred:", error);
        return new Response(JSON.stringify({ success: false, error }), { status: 500 });
    }
}