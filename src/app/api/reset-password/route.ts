
// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// // Using the new App Router syntax for API routes
// export async function POST(req: Request) {
//   try {
//     const { token, newPassword } = await req.json(); // Use req.json() to parse the JSON body

//     if (!token || !newPassword) {
//       return new Response(
//         JSON.stringify({ message: "Token and new password are required" }),
//         { status: 400 }
//       );
//     }

//     // Find the password reset request using the token
//     const resetRequest = await prisma.passwordReset.findUnique({
//       where: { token },
//     });

//     if (!resetRequest) {
//       return new Response(
//         JSON.stringify({ message: "Invalid or expired token" }),
//         { status: 404 }
//       );
//     }

//     // Check if the token has expired
//     if (resetRequest.tokenExpiration < new Date()) {
//       // Token is expired; delete it for security
//       await prisma.passwordReset.delete({ where: { token } });
//       return new Response(
//         JSON.stringify({ message: "Token has expired" }),
//         { status: 400 }
//       );
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password
//     await prisma.user.update({
//       where: { id: resetRequest.userId },
//       data: { password: hashedPassword },
//     });

//     // Delete the password reset token after successful password change
//     await prisma.passwordReset.delete({
//       where: { token },
//     });

//     return new Response(
//       JSON.stringify({ message: "Password has been successfully reset" }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error during password reset:", error);
//     return new Response(
//       JSON.stringify({ message: "An error occurred while resetting the password" }),
//       { status: 500 }
//     );
//   }
// }
import prisma from "@/lib/prisma";

// Using the new App Router syntax for API routes
export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json(); // Use req.json() to parse the JSON body

    if (!token || !newPassword) {
      return new Response(
        JSON.stringify({ message: "Token and new password are required" }),
        { status: 400 }
      );
    }

    // Find the password reset request using the token
    const resetRequest = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!resetRequest) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 404 }
      );
    }

    // Check if the token has expired
    if (resetRequest.tokenExpiration < new Date()) {
      // Token is expired; delete it for security
      await prisma.passwordReset.delete({ where: { token } });
      return new Response(
        JSON.stringify({ message: "Token has expired" }),
        { status: 400 }
      );
    }

    // Update the user's password without hashing it
    await prisma.user.update({
      where: { id: resetRequest.userId },
      data: { password: newPassword },
    });

    // Delete the password reset token after successful password change
    await prisma.passwordReset.delete({
      where: { token },
    });

    return new Response(
      JSON.stringify({ message: "Password has been successfully reset" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during password reset:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred while resetting the password" }),
      { status: 500 }
    );
  }
}
