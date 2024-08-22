import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId } = await request.json();
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { skip: true },
    });

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,

    });
  }
}
