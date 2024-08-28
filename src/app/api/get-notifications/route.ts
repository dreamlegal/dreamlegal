import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vendorId = searchParams.get("vendorId");

  if (!vendorId) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing vendorId" }),
      { status: 400 }
    );
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: vendorId },
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
