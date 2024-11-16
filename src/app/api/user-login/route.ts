import prisma from "@/lib/prisma";

import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, msg: "User not found" }),
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ success: false, msg: "Incorrect password" }),
        { status: 401 }
      );
    }

    // Fetch company information if user exists
    const companyInformation = await prisma.companyInfo.findFirst({
      where: {
        userId: user.id,
      },
    });

    // Exclude the password field from the response
    const { password: _, ...userData } = user;

    return new Response(
      JSON.stringify({
        success: true,
        msg: "User Match",
        user: userData, // Return the user object without the password
        verified: !!companyInformation,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, msg: error.message }),
      { status: 500 }
    );
  }
}
