import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, currentPassword, newPassword } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "User not found",
        }),
        { status: 404 }
      );
    }

    // Direct password validation (not recommended)
    if (user.password !== currentPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          msg: "Current password is incorrect",
        }),
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        msg: "Password updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        msg: "Error updating password",
      }),
      { status: 500 }
    );
  }
}
