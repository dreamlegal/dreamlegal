import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Fetch all users where 'type' is 'user' and 'name' and 'email' are not null
    const users = await prisma.user.findMany({
      where: {
        type: 'user',
        name: {
          not: '',
        },
        
      },
    });

    return new Response(
      JSON.stringify({
        msg: "Users fetched successfully",
        success: true,
        users,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        msg: "An error occurred while fetching the users.",
        success: false,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
