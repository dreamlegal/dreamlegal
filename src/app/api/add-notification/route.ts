import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const {
    message,
    userId,
    vendorId,
    notifyAllAccounts,
    notifyAllUsers,
    notifyAllVendors,
  } = await request.json();

  console.log(
    message,
    userId,
    vendorId,
    notifyAllAccounts,
    notifyAllUsers,
    notifyAllVendors
  );

  if (
    !message ||
    (!userId &&
      !vendorId &&
      !notifyAllAccounts &&
      !notifyAllUsers &&
      !notifyAllVendors)
  ) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    if (notifyAllAccounts) {
      // Create notifications for all accounts (users and vendors)
      const allAccounts = await prisma.user.findMany();
      await prisma.notification.createMany({
        data: allAccounts.map((account) => ({
          message,
          userId: account.id,
        })),
      });
    } else if (notifyAllUsers) {
      // Create notifications for all users
      const users = await prisma.user.findMany({
        where: { type: "user" },
      });
      await prisma.notification.createMany({
        data: users.map((user) => ({
          message,
          userId: user.id,
        })),
      });
    } else if (notifyAllVendors) {
      // Create notifications for all vendors
      const vendors = await prisma.user.findMany({
        where: { type: "vendor" },
      });
      await prisma.notification.createMany({
        data: vendors.map((vendor) => ({
          message,
          userId: vendor.id,
        })),
      });
    } else if (userId) {
      // Create notification for a specific user
      await prisma.notification.create({
        data: {
          message,
          userId,
        },
      });
    } else if (vendorId) {
      // Create notification for a specific vendor
      await prisma.notification.create({
        data: {
          message,
          userId: vendorId, // Assuming vendor's ID is used as user ID
        },
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
