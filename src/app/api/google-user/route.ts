import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (email) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return new Response(
      JSON.stringify({
        success: true,
        msg: "user found",
        user: user,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        msg: "user not found",
      }),
      { status: 401 }
    );
  }
}
