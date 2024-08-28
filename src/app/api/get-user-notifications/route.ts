import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing userId" }),
      { status: 400 }
    );
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ success: true, notifications }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
