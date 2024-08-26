import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { vendorId, message } = await request.json();

  if (!vendorId || !message) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    // Verify that the vendor exists
    const vendor = await prisma.user.findUnique({
      where: { id: vendorId },
      select: { type: true },
    });

    if (!vendor || vendor.type !== "vendor") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Vendor not found or invalid user type",
        }),
        { status: 404 }
      );
    }

    // Find all products published by the vendor
    const vendorProducts = await prisma.product.findMany({
      where: { userId: vendorId },
      select: { id: true },
    });

    if (vendorProducts.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No products found for this vendor",
        }),
        { status: 404 }
      );
    }

    // Get the IDs of all products published by the vendor
    const productIds = vendorProducts.map((product) => product.id);

    // Find all users who have saved these products
    const usersWithSavedProducts = await prisma.saveProduct.findMany({
      where: {
        Product: {
          some: {
            id: { in: productIds },
          },
        },
      },
      select: { userId: true },
    });

    // Remove duplicate user IDs
    const uniqueUserIds = Array.from(
      new Set(usersWithSavedProducts.map((saveProduct) => saveProduct.userId))
    );

    if (uniqueUserIds.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No users found with saved products from this vendor",
        }),
        { status: 404 }
      );
    }

    // Create notifications for each user who has saved products from the vendor
    await prisma.notification.createMany({
      data: uniqueUserIds.map((userId) => ({
        message,
        userId,
        read: false,
      })),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
