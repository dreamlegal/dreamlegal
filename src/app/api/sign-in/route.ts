import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (user) {
    if (password && user.password !== password) {
      return new Response(JSON.stringify({ success: false, msg: "Incorrect password" }), { status: 401 }); // Throw an error for invalid password
    }

    const companyInformation = await prisma.companyInfo.findFirst({
    where: {
      userId: user.id,
    }
    })
    if (companyInformation) {
      const { password: _, ...userData } = user;
      return new Response(
        JSON.stringify({
          success: true,
          msg: "User Match",
          user: userData, // Return the user object without the password
          verified : true
        }),
        { status: 200 }
      );
    }
    // Exclude the password field from the response
    const { password: _, ...userData } = user;
    return new Response(
      JSON.stringify({
        success: true,
        msg: "User Match",
        user: userData, // Return the user object without the password
        verified : false
      }),
      { status: 200 }
    );
  } else {
    throw new Error("User not found"); // Throw an error for user not found
  }
}
